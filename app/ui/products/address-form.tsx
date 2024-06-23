'use client';
import { Address, CartItem } from '@/app/lib/definitions';
import { buyProducts } from '@/app/lib/actions';
import useCart from '@/app/lib/cartUtils';

export default function Form({ cartItems }: { cartItems: CartItem[] }) {
  const { clearCart } = useCart();

  //Checking not done on server action because couldn't find a way to send cartItems to it
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
  
    let formData = new FormData(event.currentTarget);
    console.log("handle on submit");
    console.log(formData);
    console.log(formData.get('street_name'));
  
    // Check if required fields are not null or empty
    if (
      formData.get('street_name') !== null &&
      formData.get('street_number') !== null &&
      formData.get('zip_code') !== null
    ) {
      let shipping_address: Address = {
        street_name: formData.get('street_name') as string,
        street_number: formData.get('street_number') as unknown as number,
        zip_code: formData.get('zipcode') as string,
        floor: formData.get('floor') as string | null,
        apartment: formData.get('apartment') as string | null,
      };
  
      await buyProducts(cartItems, shipping_address);
      clearCart();
    } else {
      // Handle case where required fields are missing
      console.error('Required fields are missing or null');
    }
  };
  

  return (
    <form onSubmit={handleFormSubmit} className="text-white">
      <div className="rounded-md border border-gray-200 p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Shipping details</h1>
        {/* Street name */}
        <div className="mb-4">
          <label htmlFor="street_name" className="mb-2 block text-sm font-medium">
            Street name (*)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="street_name"
                name="street_name"
                type="text"
                step="0.01"
                required
                placeholder="Enter street name"
                className="peer block w-full rounded-md bg-black border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

    {/* Street number and zipcode */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="street_number" className="mb-2 block text-sm font-medium">
              Street number (*)
              </label>
              <div className="w-full">
                <input
                  id="street_number"
                  name="street_number"
                  type="number"
                  required
                  className="peer block w-full cursor-pointer bg-black rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  placeholder='Enter street number'
                >
                </input>
              </div>
            </div>
            <div>
            <label htmlFor="zip_code"
              className='mb-2 block text-sm font-medium text-gray-50'>
              Zip code (*)
              </label>
              <div className="w-full">
              <input
                  id="zip_code"
                  name="zip_code"
                  type="text"
                  step="0.01"
                  placeholder="Enter new category"
                  className='peer block w-full rounded-md bg-black border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                />
              </div>
            </div>
        </div>
      
        {/* Optional floor and apartment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="floor" className="mb-2 block text-sm font-medium">
              Floor number 
              </label>
              <div className="w-full">
                <input
                  id="floor"
                  name="floor"
                  type="text"
                  className="peer block w-full cursor-pointer bg-black rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  placeholder='Enter floor number'
                >
                </input>
              </div>
            </div>
            <div>
            <label htmlFor="apartment"
              className='mb-2 block text-sm font-medium text-gray-50'>
              Apartment
              </label>
              <div className="w-full">
              <input
                  id="apartment"
                  name="apartment"
                  type="text"
                  step="0.01"
                  placeholder="Enter apartment"
                  className='peer block w-full rounded-md bg-black border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'/>
              </div>
            </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button type="submit" className="rounded-md w-full text-white font-bold py-2 px-4 bg-black hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75 shadow-md transition-all duration-300">
          Checkout
        </button>
      </div>
    </form>
  );
}
