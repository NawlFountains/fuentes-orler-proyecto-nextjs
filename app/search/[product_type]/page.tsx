import Image from 'next/image';
export default function Page({ params }: { params: { product_type: string } }) {
  const product = getProductsByType(params.product_type);
  return (
    <div className="grid grid-cols-1 mx-5 md:grid-cols-2 gap-5">
        Page for products with category {params.product_type}
    </div>
  )
}


function getProductsByType(product_type: string) {
  //TODO search product in DB
  const product = {
    title: 'Test shirt',
    type: 'shirt',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    price: 1000
  }
  return product;
}