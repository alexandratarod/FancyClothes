import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
import UserPage from "./pages/UserPage";
import ProductsPage from "./pages/ProductsPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import Order from "./pages/Order";
import MySalesPage from "./pages/MySalesPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/my-products" element={<ProductsPage />} />
        <Route path="/update-product/:id" element={<UpdateProductPage />} />
        <Route path="/orders/find/:id" element={<MyOrdersPage />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/sales/:id" element={<MySalesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
