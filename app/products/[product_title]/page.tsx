import Image from 'next/image';
export default function Page({ params }: { params: { product_title: string } }) {
  const product = searchProduct(params.product_title);
  const imagePath = "/" + product.title.toLocaleLowerCase().replaceAll(" ", "-")+".jpeg";
  return (
    <div className="grid grid-cols-1 mx-5 md:grid-cols-2 gap-5">
      <div className="rounded-xl p-2 shadow-sm border border-gray-200">
        <Image src={imagePath} alt={product.title} width={400} height={200} className="rounded-xl mx-auto" />
      </div>
      <div className="rounded-xl p-2 shadow-sm ">
        <h1 className="text-3xl font-bold text-align-center">{product.title}</h1>
        <p className="text-sm text-gray-500 my-10">{product.description}</p>
        <div className="grid grid-cols-2">
          <p className='text-3xl mx-auto'>${product.price}</p>
          <button className="rounded-md text-black font-bold p-2 bg-white">Add to cart</button>
        </div>
      </div>
    </div>
  )
}


function searchProduct(product_title: string) {
  //TODO search product in DB
  const product = {
    title: 'Test shirt',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    price: 1000
  }
  return product;
}