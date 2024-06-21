'use client';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createProduct } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import clsx from 'clsx';

export default function Form({ categories }: { categories: string[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);
  const [selectedOption, setSelectedOption] = useState('');
  const [imageLoadingMethod, setImageLoadingMethod] = useState('');
  const handleChange = (event : any) => {
    setSelectedOption(event.target.value);
};
  return (
    <form action={dispatch} className="text-white">
      <div className="rounded-md border border-gray-200 p-4 md:p-6">
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
                placeholder="Enter name"
                className="peer block w-full rounded-md bg-black border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

        {/* Product category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose product`&apos;`s category
            </label>
            <div className="w-full">
              <select
                id="category"
                name="category"
                className="peer block w-full cursor-pointer bg-black rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="category-error"
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
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
          <label htmlFor="newCategory"
            className={clsx(
              'mb-2 block text-sm font-medium text-gray-50',
              {
                'text-gray-900': selectedOption !== 'New category',
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
                aria-describedby="category-error"
                disabled = {selectedOption !== 'New category'}
                className={clsx(
                  'peer block w-full rounded-md bg-black border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500',
                  {
                    'border-gray-900 placeholder:text-gray-900': selectedOption !== 'New category',
                  },
                )}
              />
            </div>
          </div>
        </div>
        <div id="category-error" aria-live="polite" aria-atomic="true" className='align-middle'>
          {state.errors?.category &&
            state.errors.category.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        {/* Product price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Choose a price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter price"
                className="peer block w-full rounded-md bg-black border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="price-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="price-error" aria-live="polite" aria-atomic="true">
        {state.errors?.price &&
          state.errors.price.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
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
                placeholder="Enter product description"
                className="peer block w-full rounded-md bg-black border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
        {state.errors?.description &&
          state.errors.description.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image */}
        <div>
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Upload image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image"
                name="image"
                type="file"
                step="0.01"
                placeholder="Select image to upload"
                accept="image/png, image/jpg, image/jpeg"
                className="peer block w-full rounded-md bg-black border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="image-error"
                value = {imageLoadingMethod}
                onChange={(e) => setImageLoadingMethod(e.target.value)}
              />
              </div>
            </div>
          </div>

        {/* Image url */}
          <div>
          <label htmlFor="image_url"
            className={clsx(
              'mb-2 block text-sm font-medium text-gray-50',
              {
                'text-gray-900': imageLoadingMethod !== '',
              },
            )}>
              Upload url to image (Only images from cloudinary)
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="image_url"
                  name="image_url"
                  type="text"
                  step="0.01"
                  placeholder="Upload link to image"
                  aria-describedby="image_url-error"
                  disabled = {imageLoadingMethod !== ''}
                  className={clsx(
                    'peer block w-full rounded-md bg-black text-gray-50 border border-gray-50 py-2 pl-10 text-sm outline-2 placeholder:text-gray-50',
                    {
                      'border-gray-800 text-gray-900 placeholder:text-gray-900': imageLoadingMethod !== '',
                    },
                  )}
                />
              </div>
            </div>
          </div>
          <div id="image_url-error" aria-live="polite" aria-atomic="true" className='align-middle'>
          {state.errors?.image &&
            state.errors.image.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
  
        </div>
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin"
          className="flex h-10 items-center rounded-lg bg-black text-white border border-gray-200 px-4 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Cancel
        </Link>
        <Button type="submit">Create Product</Button>
      </div>
    </form>
  );
}
