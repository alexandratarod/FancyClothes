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
  border-radius: 10px;

  @media only screen and (max-width: 380px) {
    width: 60%;
   }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Subtitle = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: #ff6347;
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

const firebaseConfig = {
  apiKey: "AIzaSyB-rwpuNWbLrWN4vL5uWbUkL11PsfevzSM",
  authDomain: "fancyclothesic.firebaseapp.com",
  projectId: "fancyclothesic",
  storageBucket: "fancyclothesic.appspot.com",
  messagingSenderId: "162868135705",
  appId: "1:162868135705:web:e491d376bd95be7d14e788"
};


firebase.initializeApp(firebaseConfig);

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImage] = useState(null);
  const [labels, setLabels] = useState([]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
   
    const firebaseConfig = {
      apiKey: "AIzaSyB-rwpuNWbLrWN4vL5uWbUkL11PsfevzSM",
      authDomain: "fancyclothesic.firebaseapp.com",
      projectId: "fancyclothesic",
      storageBucket: "fancyclothesic.appspot.com",
      messagingSenderId: "162868135705",
      appId: "1:162868135705:web:e491d376bd95be7d14e788"
    };

    firebase.initializeApp(firebaseConfig);
  }, []);

  const handleGenerateLabels = async () => {
    try {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(img.name);
      await fileRef.put(img);
      const imageUrl = await fileRef.getDownloadURL();

      const response = await axios.get('https://fancyclothes.onrender.com/labels/generate-labels', {
        params: { imageUrl }
      });

      console.log("Labels response:", response.data);
      setLabels(response.data.labels);

      return response.data.labels;
    } catch (error) {
      setError('Failed to generate labels');
      console.error('Label generation error:', error);
    }
  };

  const handleGenerateDescription = async () => {
    try {
      
      const generatedLabels = await handleGenerateLabels();

      console.log(generatedLabels);

      const response = await axios.post('https://fancyclothes.onrender.com/chatgpt/generate-description', { labels: generatedLabels, title});

      console.log("Description response:", response.data);
      setDescription(response.data.description);
      return response.data.description;
    } catch (error) {
      setError('Failed to generate description');
      console.error('Description generation error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const generatedDescription = await handleGenerateDescription();
      console.log(generatedDescription);
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

      const productData = {
        title,
        size,
        price,
        img: imageUrl,
        description: generatedDescription,
      };

      
      const addProductResponse = await axios.post('https://fancyclothes.onrender.com/products/add-product', productData, config);

      if (addProductResponse.status === 200) {
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
          <Subtitle>Description for your product will be generated automatically! </Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Product Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Product Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
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
