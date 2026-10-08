import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Laptop } from '../types/product';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistCount: number;
  isInWishlist: (laptopId: string) => boolean;
  toggleWishlist: (laptop: Laptop) => void;
  removeFromWishlist: (laptopId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    getStorageItem<string[]>('rs_wishlist_ids', ['rog-scar-18-2024', 'macbook-pro-16-m3max'])
  );

  useEffect(() => {
    setStorageItem('rs_wishlist_ids', wishlistIds);
  }, [wishlistIds]);

  const isInWishlist = (laptopId: string) => wishlistIds.includes(laptopId);

  const toggleWishlist = (laptop: Laptop) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(laptop.id);
      if (exists) {
        showToast('Removed from Wishlist', `${laptop.name} removed.`, 'info');
        return prev.filter((id) => id !== laptop.id);
      } else {
        showToast('Saved to Wishlist', `${laptop.name} added to your saved gear.`, 'success');
        return [...prev, laptop.id];
      }
    });
  };

  const removeFromWishlist = (laptopId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== laptopId));
  };

  const clearWishlist = () => {
    setWishlistIds([]);
    showToast('Wishlist Cleared', 'All saved items removed.', 'info');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
