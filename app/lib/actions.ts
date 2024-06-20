'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const FormSchemaProduct = z.object({
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
  image_url: z.string({
    invalid_type_error: 'Please enter an image URL.',
  }),
})

const CreateProduct = FormSchemaProduct.omit({ id: true , image_url: true});

const UpdateProduct = FormSchemaProduct.omit({ id: true, image_url: true});
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
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
  let image_url = '';
 
  // Prepare data for insertion into the database
  const { name, category, price, description } = validatedFields.data;
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
export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
} catch (error) {
    return {
      message: 'Database error: Failed to update invoice.',
    };
  }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
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

  export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Invoice deleted.' };
    } catch (error) {
        return {
        message: 'Database error: Failed to delete invoice.',
        };
    }
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