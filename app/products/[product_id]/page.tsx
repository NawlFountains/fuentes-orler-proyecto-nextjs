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
    <div className="grid grid-cols-1 mx-5 md:grid-cols-3 gap-5">
      <div className="rounded-xl p-2 md:col-span-2 shadow-sm border border-gray-200">
        <Image src={product.image_url} alt={product.name} width={400} height={200} className="rounded-xl mx-auto my-auto" />
      </div>
      <div className="rounded-xl p-2 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-align-center">{product.name}</h1>
          <p className="text-sm text-gray-500 my-10">{product.description}</p>
        </div>
        <div className="grid grid-cols-2 mt-10">
          <p className='text-3xl mx-auto'>${product.price}</p>
          <ClientComponent product={product} />
        </div>
      </div>
    </div>
  );
}