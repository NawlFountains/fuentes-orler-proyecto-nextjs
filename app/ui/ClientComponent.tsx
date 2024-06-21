'use client';

import { buyProduct } from '@/app/lib/actions';

export default function ClientComponent({ product }: { product: any }) {
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await buyProduct(product);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex justify-center">
      <button 
        type="submit" 
        className="rounded-md text-white font-bold py-2 px-4 bg-black hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75 shadow-md transition-all duration-300">
        Buy now
      </button>
    </form>
  );
}
