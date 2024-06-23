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
  payer_email: string;
  amount: number;
  status: string;
  date: string;
};

export type CartItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  quantity: number;
};

export type Address = {
  street_name: string;
  street_number: number;
  floor: string | null;
  apartment: string | null;
};

export type ShippingDetails = {
  id: string;
  payment_id: number;
  street_name: string;
  street_number: number;
  floor: string | null;
  apartment: string | null;
  status: string;
};
