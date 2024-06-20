import Image from 'next/image';
import Link from 'next/link';
  
  export default async function Card({
    id,
    name,
    price,
    image_url,
  }: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  }) {
    return (
        <Link href={`/products/${id}`}>
      <div className="rounded-xl p-2 shadow-sm border border-gray-200 space-y-2">
        <div className="flex">
            <Image src={image_url} alt={"Image of " + name} width={200} height={300} className="rounded-xl mx-auto" />
        </div>
        <div className="flex flex-col mx-4 " >
          <h2 className="text-md text-gray-300 md:text-left text-center">{name}</h2>
          <p className="text-sm text-gray-500 md:text-left text-center">${price}</p>
        </div>
      </div>
      </Link>
    );
  }