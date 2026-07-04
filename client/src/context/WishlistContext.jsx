import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('purebloom_wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('purebloom_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p._id === product._id)) {
        toast.success('Already in your wishlist');
        return prev;
      }
      toast.success('Added to wishlist');
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((p) => p._id !== productId));
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId) => wishlist.some((p) => p._id === productId);

  const clearWishlist = () => {
    setWishlist([]);
    toast.success('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
