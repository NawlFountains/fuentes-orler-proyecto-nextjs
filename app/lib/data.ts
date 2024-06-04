import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  Product,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

const testProducts = [
  { id: '1', name: 'Blue jeans', type: 'pants', description: 'Blue jeans description', imageURL: 'https://res.cloudinary.com/dzbaziutc/image/upload/v1717533921/blue-jeans_ays0r6.jpg'},
  { id: '2', name: 'Brown pants', type : 'pants', description: 'Brown pants description'},
  { id: '3',name: 'Fit Tshirt black', type: 'tshirt', description: 'Fit tshirt black description'},
  { id: '4',name: 'Piluso', type: 'hat', description: 'Piluso description'},
  { id: '5',name: 'Tshirt white', type: 'tshirt', description: 'Tshirt white description'},
  { id: '6',name: 'Classic shoe' , type: 'shoes', description: 'Classic shoe description'},
  { id: '7',name: 'Formal shoe' , type: 'shoes', description: 'Formal shoe description'},
];

const testVariants = [
  { id : '1', product_id: '1', color: 'blue', size: 's', price: 1000 , imagePath: null},
  { id : '2', product_id: '1', color: 'brown', size: 'm', price: 1000, imagePath: null },
  { id : '3', product_id: '1', color: 'blue', size: 'l', price: 1000, imagePath: null },
  { id : '4', product_id: '2', color: 'brown', size: 's', price: 200, imagePath: null},
  { id : '5', product_id: '2', color: 'brown', size: 'm', price: 20, imagePath: null},
  { id : '6', product_id: '2', color: 'brown', size: 'l', price: 200, imagePath: null},
  { id : '7', product_id: '3', color: 'black', size: 's', price: 300, imagePath: null},
  { id : '8', product_id: '3', color: 'black', size: 'm', price: 300, imagePath: null},
  { id : '9', product_id: '3', color: 'black', size: 'l', price: 300, imagePath: null},
  { id : '18', product_id: '6', color: 'black', size: 'l', price: 10, imagePath: null},
  { id : '10', product_id: '4', color: 'white', size: 's', price: 10, imagePath: null},
  { id : '11', product_id: '4', color: 'white', size: 'm', price: 10, imagePath: null},
  { id : '12', product_id: '4', color: 'white', size: 'l', price: 10, imagePath: null},
  { id : '13', product_id: '5', color: 'white', size: 's', price: 10, imagePath: null},
  { id : '14', product_id: '5', color: 'white', size: 'm', price: 10, imagePath: null},
  { id : '15', product_id: '5', color: 'white', size: 'l', price: 10, imagePath: null},
  { id : '16', product_id: '6', color: 'black', size: 's', price: 10, imagePath: null},
  { id : '17', product_id: '6', color: 'black', size: 'm', price: 10, imagePath: null},
  { id : '19', product_id: '7', color: 'white', size: 's', price: 10, imagePath: null},
  { id : '20', product_id: '7', color: 'white', size: 'm', price: 100, imagePath: null },
  { id : '21', product_id: '7', color: 'white', size: 'l', price: 1000, imagePath: null },
];

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  noStore();
  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchProductsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    // const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    const totalPages = Math.ceil(Number(testVariants.length) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    console.log(invoice);
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
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

export async function fetchProductTypes() {
  //TODO : request from DB

  //Dummy test
  const productTypes = ['pants', 'tshirt', 'hat','shoes'];
  return productTypes;
}
export async function fetchProducts() {
  //TODO : request from DB

  //Dummy test with names (Blue jeans, Brown pants, Fit Tshirt black, Piluso , Tshirt white)
  let products : Product[] = [];
  for (let i = 0; i < testProducts.length; i++) {
    let productVariant = await fetchAnyVariant(testProducts[i].id);
    products[i] = {
      id : testProducts[i].id,
      name: testProducts[i].name,
      type: testProducts[i].type,
      description: testProducts[i].description,
      imageURL: testProducts[i].imageURL,
      price: productVariant.price,
    }
  }
  return products;
}
export async function fetchProduct(product_id:string) {
  //TODO : request from DB

  //Dummy test
  for (let i = 0; i < testProducts.length; i++) {
    if (testProducts[i].id === product_id) {
      let product = testProducts[i]
      return product;
    }
  }
}

export async function fetchProductsByType(product_type:string) {
  //TODO : request from DB

  //Dummy test
  let a = 0;
  let products : Product[] = [];
  for (let i = 0; i < testProducts.length; i++) {
    if (testProducts[i].type === product_type) {
      let productVariant = await fetchAnyVariant(testProducts[i].id);
      products[a] = {
        id : testProducts[i].id,
        name: testProducts[i].name,
        type: testProducts[i].type,
        description: testProducts[i].description,
        imageURL: testProducts[i].imageURL,
        price: productVariant.price,
      }
      a = a + 1;
    }
  }
  //Add a variant for each product

  return products;
}

export async function fetchProductSizes(product_id:string) {
  //TODO : request from DB variant table
  let availableSizes = new Set<String>();
  for (let i = 0; i < testVariants.length; i++) {
    if (testVariants[i].product_id === product_id) {
      availableSizes.add(testVariants[i].size);
    }
  }
  return Array.from(availableSizes);
}

export async function fetchProductColors(product_id:string) {
  //TODO : request from DB variant table
  let availableColors = new Set<String>();
  for (let i = 0; i < testVariants.length; i++) {
    if (testVariants[i].product_id === product_id) {
      availableColors.add(testVariants[i].color);
    }
  }
  console.log("fetched array of colors "+availableColors)
  return Array.from(availableColors);
}

export async function fetchAnyVariant(variant_id:string) { 
  //TODO : request from DB variant table
  for (let i = 0; i < testVariants.length; i++) {
    if (testVariants[i].id === variant_id) {
      if (testVariants[i].imagePath  == null) {
        //IF no variant photo go to default
        for (let j = 0; j < testProducts.length; j++) {
          if (testProducts[j].id === testVariants[i].product_id) {
            let product = {
              id: testProducts[i].id,
              product_id : testVariants[i].product_id,
              color : testVariants[i].color,
              size : testVariants[i].size,
              price : testVariants[i].price,
              imageULR: testProducts[j].imageURL
            }
            return product;
          }
        }
      }
      return testVariants[i];
    }
  }
}