
import{ MdOutlineArrowBackIos } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from '../../components/store/Footer'
import Navbar from '../../components/store/Navbar'
import { useEffect, useState, useContext } from 'react';
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from '../../contexts/WishlistContext';
import StoreSearch from '../../components/store/StoreSearch';
import { toast } from 'react-hot-toast';
import EmptyWishlist from '../../components/store/EmptyWishlist';
import Header from '../../components/store/Header/Header';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 400;
  text-align: center;
  color: #2C2C54;
  text-transform: uppercase;
  font-family: 'PT Sans', sans-serif;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const TopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
  padding: 10px;
  border: 2px solid #333;
  border-radius: 5px;
  color: #333;
  background-color: white;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #333;
    color: white;;
  }

  svg {
    margin-right: 3px;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
  padding: 5px 25px 5px 15px;
`;

const CartInfo = styled.table`
  width: 100%;
  text-align: center;
  border: 2px solid lightgray;
  border-collapse: collapse;

  th {
    padding: 20px 0;
  }

  td {
    border: none;
  }

  tbody tr{
    border: 1px solid lightgrey;
  }
`
const Product = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    margin: 5px 30px 5px 5px;
    height: 80px;
    width: 80px;
  }
`
const ProductName = styled.span`
  text-align: left;

  &:hover {
    color: #5F27CD;
  }
`

const AddButton = styled.button`
  flex: 1;
  margin-left: 5px;
  padding: 15px;
  border: 2px solid #5F27CD;
  background-color: white;
  font-weight: 600;
  text-transform: uppercase;
  color: #5F27CD;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #5F27CD;
    color: white;
  }
`;

const RemoveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5F27CD;
  cursor: pointer;

  &:hover {
    color: red;
  }
`

const Wishlist = () => {
  
  const { cart, addToCart, removeFromCart, removeProduct, clearCart } = useContext(CartContext);

  const{ wishlist, removeFromWishlist, clearWishlist} = useContext(WishlistContext);

  const handleClick = (item) => {
    addToCart(item);
    toast.success('Product added to cart');
    removeFromWishlist(item._id)
  }

  return (
    <Container>
      <Header />
      <StoreSearch />
      <Wrapper>
        <Title>My Wishlist</Title>
        {wishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
        <>
        <Top>
          <Link to="../store" style={{textDecoration: "none", color: "black"}}>
            <TopButton>
                <MdOutlineArrowBackIos size="1.5rem" />
                Continue Shopping
            </TopButton>
          </Link>
        </Top>
        <Bottom>
          <Info>
            <CartInfo>
              <thead>
                <tr>
                  <th style={{width: '10px'}}>Product</th>
                  <th style={{width: '10px'}}>Price</th>
                  <th style={{width: '10px'}}>Availability</th>
                  <th style={{width: '10px'}}></th>
                  <th style={{width: '5px'}}></th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map(item => (
                  <tr>
                    <td>
                      <Product>
                        <img src={item.image} alt={item.productName} />
                        <Link to={`/store/${item._id}`} style={{textDecoration: 'none', color: 'black', textAlign: 'left'}}>
                          <ProductName>{item.productName}</ProductName>
                        </Link>
                      </Product>
                    </td>
                    <td>
                      Rs. {item.price.toFixed(2)}
                    </td>
                    <td>
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </td>
                    <td>                    
                        <AddButton onClick={() => handleClick(item)}>ADD TO CART</AddButton>
                    </td>
                    <td onClick={() => removeFromWishlist(item._id)}>
                        <RemoveButton ><AiOutlineClose /></RemoveButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </CartInfo>
          </Info>
        </Bottom>
        </>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Wishlist;