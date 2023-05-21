import styled from "styled-components";
  
const Container = styled.div`
    display: flex;
    background-color: #2c2c54;
`;
  
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
  
const Logo = styled.h1`
color:white;`;
  
const Desc = styled.p`
    margin: 20px 0px;
    color:white;
`;
  
const SocialContainer = styled.div`
    display: flex;
`;
  
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;
  
const Center = styled.div`
    flex: 1;
    padding: 20px;
`;
  
const Title = styled.h3`
    margin-bottom: 30px;
    color:white;
`;
  
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
  
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    color: white;
`;
  
const Right = styled.div`
    flex: 1;
    padding: 20px;
`;
  
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    color:white;
`;
  
const Payment = styled.img`
      width: 50%;
`;
  
const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>Central Pet Care</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Desc>

        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
            <ListItem>Contact Us</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            94c,Attidiya road,bellanthota,Dehiwala B389, Dehiwala-Mount Lavinia
          </ContactItem>
          <ContactItem>
            +94 77 346 0430
          </ContactItem>
          <ContactItem>
             centralpetcare@gmail.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
};
  
export default Footer;