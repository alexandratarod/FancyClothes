import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  @media only screen and (max-width: 576px) {
    padding: 10px;
   }
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
  border: ${(props) =>
    props.type === "filled" ? "none" : "2px solid #6666cc"};
  background-color: ${(props) =>
    props.type === "filled" ? "#6666cc" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "black")};
  text-decoration: none;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 576px) {
    flex-direction:column;
   }
`;

const Info = styled.div`
  flex: 3;
  @media only screen and (max-width: 576px) {
    flex-direction:column;
   }
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 576px) {
    flex-direction:column;
   }
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;

  @media only screen and (max-width: 576px) {
    flex-direction:column;
   }
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

  @media only screen and (max-width: 576px) {
    flex-direction:column;
   }
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  @media only screen and (max-width: 576px) {
    margin-bottom:20px;
   }
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
  cursor: pointer;
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
  const [stripeToken, setStripeToken] = useState(null);
  const [inCart, setInCart] = useState(false); 
  const navigate = useNavigate();
  

  const onToken = (token) => {
    setStripeToken(token); 
    handleCheckout();
  };

  const calculateTotal = () => {
    return (
      cart.map((item) => item.price).reduce((acc, curr) => acc + curr, 0) + 5.9
    );
  };

  const total = calculateTotal().toFixed(2);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          const userId = decodedToken.id;
          console.log(userId);
          
          const response = await axios.get(
            `https://fancyclothes.onrender.com/cart/find/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }

          );
          
          const products = response.data.products;

          const productsWithDetails = await Promise.all(
            products.map(async (item) => {
              const productResponse = await axios.get(
                `https://fancyclothes.onrender.com/products/${item.productId}`
              );
              return {
                ...item,
                ...productResponse.data,
              };
            })
          );

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
        await axios.delete(
          `https://fancyclothes.onrender.com/cart/${userId}/${productId}`
        );

        localStorage.setItem("cartLength", cart.length - 1);

        setCart(cart.filter((item) => item.productId !== productId));

        setInCart(false); 
        
        await axios.put(`https://fancyclothes.onrender.com/products/${productId}/inCart`, { inCart: false });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = cartTotal > 0 ? 5.9 : 0;

  localStorage.setItem("cartLength", cart.length);

  const handleCheckout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.id;
  
       
        await axios.post(
          `https://fancyclothes.onrender.com/orders`,
          {
            userId: userId,
            products: cart.map(item => ({
              productId: item.productId,
              quantity: 1 
            })),
            amount: total,
            status: "pending", 
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
  
        
        await axios.put(
          `https://fancyclothes.onrender.com/products/purchase/${userId}`, 
          { cartItems: cart }
        );
  
       
        await axios.delete(`https://fancyclothes.onrender.com/cart/${userId}`);
  
        
        setCart([]);
        localStorage.setItem("cartLength", 0);
  
        
        navigate(`/orders/find/${userId}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <StyledLink to="/products" type="transparent">
            CONTINUE SHOPPING
          </StyledLink>
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
                    <DeleteButton
                      onClick={() => handleDeleteProduct(item.productId)}
                    >
                      Delete
                    </DeleteButton>
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
              <SummaryItemPrice>
                $ {(cartTotal + shippingCost).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>
           
            <StripeCheckout
              name="Fancy Clothes"
              image=""
              billingAddress
              shippingAddress
              description={`Your total is $${total}`}
              amount={total * 100}
              token={onToken}
              stripeKey={'pk_test_51PM2f7FdpeCuXPKqFgfqrun3LEtM8cX3MUuErVt8e6Zw04jfR8UqrMXDHw4a0HIGrZIWStAXxFd9eRLlhixCQAJC00J0BBbYvt'}
            >
               <Button >CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};
export default Cart;