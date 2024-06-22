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
        <div className="rounded-xl p-2 shadow-sm border border-gray-200 space-y-2 grid grid-cols-1 w-full h-full">
          <div className="flex h-160 md:h-80 justify-center items-center">
              <Image src={image_url} alt={"Image of " + name} width={400} height={400} className="rounded-xl h-full w-full m-2 object-cover"/>
          </div>
          <div className="grid grid-cols-1 mx-4 h-auto" >
            <h2 className="text-md text-gray-300">{name}</h2>
            <p className="text-sm text-gray-500">${price}</p>
          </div>
        </div>
      </Link>
    );
  }