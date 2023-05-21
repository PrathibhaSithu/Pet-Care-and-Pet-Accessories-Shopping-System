import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import styled from "styled-components";
import Footer from '../../components/store/Footer'
import Navbar from '../../components/store/Navbar'
import StoreSearch from '../../components/store/StoreSearch'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { publicRequest } from '../../requestMethods';
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import { FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Header from '../../components/store/Header/Header';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
  align-items: center;
`;

const InfoContainer = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 0px 50px;
`;

const Title = styled.h1`
  display: flex;
  font-weight: 500;
  margin-bottom: 30px;
  text-align: left;
  text-transform: none;
`;


const Sku = styled.span`
  display: flex;
  margin-bottom: 20px;
`

const Availability = styled.span`
  display: flex;
  color: green;
  margin-bottom: 20px;
`

const Price = styled.span`
  display: flex;
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 30px;
`;

const AddContainer = styled.div`
  width: 70%;
  margin-top: 50px;
  display: flex;
  align-items: center;
`;

const QtyContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Quantity = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  border: 2px solid #5F27CD;
  margin: 0px 5px;
  padding: 8px;
  font-weight: 500;
  font-size: 1.2rem;
`;

const QtyButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: rgba(95, 39, 205, 0.9);
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  outline: none;

  &:hover {
    background-color: #5F27CD;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const AddCart = styled.button`
  flex: 1;
  margin-left: 5px;
  padding: 15px;
  border: none;
  background-color: rgba(95, 39, 205, 0.9);
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #5F27CD;
    color: white;
  }
`;

const AddWishlist = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  padding: 10px;
  border: none;
  background-color: white;
  color: #5F27CD;
  border: 2px solid #5F27CD;
  border-radius: 5px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #5F27CD;
    color: white;
  }
`;

const ServiceContainer = styled.div`
  margin-top: 10%;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Service = styled.div`
  flex: 1;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ServiceImage = styled.img`
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
`;

const ServiceName = styled.span`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
`;

const DescContainer  = styled.div`
  margin-top: 20px;
`;

const DescTop = styled.span`
  display: flex;
  flex: 1;
  margin: 20px 0px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

const DescButton = styled.button`
  border: none;
  font-size: 24px;
  border-bottom: 2px solid black;
  cursor: pointer;
  background-color: white;
`;

const Desc = styled.p`
  margin: 20px 0px;
  white-space: pre-wrap;
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, isItemInWishlist } = useContext(WishlistContext);

  const getProduct = async () => {
    publicRequest.get("/products/" + id)
    .then(res => {
        setProduct(res.data)
    })
    .catch(err => {
        console.log(err)
    })
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      quantity < product.quantity && setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    addToCart(product, quantity);
    toast.success('Product added to cart');
  }

  return (
    <Container>
      <Header />
      <StoreSearch />
      <Wrapper>
        <Top>
        <ImgContainer>
          <Image src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.productName}</Title>
          <Sku>SKU: {product.SKU}</Sku>
          <Availability>{product.inStock === true ? "In Stock" : "Out of Stock"}</Availability>
          <Price>Rs. {product.price?.toFixed(2)}</Price>
          <AddContainer>
            <QtyContainer>
              <QtyButton onClick={() => handleQuantity("dec")}><AiOutlineMinus size="1.5rem" /></QtyButton>
              <Quantity>{quantity}</Quantity>
              <QtyButton onClick={() => handleQuantity("inc")}><AiOutlinePlus size="1.5rem" /></QtyButton>
            </QtyContainer>
            <AddCart onClick={handleClick}>ADD TO CART</AddCart>
            <AddWishlist onClick={() => addToWishlist(product)}><FaRegHeart size="1.5rem" /></AddWishlist>
          </AddContainer>
          <ServiceContainer>
            <Service>
              <ServiceImage src="https://cdn-icons-png.flaticon.com/512/10108/10108187.png" />
              <ServiceName>Genuine Product</ServiceName>
            </Service>
            <Service>
              <ServiceImage src="https://cdn-icons-png.flaticon.com/512/1792/1792671.png" />
              <ServiceName>Fast Delivery</ServiceName>
            </Service>
            <Service>
              <ServiceImage src="https://cdn-icons-png.flaticon.com/512/3760/3760135.png" />
              <ServiceName>Secure Payment</ServiceName>
            </Service>
          </ServiceContainer>
        </InfoContainer>
        </Top>
        <DescContainer>
          <DescTop>
            <DescButton>Description</DescButton>
          </DescTop>
          <Desc>
            {product.description}
          </Desc>
        </DescContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;