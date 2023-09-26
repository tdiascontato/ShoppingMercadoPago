import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { App } from './Components/App/Index';
import { Item } from "./Components/Item/Index";
import { Cadastro } from './Components/Cadastro/Index';
import { Login } from './Components/Login/Index';
import { ErrorPage } from './Components/ErrorPage/Index';
import { Home } from './Components/Home/Index';
import { Dashboard } from './Components/Dashboard/Index';

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif; 
  }
`;

const isLoggedIn = window.localStorage.getItem("loggedIn");
function getDashboardOrLoginComponent() {
  return isLoggedIn ? <Dashboard /> : <Login />;
}

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/Home', 
        element: <Home/>, 
      },
      {
        path: '/dashboard', 
        element:  getDashboardOrLoginComponent(),   
      },
      {
        path: '/item/:id', 
        element: <Item />, 
      },
      {
        path: '/login', 
        element: getDashboardOrLoginComponent(), 
      },
      {
        path: '/cadastro', 
        element: <Cadastro />, 
      },
    //element: isLoggedIn == "true" ? <Product /> : <Login />,
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <GlobalStyle />
        <RouterProvider router={router} />
  </React.StrictMode>
);
