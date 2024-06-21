import { sql } from '@vercel/postgres';
import {
  User,
  Product,
  ProductsTable,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  noStore();
  try {
    const products = await sql<ProductsTable>`
       SELECT *
       FROM products
       WHERE
        name ILIKE ${`%${query}%`} OR
        category ILIKE ${`%${query}%`} OR
        price::text ILIKE ${`%${query}%`}
        ORDER BY name DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}
export async function fetchProductsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
    WHERE
      name ILIKE ${`%${query}%`} OR
      category ILIKE ${`%${query}%`} OR
      price::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchProductCategories() {
  noStore();
  try {
    const productTypesResponse = await sql`
      SELECT DISTINCT
        category
      FROM products
    `;
    let productTypes = [];
    for (let i = 0; i < productTypesResponse.rows.length; i++) {
      productTypes[i] = productTypesResponse.rows[i].category;
    }
    return productTypes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch product types.'+err);
  }
}
export async function fetchProducts() {
  noStore();
  try {
    const data = await sql`
      SELECT *
      FROM products
    `;
    const products = data.rows.map((product: any) => ({
      ...product,
    }))
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch product types.'+err);
  }
}
export async function fetchProduct(product_id:string) {
  noStore();
  try {
    const data = await sql`
      SELECT *
      FROM products
      WHERE id = ${product_id}
    `;
    const products = data.rows.map((product: any) => ({
      ...product,
    }))
    return products[0];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch product types.'+err);
  }
}

export async function fetchProductsByCategory(product_category:string) {
  noStore();
  try {
    const data = await sql`
      SELECT *
      FROM products
      WHERE category = ${product_category}
    `;
    const products = data.rows.map((product: any) => ({
      ...product,
    }))
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch product by category.');
  }
}