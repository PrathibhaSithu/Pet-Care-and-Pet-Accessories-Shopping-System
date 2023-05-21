import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const WishlistContext = createContext();

const LOCAL_STORAGE_KEY = 'wishlist';

const WishlistContextProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // code to fetch wishlist data from API or local storage
    // and set it to the state using setWishlist function
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedWishlist) {
            setWishlist(storedWishlist);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (item) => {
        // Check if the item is already in the wishlist
        if (wishlist.some((wishlistItem) => wishlistItem._id === item._id)) {
            console.warn(`Item is already in the wishlist`);
            return;
        }

        // code to add item to wishlist state
        setWishlist([...wishlist, item]);
        toast.success('Product added to wishlist');
    }

    const removeFromWishlist = (itemId) => {
        // code to remove item from wishlist state
        setWishlist(wishlist.filter((item) => item._id !== itemId));
    }

    const clearWishlist = () => {
        // code to clear wishlist state
        setWishlist([]);
    }

    const isItemInWishlist = (itemId) => {
        // code to check if an item is already in the wishlist state
        return wishlist.some((item) => item._id === itemId);
    }

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist, isItemInWishlist}}>
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistContextProvider;
