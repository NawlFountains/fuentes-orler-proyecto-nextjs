import Image from 'next/image';
import Link from 'next/link';
  
  export default async function CardWrapper() {
    const fetchPrice = 3000;
    return (
      <>
        {/* NOTE: comment in this code when you get to this point in the course */}
        
        <Card title="test shirt" description="Test description" price={fetchPrice} />
      </>
    );
  }
  
  export function Card({
    title,
    description,
    price,
  }: {
    title: string;
    description: string;
    price: number;
  }) {
    let pathImage = title.toLowerCase();
    pathImage = pathImage.replaceAll(" ", "-");
    return (
        <Link href={`/products/${pathImage}`}>
      <div className="rounded-xl p-2 shadow-sm border border-gray-200">
        <div className="flex p-4">
            <Image src={`/${pathImage}.jpeg`} alt={title} width={200} height={150} className="rounded-xl mx-auto" />
        </div>
        <h3 className="text-sm text-gray-300 text-center">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-sm text-gray-500">{price}</p>
      </div>
      </Link>
    );
  }