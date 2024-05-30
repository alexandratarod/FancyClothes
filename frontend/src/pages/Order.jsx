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
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 2;
  background-color: white;
  border: 0.5px solid lightgray;
  border-radius: 10px;
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
  width: 217px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
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
  height: 40vh;
  background-color: white;
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
          .get(`http://localhost:3000/orders/${orderId}`, config)
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
          .get(`http://localhost:3000/orders/${orderId}/products`, config)
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

  console.log(order);

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
                      <Image src={product?.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product?.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product?._id}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductPrice>{product?.price} RON</ProductPrice>
                    </PriceDetail>
                  </Product>
                  {index < products.length - 1 && <Hr />}{" "}
                  {/* Adăugăm linie orizontală între produse */}
                </div>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Status</SummaryItemText>
                <SummaryItemPrice>{order?.status}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>{order?.amount} RON</SummaryItemPrice>
              </SummaryItem>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
      );
    </div>
  );
};

export default Order;
