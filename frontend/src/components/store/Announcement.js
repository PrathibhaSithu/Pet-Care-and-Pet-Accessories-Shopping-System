import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    height: 25px;
    background-color: #9980FA;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`;

const Annoucement = () => {
  return (
    <div>
        <Container>
            Super Deal! Free Shipping on Orders Over Rs.2000
        </Container>
    </div>
  )
}

export default Annoucement