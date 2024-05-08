import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";
import styled from "styled-components";

const Container = styled.div`
`;

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
  padding:50px 50px;
`;

const Title = styled.h1`
  font-weight: bolt;

`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: bolt;
  font-size: 25px;
  padding-bottom: 20px;
`;

const Size = styled.h1`
  font-weight: bolt;
  font-size: 25px;
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

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
            <Price>{product.price} RON</Price>
            <AddContainer>
              <Button>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
    </Container>

  );
};

export default ProductPage;