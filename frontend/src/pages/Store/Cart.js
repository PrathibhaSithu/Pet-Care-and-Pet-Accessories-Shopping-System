
import{ MdOutlineArrowBackIos } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from '../../components/store/Footer'
import Navbar from '../../components/store/Navbar'
import { useEffect, useState, useContext } from 'react';
import { CartContext } from "../../contexts/CartContext";
import { publicRequest, userRequest } from '../../requestMethods';
import EmptyCart from '../../components/store/EmptyCart';
import StoreSearch from '../../components/store/StoreSearch';
import Header from '../../components/store/Header/Header';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

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

const QtyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Quantity = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 4px;
  border: 2px solid #5F27CD;
  margin: 0px 2px;
  padding: 8px;
`;

const QtyButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 8px;
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

const Summary = styled.div`
  flex: 1;
  border: 2px solid lightgray;
  margin-top: 8px;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  display: flex;
  justify-content: center;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
  border-top: ${(props) => props.type === "total" && "2px solid #ccc"};
  padding-top: ${(props) => props.type === "total" && "10px"};

  &:last-child {
    margin-top: 20px;
    font-weight: bold;
  }
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Checkout = styled.button`
  width: 100%;
  padding: 10px;
  background-color: rgba(95, 39, 205, 0.9);
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #5F27CD;
  }
`;

const Cart = () => {

  const {user, setUser} = useContext(UserContext)
  
  const { cart, addToCart, removeFromCart, removeProduct, clearCart } = useContext(CartContext);

  const [subTotal, setSubTotal] = useState(cart.total)
  const [taxes, setTaxes] = useState(0)
  const [shippingDiscount, setShippingDiscount] = useState(0)

  useEffect(() => {
    // Recalculate summary variables whenever cart is updated
    setSubTotal(cart.total);
    // setTaxes(cart.total * 0.01);
    // setShippingDiscount(cart.total > 2000 ? 600 : 0);
  }, [cart]);


  const handleCheckout = async () => {
    try{
      let res = ''
      if(user === null) {
        res = await publicRequest.post("/checkout/create-checkout-session", {
          cartItems: cart.items,
          amount: cart.total
        })
      }
      else {
        res = await userRequest.post("/checkout/create-checkout-session-logged-in", {
          cartItems: cart.items,
          amount: cart.total
        })
      }
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Header />
      <StoreSearch />
      <Wrapper>
        <Title>My Cart</Title>
        {cart.items.length === 0 ? (
          <EmptyCart />
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
                  <th style={{width: '10px'}}>Quantity</th>
                  <th style={{width: '10px'}}>Subtotal</th>
                  <th style={{width: '5px'}}></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map(item => (
                  <tr>
                    <td>
                      <Product>
                        <img src={item.product.image} alt={item.product.productName} />
                        <Link to={`/store/${item.product._id}`} style={{textDecoration: 'none', color: 'black', textAlign: 'left'}}>
                          <ProductName>{item.product.productName}</ProductName>
                        </Link>
                      </Product>
                    </td>
                    <td>
                      Rs. {item.product.price.toFixed(2)}
                    </td>
                    <td>
                      <QtyContainer>
                        <QtyButton onClick={() => removeFromCart(item.product._id)}><AiOutlineMinus size="1.5rem" /></QtyButton>
                        <Quantity>{item.cartQuantity}</Quantity>
                        <QtyButton onClick={() => addToCart(item.product)}><AiOutlinePlus size="1.5rem" /></QtyButton>
                      </QtyContainer>
                    </td>
                    <td>Rs. {(item.product.price * item.cartQuantity).toFixed(2)}</td>
                    <td onClick={() => removeProduct(item.product._id)}><RemoveButton ><AiOutlineClose /></RemoveButton></td>
                  </tr>
                ))}
              </tbody>
            </CartInfo>
          </Info>


          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {subTotal?.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Taxes</SummaryItemText>
              <SummaryItemPrice>Rs. {taxes?.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>- Rs. {shippingDiscount?.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. {(subTotal + taxes - shippingDiscount)?.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>         
            <Checkout onClick={handleCheckout}>Checkout</Checkout>
          </Summary>
        </Bottom>
        </>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;