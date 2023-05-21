import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'cart';

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    quantity: 0,
    total: 0,
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedCart) {
        setCart(storedCart);
    }
  }, []);

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const existingItemIndex = cart.items.findIndex((cartItem) => cartItem.product._id === product._id);
  
    if (existingItemIndex !== -1) {
      const updatedItems = [...cart.items];
      updatedItems[existingItemIndex].cartQuantity += quantity;
  
      setCart({
        ...cart,
        items: updatedItems,
        quantity: cart.quantity + quantity,
        total: cart.total + product.price * quantity,
      });
    } else {
      const newItem = {
        product: product,
        cartQuantity: quantity,
      };
      setCart({
        ...cart,
        items: [...cart.items, newItem],
        quantity: cart.quantity + quantity,
        total: cart.total + product.price * quantity,
      });
    }
  };

  const removeFromCart = (productId, quantity = 1) => {
    const existingItemIndex = cart.items.findIndex((cartItem) => cartItem.product._id === productId);
    if (existingItemIndex === -1) {
      // item is not in cart, nothing to remove
      return;
    }
  
    const updatedItems = [...cart.items];
    const item = updatedItems[existingItemIndex];
  
    if (quantity >= item.cartQuantity) {
      // remove the entire item from cart
      updatedItems.splice(existingItemIndex, 1);
      setCart({
        ...cart,
        items: updatedItems,
        quantity: cart.quantity - item.cartQuantity,
        total: cart.total - item.product.price * item.cartQuantity,
      });
    } else {
      // remove specified quantity from item in cart
      item.cartQuantity -= quantity;
      setCart({
        ...cart,
        items: updatedItems,
        quantity: cart.quantity - quantity,
        total: cart.total - item.product.price * quantity,
      });
    }
  };

  const removeProduct = (productId) => {
    const updatedItems = cart.items.filter((cartItem) => cartItem.product._id !== productId);
    const removedItem = cart.items.find((cartItem) => cartItem.product._id === productId);
  
    setCart({
      ...cart,
      items: updatedItems,
      quantity: cart.quantity - removedItem.cartQuantity,
      total: cart.total - removedItem.product.price * removedItem.cartQuantity,
    });
  };
  

  const clearCart = () => {
    setCart({
      ...cart,
      items: [],
      quantity: 0,
      total: 0,
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
