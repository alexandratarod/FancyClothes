import { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://img.freepik.com/free-photo/fast-fashion-concept-with-pile-clothing_23-2150871333.jpg?t=st=1712940552~exp=1712944152~hmac=f9373535c9ca7e507259fe21639b0872979190cd7a077776ed926f75b945ab17&w=900") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 20px); 
  margin: 10px auto; 
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: #6666CC;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    background-color: #6699FF;
  }
`;

const LinkStyled = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
`;

const AddProduct = () => {
  const [title, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImage] = useState('');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/products/add-product', {
        title,
        price,
        img,
      });
      console.log(response.data);
      setAdded(true); 
    } catch (error) {
      setError("Failed to add product!");
      console.error('Add product error:', error);
    }
  };

  
  if (added) {
    return <Navigate to="/products" />;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>ADD A NEW PRODUCT</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Product Name"
              value={title}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Image URL"
              value={img}
              onChange={(e) => setImage(e.target.value)}
            />
            <Button type="submit">ADD PRODUCT</Button>
          </Form>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <LinkStyled to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
            VIEW ALL PRODUCTS
          </LinkStyled>
        </Wrapper>
      </Container>
    </div>
  );
};

export default AddProduct;
