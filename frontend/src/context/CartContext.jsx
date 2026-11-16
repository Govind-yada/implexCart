import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, openAuthModal, showToast } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('implexcart_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'prod-1',
          name: 'Pro Wireless Earbuds',
          price: 59.99,
          originalPrice: 99.99,
          image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
          category: 'Electronics',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('implexcart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, openDrawer = true) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.name}" to cart!`, 'success');
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Cart has been cleared.', 'info');
  };

  const proceedToCheckout = () => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      openAuthModal('signin', 'Authentication Required: Please sign in to place an order');
      return;
    }
    if (cartItems.length === 0) {
      showToast('Your cart is empty. Add some products first!', 'warning');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        proceedToCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
