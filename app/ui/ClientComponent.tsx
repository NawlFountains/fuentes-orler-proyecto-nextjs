'use client';

import { buyProduct } from '@/app/lib/actions';

export default function ClientComponent({ product }: { product: any }) {
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await buyProduct(product);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <button type="submit" className="rounded-md text-black font-bold p-2 bg-white">
        Buy now
      </button>
    </form>
  );
}