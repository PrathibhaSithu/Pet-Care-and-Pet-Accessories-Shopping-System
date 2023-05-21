import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import { publicRequest } from '../../requestMethods'
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useLocation } from 'react-router-dom';
import noProductsImg from '../../assets/noProducts.png'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

const ProductsContainer = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 40px;

  button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    border: none;
    border-radius: 50%;
    background-color: #f0f0f0;
    color: #333;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #333;
      color: #f0f0f0;
    }

    &:disabled {
      background-color: #f0f0f0;
      color: #333;
      cursor: default;
      opacity: 0.5;
    }

    &.active {
      background-color: #333;
      color: #f0f0f0;
    }
  }
`;

const NoProducts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #999;
  margin-top: 20px;
  padding: 80px;

  img {
    margin-bottom: 20px;
  }

  p {
    font-size: 24px;
    color: #333;
    text-align: center;
  }
`

const Products = () => {

  const { products, setProducts } = useContext(ProductsContext);

  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const category = new URLSearchParams(location.search).get("category");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);  

  useEffect(() => {
      let url = "/products";

      if (search) {
        url = `/products?search=${search}`;
      } else if (category) {
        url = `/products?category=${category}`;
      }

    publicRequest.get(url)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
    });
  }, [search, category])

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }


  return (
    <div>
      {currentProducts.length === 0 ? (
        <NoProducts>
          <img src={noProductsImg} height='200px' />
          <p>Oops, we couldn't find any matches!</p>
        </NoProducts>
      ) : (
        <>
          <ProductsContainer>
            {currentProducts.map((item) => (
              <Product item={item} key={item._id} />
            ))}
          </ProductsContainer>
          <PaginationContainer>
            <button onClick={prevPage} disabled={currentPage === 1}><MdOutlineKeyboardArrowLeft size="2rem" /></button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''} >
                  {i + 1}
              </button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages}><MdOutlineKeyboardArrowRight size="2rem" /></button>
          </PaginationContainer>
        </>
      )}
    </div>
  );
};

export default Products;