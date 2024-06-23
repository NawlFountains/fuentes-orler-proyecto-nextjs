'use client';
import { useState } from 'react';
import { useCart } from '../lib/cartUtils';

export default function AddCartButton({ product }: { product: any }) {
    const { addToCart } = useCart();
    const [addedToCart, setAddedToCart] = useState(false);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        addToCart(product);
        setAddedToCart(true); // Set state to true when product is added to cart
        setTimeout(() => setAddedToCart(false), 1000); // Reset state after a second
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex w-full justify-center">
            <button
                type="submit"
                className="rounded-md w-full text-white font-bold py-2 px-4 bg-black hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75 shadow-md transition-all duration-300"
            >
                {addedToCart ? 'Added to cart!' : 'Add to cart'}
            </button>
        </form>
    );
}
