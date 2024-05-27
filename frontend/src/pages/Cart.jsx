import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios';
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#6666cc" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" ? "none" : "2px solid #6666cc"};
  background-color: ${(props) => props.type === "filled" ? "#6666cc" : "transparent"};
  color: ${(props) => props.type === "filled" ? "white" : "black"};
  text-decoration: none;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  padding: 10px;
`;

const Details = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductName = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6666cc;
  color: white;
  font-weight: 600;
`;

const DeleteButton = styled.button`
  padding: 5px;
  margin-left: 10px;
  background-color: #ff6347;
  color: white;
  border: none;
  cursor: pointer;
`;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          const userId = decodedToken.id;
  
          const response = await axios.get(`https://fancyclothes.onrender.com/cart/find/${userId}`);
          const products = response.data.products;
  
          const productsWithDetails = await Promise.all(products.map(async (item) => {
            const productResponse = await axios.get(`https://fancyclothes.onrender.com/products/${item.productId}`);
            return {
              ...item,
              ...productResponse.data
            };
          }));
  
          setCart(productsWithDetails);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    fetchCart();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.id;
        await axios.delete(`https://fancyclothes.onrender.com/cart/${userId}/${productId}`);
        
        localStorage.setItem("cartLength", cart.length - 1);
        
        setCart(cart.filter(item => item.productId !== productId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = cartTotal > 0 ? 5.90 : 0;
  

  localStorage.setItem("cartLength", cart.length);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <StyledLink to="/products" type="transparent">
            CONTINUE SHOPPING
          </StyledLink>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.map((item) => (
              <div key={item.productId}>
                <Product>
                  <ProductDetail>
                    <Image src={item.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.title}
                      </ProductName>
                      <ProductSize>
                        <b>Size:</b> {item.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductPrice>$ {item.price}</ProductPrice>
                    <DeleteButton onClick={() => handleDeleteProduct(item.productId)}>Delete</DeleteButton>
                  </PriceDetail>
                </Product>
                <Hr />
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cartTotal.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ {shippingCost.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {(cartTotal + shippingCost).toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};
export default Cart;