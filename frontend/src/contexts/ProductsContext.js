import { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {

  const [products, setProducts] = useState([])

  return (
    <ProductsContext.Provider value={{ products, setProducts}}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
