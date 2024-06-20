'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  category: z.string({
    invalid_type_error: 'Please enter a category.',
  }),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter a price greater than $0.' }),
  description: z.string({
    invalid_type_error: 'Please enter a description.',
  }),
  image : z.any(),
})

const CreateProduct = FormSchema.omit({ id: true , image : true});

const UpdateProduct = FormSchema.omit({ id: true , image : true});
export type State = {
  errors?: {
    name ?: string[] | null;
    category?: string[] | null;
    price?: string[] | null;
    description?: string[] | null;
  };
  message?: string | null;
};


export async function createProduct(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    price: formData.get('price'),
    description: formData.get('description'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  //TODO: upload image to cloudinary using API and the insert the URL
  
  // Prepare data for insertion into the database
  const { name, category, price, description } = validatedFields.data;
  let image_url = '';
  const priceInCents = price * 100;
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO products (name, category, price, description, image_url)
      VALUES (${name}, ${category}, ${priceInCents}, ${description}, ${image_url})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/admin');
  redirect('/admin');
}
  export async function updateProduct(id: string, formData: FormData) {
    const { name, category, price, description } = UpdateProduct.parse({
      name: formData.get('name'),
      category: formData.get('category'),
      price: formData.get('price'),
      description: formData.get('description'),
    });
   
    const priceInCents = price * 100;

    //TODO upload new image or keep old image and update the URL

    let image_url = '';
   
    try {
    await sql`
      UPDATE products
      SET name = ${name}, category = ${category}, price = ${priceInCents}, description = ${description}, image_url = ${image_url}
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
        await sql`DELETE FROM product WHERE id = ${id}`;
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