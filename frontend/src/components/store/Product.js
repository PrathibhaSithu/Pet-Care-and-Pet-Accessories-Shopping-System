import { FiHeart } from 'react-icons/fi';
import { GrCart } from 'react-icons/gr';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from 'react';
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import { toast } from 'react-hot-toast';

const Container = styled.div`
    margin: 5px;
    margin-bottom: 20px;
    min-width: 280px;
    max-width: 100%;
    width: 280px;
    display: flex;
    flex-direction: column;
    flex: 1;
    box-shadow: 0 0 0 0.5px lightgrey;
`;

const Action = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 350px;
  &:hover ${Action} {
    opacity: 1;
  }
`;

const Image = styled.img`
    height: 70%;
    z-index: 2;
`;
  
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
`;

const InfoContainer =  styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid lightgray;
`

const Name = styled.div`
    margin: 6px 5px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
`

const Price = styled.div`
  margin: 6px 5px;
  font-size: 16px;
  font-weight: 500;
  color: #5F27CD;
`
  
const Product = ({ item }) => {

    const { addToCart } = useContext(CartContext);
    const { wishlist, addToWishlist, isItemInWishlist } = useContext(WishlistContext);

    const addProductToCart = () => {
      addToCart(item)
      toast.success('Product added to cart');
    }

    const addProductToWishlist = () => {
      addToWishlist(item)
    }

    return (
      <Container>
        <ImageContainer>
        <Image src={item.image} />
          <Action>
            <Icon onClick={addProductToWishlist} disabled={isItemInWishlist(item._id)}>
              <FiHeart size="1.5rem" />
            </Icon>
            <Icon onClick={addProductToCart}>
              <GrCart size="1.5rem" />
            </Icon>
          </Action>
        </ImageContainer>
        <InfoContainer> 
            <Link to={`/store/${item._id}`} style={{textDecoration: 'none', color: 'black'}}>
            <Name> {item.productName.length > 75 ? item.productName?.slice(0, 75) + "..." : item.productName}</Name>
            </Link>
            <Price>Rs. {item.price?.toFixed(2)}</Price>
        </InfoContainer>
      </Container>
    );
};
  
export default Product;
