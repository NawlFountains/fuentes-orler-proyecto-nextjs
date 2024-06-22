import { fetchHomeProducts } from '@/app/lib/data';
import { CarouselTransition } from '../ui/dashboard/carousel';
import { Product } from '../lib/definitions';

const NUMBER_OF_PRODUCTS = 5;
 
export default async function Page() {
  const products : Product[] = await fetchHomeProducts(NUMBER_OF_PRODUCTS);
  const leftProducts = products.slice(0, Math.floor(NUMBER_OF_PRODUCTS / 2));
  const rightProducts = products.slice(Math.floor(NUMBER_OF_PRODUCTS / 2), NUMBER_OF_PRODUCTS);
  return (
    <main>
      <div className="grid grid-cols-1 gap-4 md:flex md:space-x-4 md:max-h-[800px]">
        <div className="grid min-h-[80px] w-3/4 place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible col-span-1 mx-auto md:col-span-2">
          <CarouselTransition products={leftProducts} />
        </div>
        <div className = "md:col-span-1"> </div>
        <div className="grid min-h-[80px] w-3/4 place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible col-span-1 mx-auto md:col-span-2">
          <CarouselTransition products={rightProducts} />
        </div>
      </div>
      <div className="grid grid-cols-1 py-4 my-4">
        <p className="m-4">
        At Store, we are dedicated to offering you the latest fashion trends with the best quality at affordable prices. For more information on shipping, returns, terms and conditions, or our privacy policy, please visit the respective sections on our website. Contact us at email@store.com or +1 (123) 456-7890, Monday to Friday from 9:00 AM to 6:00 PM. Follow us on social media: Facebook, Instagram, and Twitter. Subscribe to our newsletter to receive the latest news and exclusive offers. © 2024 Store  All rights reserved.
        </p>
        </div>
    </main>
  );
}
