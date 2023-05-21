import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import { GrCart } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './storesearch.css';

const StoreSearch = () => {

  const { cart } = useContext(CartContext)
  const { wishlist } = useContext(WishlistContext)

  const [search, setSearch] = useState('')
  const navigate = useNavigate()
    
  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/store?search=' + search)
  }

  return (
    <div className="StoreSearchContainer">
      <form className="InputContainer" onSubmit={handleSearch}>
        <input className="Input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className="Button">
          <AiOutlineSearch size="1.5rem" />
        </button>
      </form>
      <div className="Right">
        <div className="MenuItem">
          <Link to='../wishlist' style={{textDecoration: 'none', color: 'black'}}>
            <FaRegHeart size="1.5rem" />
            <div className="MenuItemBadge">{wishlist.length}</div>
          </Link>
        </div>
        <div className="MenuItem">
            <Link to='../cart' style={{textDecoration: 'none', color: 'black'}}>
              <GrCart size="1.5rem" />
              <div className="MenuItemBadge">{cart.quantity}</div>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreSearch;
