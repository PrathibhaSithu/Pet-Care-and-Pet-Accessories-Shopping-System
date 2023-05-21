import React, { useContext, useEffect } from 'react';
import Footer from '../../components/store/Footer'
import Navbar from '../../components/store/Navbar'
import orderSuccess from '../../assets/orderSuccess.png';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import StoreSearch from '../../components/store/StoreSearch';
import { CartContext } from "../../contexts/CartContext";
import Header from '../../components/store/Header/Header';

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;

  img {
    margin-bottom: 20px;
  }

  h1 {
    margin-top: 10px;
    font-size: 40px;
    color: #9980FA;
    text-transform: uppercase;
  }

  h2 {
    color: #999;
    text-transform: uppercase;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 25px;
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

const Success = () => {

  const { cart, clearCart } = useContext(CartContext);

  useEffect(() => {
    if (cart.items.length > 0) { // add this check
      clearCart();
    }
  }, [cart, clearCart])

  return (
    <Container>
    <Header />
    <StoreSearch />
      <Wrapper>
          <img src={orderSuccess} height='200px' />
          <h1>Thank you</h1>
          <h2>for your order</h2>
          <Link to="../store" style={{textDecoration: "none", color: "black"}}>
              <Button>
                  Continue Shopping
              </Button>
          </Link>
      </Wrapper>
    <Footer />
    </Container>
  )
}

export default Success