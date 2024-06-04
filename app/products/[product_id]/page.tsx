'use client'
import Image from 'next/image';
import { fetchAnyVariant, fetchProduct } from '@/app/lib/data';
import { ColorToggle, SizeToggle } from '../../ui/search/toggles';
export default async function Page({ params }: { params: { product_id: string } }) {
  const product = await fetchProduct(params.product_id);
  const variant = await fetchAnyVariant(params.product_id);
  return (
    <div className="grid grid-cols-1 mx-5 md:grid-cols-3 gap-5">
      <div className="rounded-xl p-2 md:col-span-2 shadow-sm border border-gray-200">
        <Image src={product?.imageURL} alt={product.name} width={400} height={200} className="rounded-xl mx-auto my-auto" />
      </div>
      <div className="rounded-xl p-2 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-align-center">{product.name}</h1>
          <p className="text-sm text-gray-500 my-10">{product.description}</p>
        </div>
        <div className="flew flex-col space-y-5">
          <div className='space-y-5 rounded-xl p-2 shadow-sm border border-gray-200'>
            <p className='text-xl mx-auto'>Sizes</p>
            <SizeToggle product_id={product.id} />
          </div>
          <div className = 'space-y-5 rounded-xl p-2 shadow-sm border border-gray-200'>
            <p className='text-xl mx-auto '>Colors</p>
            <ColorToggle product_id={product.id} />
          </div>
        </div>
        <div className="grid grid-cols-2 mt-10">
          <p className='text-3xl mx-auto'>${variant.price}</p>
          <button className="rounded-md text-black font-bold p-2 bg-white">Add to cart</button>
        </div>
      </div>
    </div>
  )
}