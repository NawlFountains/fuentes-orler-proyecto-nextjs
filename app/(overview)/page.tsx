import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import { CardSkeleton } from '@/app/ui/skeletons';
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
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-4 md:flex md:space-x-4 max-h-[800px]">
        <div className="grid min-h-[80px] w-3/4 place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible md:col-span-2">
          <CarouselTransition products={leftProducts} />
        </div>
        <div className = "md:col-span-1"> </div>
        <div className="grid min-h-[80px] w-3/4 place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible md:col-span-2">
          <CarouselTransition products={rightProducts} />
        </div>
      </div>
      <div className="grid grid-cols-1 py-4 my-4">
        <p className="m-4">
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas `&quot;`Letraset`&quot;`, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum
        </p>
        </div>
    </main>
  );
}
