import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
  padding-bottom: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const ProductCard = styled.div`
  background-color: white;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const ProductDetails = styled.div`
  margin-top: 20px;
`;

const ProductName = styled.div`
  font-weight: bold;
`;

const ProductInfo = styled.div`
  margin-top: 10px;
`;

const ProductId = styled.span`
  font-weight: bold;
`;

const ProductColor = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 5px;
`;

const ProductSize = styled.span`
  font-weight: bold;
`;

const ProductQuantity = styled.span`
  font-weight: bold;
`;

const ProductPrice = styled.div`
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
`;

const MySalesPage = () => {
  const { userId } = useParams();
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.id;
        const response = await axios.get(`https://fancyclothes.onrender.com/products/purchased-products/${userId}`);
        setPurchasedProducts(response.data);
        
      } catch (error) {
        console.log("Error fetching user purchased products", error);
        setPurchasedProducts([]);
      }
    };

    fetchPurchasedProducts();
  }, [userId]);

  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>YOUR SALES</Title>
          <Info>
            {purchasedProducts.map((product, index) => (
              <ProductCard key={index}>
                <ProductImage src={product?.img} alt={product?.title} />
                <ProductDetails>
                  <ProductName>{product?.title}</ProductName>
                  <ProductInfo>
                    <ProductSize>
                      <ProductId>Size:</ProductId> {product?.size}
                    </ProductSize>
                  </ProductInfo>
                  <ProductPrice>${product?.price}</ProductPrice>
                </ProductDetails>
              </ProductCard>
            ))}
          </Info>
        </Wrapper>
      </Container>
    </div>
  );
};

export default MySalesPage;
