import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    url("https://img.freepik.com/free-vector/set-sketches-beautiful-diverse-female-fashion-outfits_1150-52762.jpg?t=st=1713788619~exp=1713792219~hmac=d8badce3d960372dfaed70a2b5219edf23ac213b27ae4b57e66d1b1668870511&w=900")
      center;
  background-color: rgba(255, 255, 255, 0.9);
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  padding-bottom:20px;
  
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Info = styled.div`
  background-color: white;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  margin-right: 20px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 0;
`;

const Summary = styled.div`
  background-color: white;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  margin-bottom: 20px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span`
  font-weight: bold;
`;

const Order = () => {
  const { id: orderId } = useParams(); // Preluarea id-ului din URL
  const [userId, setUserId] = useState(null);
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const checkAccessToken = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const id = decodedToken.id;
        setUserId(id);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("accessToken");
          setUserId(null); // Reset userId if the token has expired
        }
      }
    };

    checkAccessToken();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchMyOrder = () => {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
        axios
          .get(`https://fancyclothes.onrender.com/orders/${orderId}`, config)
          .then((response) => {
            setOrder(response.data);
          })
          .catch((error) => {
            console.log("Error fetching user order", error);
            setOrder(null);
          });
      };

      const fetchMyProducts = () => {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
        axios
          .get(`https://fancyclothes.onrender.com/orders/${orderId}/products`, config)
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.log("Error fetching user order", error);
            setProducts(null);
          });
      };

      fetchMyOrder();
      fetchMyProducts();
    }
  }, [userId]);

  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>YOUR ORDER</Title>
          <Bottom>
            <Info>
              {products?.map((product, index) => (
                <div key={index}>
                  <Product>
                    <ProductDetail>
                      <Image src={product?.img} alt={product?.title} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product?.title}
                        </ProductName>
                        <ProductId>
                        <b>SIZE:</b> {product?.size}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductPrice>${product?.price}</ProductPrice>
                    </PriceDetail>
                  </Product>
                  {index < products.length - 1 && <Hr />}{" "}
                  
                </div>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Status</SummaryItemText>
                <SummaryItemPrice>{order?.status}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>${order?.amount}</SummaryItemPrice>
              </SummaryItem>
            </Summary>
          </Bottom>
        </Wrapper>
        </Container>
    </div>
  );
};

export default Order;
