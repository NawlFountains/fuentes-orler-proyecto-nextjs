import { useState } from 'react';
import { CartItem, Product } from './definitions';


export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromLocalStorage());

  const addToCart = (product: Product) => {

    let existingCartItem = cartItems.find(item => item.id === product.id);

    if (existingCartItem) {
      const updatedCart = cartItems.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCart);
      saveCartToLocalStorage(updatedCart);
      return;
    } else {
        let newItem = { ...product, quantity: 1 };
        const updatedCart = [...cartItems, newItem];
        setCartItems(updatedCart);
        saveCartToLocalStorage(updatedCart);
    }

  };

  const changeQuantity = (productId: string, quantity: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId) {
        if (quantity > 0)
          return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const increaseQuantity = (productId: string) => {
    changeQuantity(productId, cartItems.find(item => item.id === productId)!.quantity + 1);
  };

  const decreaseQuantity = (productId: string) => {
    changeQuantity(productId, cartItems.find(item => item.id === productId)!.quantity - 1);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartToLocalStorage([]);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  };
};

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const loadCartFromLocalStorage = (): CartItem[] => {
  const cartItemsJSON = localStorage.getItem('cartItems');
  return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
};

export default useCart;
