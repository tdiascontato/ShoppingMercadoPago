import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Product } from './Components/Product';
import { Cadastro } from './Components/Cadastro/Index';
import { Login } from './Components/Login/Index';

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif; 
  }
`;

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Login/>,
  },
  {
    path: '/cadastro', 
    element: <Cadastro />, 
  },
  {
    path: '/product', 
    element: <Product />, 
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <GlobalStyle />
        <RouterProvider router={router} />
  </React.StrictMode>
);
