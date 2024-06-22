'use client';

import React from 'react';
import { useCart } from '../lib/cartUtils';
import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import ClientComponent from '../ui/ClientComponent';
import { Slider } from '@material-tailwind/react';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div>
        {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
        ) : (
        <div className="mt-6 flow-root text-white">
                <div className="inline-block min-w-full align-middle">
                    <div className="rounded-lg p-2 md:pt-0 border border-gray-200">
                    <div className="md:hidden">
                        {cartItems?.map((item) => (
                        <div
                            key={item.id}
                            className="mb-2 w-full p-4"
                        >
                            <div className="flex items-center justify-between border-b pb-4">
                            <div>
                                <div className="mb-2 flex items-center">
                                <Image
                                    src={item.image_url}
                                    className="mr-2"
                                    width={100}
                                    height={100}
                                    alt={`Image of ${item.name}`}
                                />
                                <p>{item.name}</p>
                                </div>
                            </div>
                            </div>
                            <div className="flex w-full items-center justify-between pt-4">
                            <div>
                                <p className="text-xl font-medium">
                                ${item.price}
                                </p>
                            </div>
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" onClick={() => decreaseQuantity(item.id)} data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <input type="text" id="quantity-input" readOnly value={item.quantity} min={1} data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                                <button type="button" id="increment-button" onClick={() => increaseQuantity(item.id)} data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex justify-end gap-2">
                            <button className="rounded-md border m-2 p-1 hover:bg-gray-100 hover:text-black" onClick={() => removeFromCart(item.id)}>
                                       <span className="sr-only">Delete</span>
                                       <TrashIcon className="w-5" />
                                  </button>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table text-white">
                        <thead className="rounded-lg text-left text-sm font-normal border-b">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                            Name
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                            Quantity
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                            Price
                            </th>
                            <th scope="col" className="relative py-3 pl-6 pr-3">
                            <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="">
                        {cartItems?.map((item) => (
                            <tr
                            key={item.id}
                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div className="flex items-center gap-3">
                                <Image
                                    src={item.image_url}
                                    className="rounded-sm"
                                    width={100}
                                    height={100}
                                    alt={`Image of ${item.name}`}
                                />
                                <p>{item.name}</p>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" onClick={() => decreaseQuantity(item.id)} data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <input type="text" id="quantity-input" readOnly value={item.quantity} min={1} data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                                <button type="button" id="increment-button" onClick={() => increaseQuantity(item.id)} data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                                ${item.price}
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div className="flex justify-end gap-3">
                                <button className="rounded-md border m-2 p-1 hover:bg-gray-100 hover:text-black" onClick={() => removeFromCart(item.id)}>
                                       <span className="sr-only">Delete</span>
                                       <TrashIcon className="w-5" />
                                  </button>
                                </div>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                <div className="w-full mt-4">
                        <p className='text-center postition-sticky bottom-0 rounded-md border border-gray-200 p-2'>
                          Total amount: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                          </p>
                      </div>
                  <button onClick={clearCart} className="rounded-md border border-gray-200 p-2 hover:bg-gray-100 hover:text-black my-4 px-4">Clear Cart</button>
                  <ClientComponent products={cartItems} />
                </div>
        )}
       
    </div>
  );
};

export default ShoppingCart;
