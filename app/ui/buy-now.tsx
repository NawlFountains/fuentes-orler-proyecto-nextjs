'use client';

import { buyProducts } from '@/app/lib/actions';
import { CartItem, Product } from '../lib/definitions';

export default function BuyNowButton({ products }: { products: CartItem [] }) {
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await buyProducts(products);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex w-full justify-center">
      <button 
        type="submit" 
        className="rounded-md w-full text-white font-bold py-2 px-4 bg-black hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75 shadow-md transition-all duration-300">
        Buy now
      </button>
    </form>
  );
}
