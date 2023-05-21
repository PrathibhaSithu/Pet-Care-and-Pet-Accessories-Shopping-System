import React from 'react'
import styled from 'styled-components'
import Annoucement from '../../components/store/Announcement'
import CategoryMenu from '../../components/store/CategoryMenu'
import Footer from '../../components/store/Footer'
import Navbar from '../../components/store/Navbar'
import Newsletter from '../../components/store/Newsletter'
import Products from '../../components/store/Products'
import StoreSearch from '../../components/store/StoreSearch'
import Header from '../../components/store/Header/Header'

const Catalog = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const CategoryList = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 25px 10px;
`
const ProductList = styled.div`
  flex: 5;
`

const ProductCatalog = () => {
  return (
    <div>
        <Header />
        <Annoucement />
        <StoreSearch />

        <Catalog>
          <CategoryList>
            <CategoryMenu />
          </CategoryList>
          <ProductList>
            <Products />
          </ProductList>
        </Catalog>

        <Newsletter />
        <Footer />
    </div>
  )
}

export default ProductCatalog