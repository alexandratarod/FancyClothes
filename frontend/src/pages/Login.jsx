import { NavLink, Navigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'
import { useState, useContext } from 'react';
import Navbar from "../components/Navbar";




const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/young-man-shirt-choosing-clothes-mall-clothing-store_23-2148175648.jpg?t=st=1712931555~exp=1712935155~hmac=ecae712e4369bc075d6b4626c9202d9a0832d9b3fe45f48525fdd87d2ac9a551&w=900")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 18px;
  
`;

const PasswordInput = styled.input.attrs({ type: 'password' })`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  text-width: 50%;
  font-size: 18px;
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

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto; 
  text-align:center;
`;

const Message = styled.div`
  background-color: #FF0000;
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: 20px;
`;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const res = await axios.post("https://fancyclothes.onrender.com/auth/login", { email, password });
      const accessToken = res.data.accessToken; 
      localStorage.setItem('accessToken', accessToken); 
      setIsLoggedIn(true); 
    } catch (err) {
      console.log(err);
      setError(true);
    }
  
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">LOGIN</Button>
            {error && <Message>Wrong email or password!</Message>}
            <NavLink to="/auth/register" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
              <Link>CREATE A NEW ACCOUNT</Link>
            </NavLink>
          </Form>
        </Wrapper>
      </Container>
      {isLoggedIn && <Navigate to="/products" />}
    </div>
  );
};

export default Login;