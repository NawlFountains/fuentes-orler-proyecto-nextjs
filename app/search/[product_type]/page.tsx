import { fetchProductsByCategory } from '@/app/lib/data';
import Card from "../../ui/search/card";
import { CardsSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { product_type: string } }) {
  const product = await fetchProductsByCategory(params.product_type);
  return (
    <div className="grid grid-cols-1 mx-5 md:grid-cols-2 gap-5">
      <Suspense fallback={<CardsSkeleton />}>
        {product.map((product) => (
        <Card
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image_url={product.image_url}
          />
        ))}
      </Suspense>
    </div>
  )
}
