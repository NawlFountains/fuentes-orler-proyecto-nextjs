import Image from 'next/image';
import { fetchProduct } from '@/app/lib/data';
import {MercadoPagoConfig, Preference} from 'mercadopago';
import { redirect } from 'next/navigation';

const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});
export default async function Page({ params }: { params: { product_id: string } }) {
  async function buyProduct() {
    'use server'
    const preference = new Preference(client).create({
        body: {
          items: [{
            id: 'buy',
            title: product.name,
            quantity: 1,
            unit_price: product.price,
          }]
        }
    });

    redirect((await preference).sandbox_init_point!);
  }
  const product = await fetchProduct(params.product_id);
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
          {/* <button onClick={buyProduct} className="rounded-md text-black font-bold p-2 bg-white">Buy now</button> */}
          <button className="rounded-md text-black font-bold p-2 bg-white">Buy now</button>
        </div>
      </div>
    </div>
  )
}