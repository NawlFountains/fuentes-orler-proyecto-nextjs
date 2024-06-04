import { fetchAnyVariant } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';
  
  export default async function Card({
    id,
    title,
    type,
    description,
  }: {
    id: string;
    title: string;
    type: string;
    description: string;
    price: number;
  }) {
    //TODO pick variant to show, 
    let product = await fetchAnyVariant(id);
    let pathImage = title.toLowerCase();
    pathImage = pathImage.replaceAll(" ", "-");
    return (
        <Link href={`/products/${id}`}>
      <div className="rounded-xl p-2 shadow-sm border border-gray-200 space-y-2">
        <div className="flex">
            <Image src={`/${pathImage}.jpg`} alt={title} width={200} height={300} className="rounded-xl mx-auto" />
        </div>
        <div className="flex flex-col mx-4 " >
          <h2 className="text-md text-gray-300 md:text-left text-center">{title}</h2>
          <p className="text-sm text-gray-500 md:text-left text-center">${product?.price}</p>
        </div>
      </div>
      </Link>
    );
  }