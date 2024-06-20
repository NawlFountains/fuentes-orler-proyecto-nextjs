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
  }).min(1, { message: 'Please enter a name.' }),
  category: z.string({
    invalid_type_error: 'Please enter a category.',
  }).min(1, { message: 'Please enter a category.' }),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter a price greater than $0.' }),
  description: z.string({
    invalid_type_error: 'Please enter a description.',
  }).min(1, { message: 'Please enter a name.' }),
  image_url: z.string({
    invalid_type_error: 'Please enter a image_url.',
  }).min(1, { message: 'Please enter a image_url.' }),
})

const CreateProduct = FormSchema.omit({ id: true });

const UpdateProduct = FormSchema.omit({ id: true });
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
  console.log("About to validate the form");
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    price: formData.get('price'),
    description: formData.get('description'),
    image_url: formData.get('image_url'),
  });
 
  console.log("Informing validation of the form");
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }
  
  console.log("Succesful");


  //TODO: upload image to cloudinary using API and the insert the URL
  
  // Prepare data for insertion into the database
  const { name, category, price, description, image_url } = validatedFields.data;
 
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
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/admin');
  redirect('/admin');
}
  export async function updateProduct(id: string, formData: FormData) {
    const { name, category, price, description , image_url } = UpdateProduct.parse({
      name: formData.get('name'),
      category: formData.get('category'),
      price: formData.get('price'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
    });
   

    //TODO upload new image or keep old image and update the URL

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