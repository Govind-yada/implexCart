import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, isAuthenticated, showToast } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('implexcart_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1'];
    } catch {
      return ['prod-1'];
    }
  });

  // Sync with user's backend wishlist on login
  useEffect(() => {
    if (isAuthenticated && user?.wishlist) {
      setWishlist(user.wishlist);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    localStorage.setItem('implexcart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = async (productId, productName = 'Item') => {
    let nextWishlist;
    const exists = wishlist.includes(productId);

    if (exists) {
      nextWishlist = wishlist.filter(id => id !== productId);
      showToast(`Removed "${productName}" from Wishlist.`, 'info');
    } else {
      nextWishlist = [...wishlist, productId];
      showToast(`Added "${productName}" to Wishlist!`, 'success');
    }
    setWishlist(nextWishlist);

    if (isAuthenticated) {
      try {
        await api.toggleWishlist(productId);
      } catch (e) {
        console.error('Error syncing wishlist with backend:', e);
      }
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
