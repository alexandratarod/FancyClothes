import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/storage';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url('https://img.freepik.com/free-photo/fast-fashion-concept-with-pile-clothing_23-2150871333.jpg?t=st=1712940552~exp=1712944152~hmac=f9373535c9ca7e507259fe21639b0872979190cd7a077776ed926f75b945ab17&w=900')
      center;
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
  background-color: #6666cc;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    background-color: #6699ff;
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
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImage] = useState(null);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDm0AJFnnfz8brO8ysEgr2KVb4jI865xsU",
      authDomain: "fancyclothes-3baa8.firebaseapp.com",
      projectId: "fancyclothes-3baa8",
      storageBucket: "fancyclothes-3baa8.appspot.com",
      messagingSenderId: "391809455618",
      appId: "1:391809455618:web:86b4b0adc087321860391b",
      measurementId: "G-XLF7EXD4LM"
    };
    firebase.initializeApp(firebaseConfig);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(img.name);
      await fileRef.put(img);
      const imageUrl = await fileRef.getDownloadURL();

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access token is missing from localStorage');
        return;
      }

      const config = {
        headers: {
          authorization: 'Token ' + accessToken,
        },
      };

      const response = await axios.post('http://localhost:3000/products/add-product', { title, price, img: imageUrl }, config);

      if (response.status === 200) {
        setAdded(true);
      } else {
        setError('Failed to add product!');
      }
    } catch (error) {
      setError('Failed to add product!');
      console.error('Add product error:', error);
    }
  };

  if (added) {
    return <Navigate to="/my-products" />;
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
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

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