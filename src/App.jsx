import { Navigate, Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import MasterLayout from './Components/MasterLayout/MasterLayout';
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import Categories from './Components/Categories/Categories';
import Login from './Components/Authentication/Login/Login';
import Register from './Components/Authentication/Register/Register';
import { useContext, useEffect } from 'react';
import { TokenContext } from './Context/UserToken';
import ProtectedRoutes, { Anonymous, AnonymousRegister } from './ProtectedRoute/ProtectedRoute';
import ProductsDetails from './Components/Home/ProductsDetails/ProductsDetails';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from 'react-hot-toast';

function App() {

  let { settoken } = useContext(TokenContext)

  useEffect(() => {

    if (localStorage.getItem('freshCartToken'))
      settoken(localStorage.getItem('freshCartToken'))

  }, [])


  const Routers = createBrowserRouter([

    {
      path: '/', element: <MasterLayout />, errorElement: <NotFound />, children: [

        { path: '/', element: <Home /> },
        { path: 'brands', element: <Brands /> },
        { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: 'products', element: <Products /> },
        { path: 'categories', element: <Categories /> },
        { path: 'productsdetails/:id', element: <ProductsDetails /> },
        { path: 'allorders', element: <Navigate to="/" /> },
        { path: 'login', element: <Anonymous><Login /></Anonymous> },
        { path: 'register', element: <Anonymous><Register /></Anonymous> },
        { path: '*', element: <NotFound /> },

      ]
    },
  ])

  return (
    <>

      <Toaster />
      <RouterProvider router={Routers} />

    </>
  );
}

export default App;
