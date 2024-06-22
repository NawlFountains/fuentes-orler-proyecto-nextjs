'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { Product, Transaction } from './definitions';

// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

const urlSchema = z.string({
  invalid_type_error: 'Please enter an image URL.',
})
  .min(1, { message: 'Please upload an image or enter an image URL.' })
  .refine(
    (url) => url.startsWith('http://') || url.startsWith('https://'),
    { message: 'The URL must start with http or https.' }
  )
  .refine(
    (url) => url.includes('cloudinary'),
    { message: 'The URL must be from Cloudinary.' }
  );

// Define the file schema
const fileSchema = z.instanceof(File)
  .refine(
    (file) => file.size > 0,
    { message: 'Please upload an image.' }
  );

// Define a custom schema for the image field
const imageSchema = urlSchema.or(fileSchema);

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }).min(1, { message: 'Please enter a name.' }),
  category: z.string({
    invalid_type_error: 'Please enter a category.',
  }).min(1, { message: 'Please enter a category.' }),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter a price greater than $0.' }),
  description: z.string({
    invalid_type_error: 'Please enter a description.',
  }).min(1, { message: 'Please enter a description.' }),
  image: imageSchema
})

const CreateProduct = FormSchema.omit({ id: true });

const UpdateProduct = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name ?: string[] | null;
    category?: string[] | null;
    price?: string[] | null;
    description?: string[] | null;
    image?: string[] | null;
  };
  message?: string | null;
};

// Error checking done in 
export async function createTransaction(transaction: Transaction) {
  try {
    await sql`
      INSERT INTO transactions (id, product_name, amount, status)
      VALUES (${transaction.id}, ${transaction.product_name}, ${transaction.amount}, ${transaction.status})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to create Transaction.',
    };
  }
}

export async function createProduct(prevState: State, formData: FormData) {
  // Validate form using Zod
  let categoryInForm = 'category';
  if (formData.get('category') === "New category") {
    categoryInForm = 'newCategory';
  }

  let imageUnparsed = formData.get('image_url');
  if (imageUnparsed === null) {
    imageUnparsed = formData.get('image');
  }

  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    category: formData.get(categoryInForm),
    price: formData.get('price'),
    description: formData.get('description'),
    image: imageUnparsed,
  });

  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }
  

  // Prepare data for insertion into the database
  let { name, category, price, description, image } = validatedFields.data;

  let image_url = null;
  if ( image instanceof File) {
    image_url = await uploadToCloudinary(image);
  } else {
    image_url = image;
  }
  
  // Insert data into the database
  try {
    await sql`
      INSERT INTO products (name, category, price, description, image_url)
      VALUES (${name}, ${category}, ${price}, ${description}, ${image_url})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }
 
  revalidatePath('/admin');
  redirect('/admin');
}
  export async function updateProduct(id: string, formData: FormData) {
    let categoryInForm = 'category';
    if (formData.get('category') === "New category") {
      categoryInForm = 'newCategory';
    }
    let imageUnparsed = formData.get('image_url');
    if (imageUnparsed === null) {
      imageUnparsed = formData.get('image');
    }

    const validatedFields = UpdateProduct.safeParse({
      name: formData.get('name'),
      category: formData.get(categoryInForm),
      price: formData.get('price'),
      description: formData.get('description'),
      image: imageUnparsed,
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Product.',
      };
    }
    
    // Prepare data for insertion into the database
    let { name, category, price, description, image } = validatedFields.data;

  let image_url = null;
  if ( image instanceof File) {
    image_url = await uploadToCloudinary(image);
  } else {
    image_url = image;
  }
  
    try {
    await sql`
      UPDATE products
      SET name = ${name}, category = ${category}, price = ${price}, description = ${description}, image_url = ${image_url}
      WHERE id = ${id}
    `;
} catch (error) {
    return {
      message: 'Database error: Failed to update product.',
    };
  }
   
    revalidatePath('/admin');
    redirect('/admin');
  }

  export async function deleteProduct(id: string) {
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath('/admin');
        return { message: 'Product deleted.' };
    } catch (error) {
        return {
        message: 'Database error: Failed to delete Product.',
        };
    }
  }
  
  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }
  
  async function uploadToCloudinary(imageFile: File) {
    const imageReader = imageFile.stream().getReader();
    const byteArrayImage: number[] = [];
    
    while (true) {
      const { done, value } = await imageReader.read();
  
      if (done)
        break;
      
      // @ts-ignore
      byteArrayImage.push(...value);
    }

    // @ts-ignore
    const byteArrayBuffer = Buffer.from(byteArrayImage, 'binary');
    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader.upload_stream((error : any, uploadResult : any) => {
        return resolve(uploadResult);
      }).end(byteArrayBuffer);
    });
  
    const img_link = (uploadResult as any).url;
  
    return img_link;
  }


  const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

  export async function buyProduct(product:Product) {
    
    console.log('buying...');
    const preference = await new Preference(client).create({
        body: {
          items: [{
            id: product.id,
            title: product.name,
            description: product.id,
            quantity: 1,
            unit_price: product.price,

          }],
          back_urls: {
            "success": process.env.NEXT_PUBLIC_APP_URL + "/search",
            "failure": process.env.NEXT_PUBLIC_APP_URL + "/search",
            "pending": process.env.NEXT_PUBLIC_APP_URL + "/search"
          },
  
          auto_return: "approved"
  
        }
    });
    var redirectPath = preference.init_point;
    console.log(redirectPath);
    if(redirectPath)
      redirect(redirectPath);
  }

  