import React from 'react';
import noOrders from '../../assets/noOrders.png';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #999;
  padding: 60px;
  width: 100%;

  img {
    margin-bottom: 20px;
  }

  p {
    margin-top: 10px;
    font-size: 24px;
    color: #333;
    text-align: center;
  }
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 20px;
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

const NoOrders = () => {
  return (
    <Container>
        <img src={noOrders} height='300px' />
        <p>There are no orders yet!</p>
        <Link to="../store" style={{textDecoration: "none", color: "black"}}>
            <Button>
                Shop Now
            </Button>
        </Link>
    </Container>
  )
}

export default NoOrders