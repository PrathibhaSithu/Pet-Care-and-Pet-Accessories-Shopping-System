import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 60px;
    background-color: #E9E3FF;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;


const SearchContainer = styled.div`
    border: 0.5px solid lightgrey;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
    outline: none;
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.image`
    font-weight: bold;
    font-size: 30px;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`;


const Navbar = () => {
    return (
        <div>
            <Container>
                <Wrapper>
                    <Left>
                        <Logo>Central Pet Care</Logo>
                    </Left>
                    <Center></Center>
                    <Right>
                        <MenuItem>Sign In</MenuItem>
                        <MenuItem>Register</MenuItem>
                    </Right>
                </Wrapper>
            </Container>
        </div>
    )
}

export default Navbar