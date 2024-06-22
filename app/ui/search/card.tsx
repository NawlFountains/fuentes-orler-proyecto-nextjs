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
      <div className="rounded-xl p-4 shadow-lg space-y-4 bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full h-full hover:scale-105">
        <div className="flex h-60 md:h-80 justify-center items-center overflow-hidden rounded-xl">
          <Image
            src={image_url}
            alt={"Image of " + name}
            width={400}
            height={400}
            className="rounded-xl h-full w-full object-cover transform transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="grid grid-cols-1 text-center">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-md font-medium text-gray-600">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
