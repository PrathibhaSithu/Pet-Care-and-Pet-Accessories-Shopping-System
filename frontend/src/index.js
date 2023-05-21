import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CartContextProvider from './contexts/CartContext';
import ProductsContextProvider from './contexts/ProductsContext';
import WishlistContextProvider from './contexts/WishlistContext';
import { UserContextProvider } from './contexts/UserContext';
import { AppProvider } from './contexts/AppContext';

//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <AppProvider>
              <App />
            </AppProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </ProductsContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
