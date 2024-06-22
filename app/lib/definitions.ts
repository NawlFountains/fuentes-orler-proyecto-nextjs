export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type ProductsTable = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
};

export type Transaction = {
  id: number;
  product_name: string;
  amount: number;
  status: string;
};
