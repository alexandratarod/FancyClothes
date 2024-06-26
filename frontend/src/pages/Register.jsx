import { NavLink, Navigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'
import React, { useState } from 'react';
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/premium-photo/positive-blonde-female-black-eyeglasses-chooses-fashionable-clothes-coat-rack_613910-7631.jpg?w=826")
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

  @media only screen and (max-width: 576px) {
    width: 60%;
   }
  
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
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const PasswordInput = styled.input.attrs({ type: 'password' })`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  text-align:center;
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
  display: block;
`;

const Message = styled.div`
  background-color: #FF0000;
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: 20px;
`;

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post('https://fancyclothes.onrender.com/auth/register', {
                name,
                email,
                password,
            });
            console.log(response.data); 
            setRegistered(true); 
        } catch (error) {
            setError("Registration failed!");
            console.error('Registration error:', error);
        }
    };

    if (registered) {
        return <Navigate to="/auth/login" />;
    }

    return (
      <div>
        <Navbar/>
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <PasswordInput
                        type="password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button type="submit">REGISTER</Button>
                </Form>
                {error && <Message>{error}</Message>}
                
                <NavLink to="/auth/login" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                    <Link>ALREADY HAVE AN ACCOUNT? LOGIN</Link>
                </NavLink>
            </Wrapper>
        </Container>
        </div>
    );
};

export default Register;