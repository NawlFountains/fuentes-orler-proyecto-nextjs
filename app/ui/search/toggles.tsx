import { fetchProductSizes, fetchProductColors } from "@/app/lib/data";

export async function SizeToggle( {
  product_id
}: {
  product_id: string;
}) {
  let availableSizes = await fetchProductSizes(product_id);
  return (
    <div className="flow flex flex-row space-x-2">
      {availableSizes.map((size) => (
        <div key = {size.toString()}>
          <button type="button" className = 'w-10 rounded-md border p-2 hover:bg-gray-100 hover:text-black'>{size}</button>
        </div>
      ))}
    </div>
  );
}

//Change selectedSize

export async function ColorToggle( {
  product_id
}: {
  product_id: string;
}) {
  let availableColors = await fetchProductColors(product_id);
  return (
    <div className="flow flex flex-row space-x-2">
      {availableColors.map((color) => (
         <div key = {color.toString()}>
         <button className ='rounded-md border p-2 hover:bg-gray-100 hover:text-black'>{color}</button>
       </div>
      ))}
    </div>
  );
}