import Image from 'next/image';
import { fetchProduct } from '@/app/lib/data';
import ClientComponent from '@/app/ui/ClientComponent';
import { notFound } from 'next/navigation';
import { isValidId } from '@/app/lib/utils';

export default async function Page({ params }: { params: { product_id: string } }) {

  if (!isValidId(params.product_id)) { 
    notFound();
  }
  const product = await fetchProduct(params.product_id);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 mx-5 md:grid-cols-3 gap-8">
      <div className="rounded-xl p-4 md:col-span-2 shadow-lg border border-gray-300 bg-white">
        <Image 
          src={product.image_url} 
          alt={product.name} 
          width={400} 
          height={300} 
          className="rounded-xl mx-auto my-auto transition-transform duration-300 transform hover:scale-105"
        />
      </div>
      <div className="rounded-xl p-6 shadow-lg border border-gray-300 bg-white">
        <div>
          <h1 className="text-4xl font-bold text-center text-gray-800">{product.name}</h1>
          <p className="text-base text-gray-600 my-6 leading-relaxed">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-10">
          <p className="text-4xl font-semibold text-gray-800">${product.price}</p>
          <ClientComponent product={product} />
        </div>
      </div>
    </div>
  );
}
