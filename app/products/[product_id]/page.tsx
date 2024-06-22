import Image from 'next/image';
import { fetchProduct } from '@/app/lib/data';
import BuyNowButton from '@/app/ui/buy-now';
import AddCartButton from '@/app/ui/add-cart';
import { notFound } from 'next/navigation';
import { isValidId } from '@/app/lib/utils';
import Link from 'next/link';

export default async function Page({ params }: { params: { product_id: string } }) {

  if (!isValidId(params.product_id)) { 
    notFound();
  }
  const product = await fetchProduct(params.product_id);

  if (!product) {
    notFound();
  }
  let cartItem = [{...product, quantity: 1}];

  return (
    <div className="grid grid-cols-1 mx-5 md:grid-cols-3 gap-8">
      <div className="rounded-xl p-4 md:col-span-2 shadow-lg border border-gray-300 bg-white">
        <Image 
          src={product.image_url} 
          alt={product.name} 
          width={400} 
          height={400} 
          className="rounded-xl mx-auto my-auto transition-transform duration-300 transform w-3/4 h-full object-cover max-h-[800px]"
        />
      </div>
      <div className="flex flex-col rounded-xl p-6 shadow-lg border border-gray-300 bg-white justify-between ">
        <div >
          <div className="flex justify-between flex-col xl:flex-row space-y-4 xl:space-y-0">
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <Link href={"/search/" + product.category}>
            <p className="text-xl font-bold text-gray-400 text-left xl:text-right">{'>'}{product.category}</p>
            </Link>
          </div>
            <p className="text-base text-gray-600 my-6 leading-relaxed">{product.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
          <p className="text-4xl font-semibold text-gray-800 col-span-1 md:col-span-2 text-center">${product.price}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 md:col-span-2">
            <AddCartButton product={product} />
            <BuyNowButton products={cartItem} />
          </div>
        </div>
      </div>
    </div>
  );
}
