import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";
import styled from "styled-components";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px 50px;
`;
const Title = styled.h1`
  font-weight: bold;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: bold;
  font-size: 25px;
  padding-bottom: 20px;
`;
const Size = styled.h1`
  font-weight: bold;
  font-size: 25px;
  padding-bottom: 20px;
`;

const AddedBy = styled.h1`
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 20px;
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  width: auto;
  border: none;
  padding: 20px 20px;
  margin-top: 20px;
  background-color: #6666CC;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px; 
  &:hover {
    background-color: #6699FF; 
  }
`;

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addedBy, setAddedBy] = useState('');
  const navigate = useNavigate(); 

  const addToCart = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axios.post(`https://fancyclothes.onrender.com/cart`, {
          userId: product.userId,
          productId: product._id, 
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });

        const updatedCartLength = parseInt(localStorage.getItem("cartLength") || 0) + 1;
        localStorage.setItem("cartLength", updatedCartLength);

        navigate("/products");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fancyclothes.onrender.com/products/${id}`, );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const getUserInfo = async (userId) => {
        try {

          const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          console.error("Access token is missing from localStorage");
          return;
        }

        const config = {
            headers: { authorization: "Token " + accessToken }
          };
          const response = await axios.get(`https://fancyclothes.onrender.com/users/find/${userId}`, config);
          setAddedBy(response.data.name);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      };

      getUserInfo(product.userId);
    }
  }, [product]);

  return (
    <Container>
      <Navbar />
      {product && (
        <Wrapper>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.description}</Desc>
            <Size>Size: {product.size}</Size>
            <AddedBy>Added by: {addedBy}</AddedBy>
            <Price>${product.price}</Price>
            <AddContainer>
              <Button onClick={addToCart}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default ProductPage;
