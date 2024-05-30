import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  @media only screen and (min-width: 576px) {
    padding: 50px;
    flex-direction: row;
  }
`;
const ImgContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  @media only screen and (min-width: 576px) {
    width: 50%;
    margin-bottom: 0px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;

  @media only screen and (min-width: 576px) {
    max-height: 450px;
  }
`;
const InfoContainer = styled.div`
  width: 100%;

  @media only screen and (min-width: 576px) {
    width: 50%;
    padding: 0px 50px;
    text-align: left;
  }
`;
const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
`;
const Desc = styled.p`
  margin: 20px 0px;
  font-size: 16px;
`;
const Price = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
const UnavailableMessage = styled.span`
  padding-top: 10px;
  font-size: 14px;
  color: red;
`;
const Size = styled.h2`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;
const AddedBy = styled.h2`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;
const AddContainer = styled.div`
  width: 100%;

  @media only screen and (min-width: 576px) {
    width: auto;
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: ${props => props.disabled ? '#CCCCCC' : '#6666CC'};
  color: ${props => props.disabled ? '#888888' : 'white'};
  font-weight: bold;
  cursor: pointer;

  @media only screen and (min-width: 576px) {
    width: auto;
  }

  &:hover {
    background-color: ${props => props.disabled ? '#CCCCCC' : '#6699FF'}; 
  }
`;

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addedBy, setAddedBy] = useState('');
  const [inCart, setInCart] = useState(false); 
  const navigate = useNavigate(); 

  const addToCart = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.id;
        console.log(userId);

        const response = await axios.post(`https://fancyclothes.onrender.com/cart`, {
          userId: userId,
          productId: product._id, 
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });

        const updatedCartLength = parseInt(localStorage.getItem("cartLength") || 0) + 1;
        localStorage.setItem("cartLength", updatedCartLength);

        
        setInCart(true); 
        
        await axios.put(`https://fancyclothes.onrender.com/products/${product._id}/inCart`, { inCart: true });
        
        navigate("/products");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fancyclothes.onrender.com/products/${id}`);
        setProduct(response.data);
        
        setInCart(response.data.inCart); 
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
            <Price>
              {inCart && <UnavailableMessage>Unavailable</UnavailableMessage>}
              ${product.price}
            </Price>
            <AddContainer>
              <Button onClick={addToCart} disabled={inCart}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default ProductPage;
