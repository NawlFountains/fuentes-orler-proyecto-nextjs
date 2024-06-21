'use client';

import { Product } from '@/app/lib/definitions';
import {
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProduct } from '@/app/lib/actions';
import { useState } from 'react';
import clsx from 'clsx';

export default function EditProductForm({
  product,
  categories,
}: {
  product: Product;
  categories: string [];
}) {
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [selectedOption, setSelectedOption] = useState(product.category);
  const [imageLoadingMethod, setImageLoadingMethod] = useState('');

    const handleChange = (event : any) => {
        setSelectedOption(event.target.value);
    };
  return (
    <form action={updateProductWithId} className="text-black">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Choose a name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                step="0.01"
                defaultValue={product.name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>
          </div>
        </div>

        {/* Product category */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose an category {product.category}
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value = {selectedOption}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="New category">
                New category
              </option>
              {categories.map((category) => (
                <option key={category} value={category} >
                  {category}
                </option>
              ))}
            </select>
            </div>
          </div>
          <div>
          <label htmlFor="image"
            className={clsx(
              'mb-2 block text-sm font-medium text-black',
              {
                'text-gray-300': selectedOption !== 'New category',
              },
            )}>
             Create a new category
            </label>
            <div className="w-full">
            <input
                id="newCategory"
                name="newCategory"
                type="text"
                step="0.01"
                placeholder="Enter new category"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="category-error"
                disabled = {selectedOption !== 'New category'}

              />
            </div>
          </div>
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose a price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={product.price}
                placeholder="Enter USD Price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

         {/* Product description */}
      <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Choose a description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                step="0.01"
                defaultValue={product.description}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
            </div>
          </div>
        </div>
        
          {/* Image url */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-4">
          <div className="">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Upload image
          </label>
          <div className="mt-2 rounded-md">
            <div className="">
              <input
                id="image"
                name="image"
                type="file"
                step="0.01"
                accept="image/png, image/jpg, image/jpeg"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="image-error"
                value = {imageLoadingMethod}
                onChange={(e) => setImageLoadingMethod(e.target.value)}
              />
              </div>
            </div>
          </div>


          <div className="">
            <label htmlFor="image"
            className={clsx(
              'mb-2 block text-sm font-medium text-black',
              {
                'text-gray-300': imageLoadingMethod !== '',
              },
            )}>
              Upload image url (Only cloudinary image urls are supported)
            </label>
            <div className="mt-2 rounded-md">
              <div className="">
                <input
                  id="image_url"
                  name="image_url"
                  type="text"
                  step="0.01"
                  defaultValue={product.image_url}
                  className={clsx(
                    'peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 text-black',
                    {
                      'bg-white text-gray-300': imageLoadingMethod !== '',
                    },
                  )}
                  aria-describedby="image_url-error"
                  disabled = {imageLoadingMethod !== ''}
                  />
                </div>
            </div>
          </div>

        </div>
        <div className="rounded-xl">
          <p className="mb-2 block text-sm font-medium">Current product image</p>
          <img src={product.image_url} alt={product.name} width={400} height={200} className="rounded-xl mx-auto my-auto" />
        </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Product</Button>
      </div>
    </form>
  );
}
