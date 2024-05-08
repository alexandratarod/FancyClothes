import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/storage';


const Container = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
    url('https://img.freepik.com/free-photo/fast-fashion-concept-with-pile-clothing_23-2150871333.jpg?t=st=1712940552~exp=1712944152~hmac=f9373535c9ca7e507259fe21639b0872979190cd7a077776ed926f75b945ab17&w=900')
      center;
  background-color: rgba(255, 255, 255, 0.9);
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 200px;
  margin: 0 auto;
  border: none;
  padding: 20px;
  background-color: #6666cc;
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: block;
  &:hover {
    background-color: #6699ff;
  }
`;

const ProductInfo = styled.div`
  margin-top: 20px;
  font-weight: bold;
`;

const Message = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  background-color: #ff0000;
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: 20px;
`;

const UpdateProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [newImg, setNewImg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
        setTitle(response.data.title);
        setSize(response.data.size);
        setPrice(response.data.price);
        setImg(response.data.img);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);


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
  
  const handleUpdateProduct = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
  
      if (!accessToken) {
        console.error('Access token is missing from localStorage');
        return;
      }
  
      const config = {
        headers: {
          Authorization: 'Token ' + accessToken,
        },
      };

      let imgUrl;

      
      if (newImg) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(newImg.name);
        await fileRef.put(newImg);
        imgUrl = await fileRef.getDownloadURL();
        console.log(imgUrl);
      }else{

        imgUrl=img
      } 
     
      await axios.put(`http://localhost:3000/products/${id}`, { title, size, price, img: imgUrl}, config);
  
      setSuccessMessage("Product updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update product!");
      console.error("Error updating product:", error);
    }
  };
  
  return (
    <div>
      <Navbar />
      <Container>
        {product && (
          <Wrapper>
            <InfoContainer>
              <Title>Product Information</Title>
              <ProductInfo>
                {product.img && <img src={product.img} alt="Product" width="200" height="200" />}
                <div>Title: {title}</div>
                <div>Size: {size}</div>
                <div>Price: ${price}</div>
              </ProductInfo>
              {successMessage && <Message>{successMessage}</Message>}
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </InfoContainer>
            <InfoContainer>
              <Title>Update Product</Title>
              <Label>Title:</Label>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Label>Size:</Label>
              <Input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
              <Label>Price:</Label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              <Label>Image:</Label>
              <Input type="file" accept="image/*" onChange={(e) => setNewImg(e.target.files[0])} />
              <Button onClick={handleUpdateProduct}>Update</Button>
            </InfoContainer>
          </Wrapper>
        )}
      </Container>
    </div>
  );
};

export default UpdateProductPage;
