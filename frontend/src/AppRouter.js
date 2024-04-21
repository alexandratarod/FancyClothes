import React from 'react';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Products from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import AddProduct from './pages/AddProduct';



const AppRouter = () => {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default AppRouter;