import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";
import styled from "styled-components";

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
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  @media only screen and (max-width: 380px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);

  @media only screen and (max-width: 380px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  font-size: 24px;

  @media only screen and (max-width: 380px) {
    font-size: 20px;
  }
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;

  @media only screen and (max-width: 380px) {
    padding: 8px;
  }
`;

const Button = styled.button`
  width: 200px;
  margin: 0 auto;
  border: none;
  padding: 20px;
  background-color: #6666CC;
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: block;

  &:hover {
    background-color: #6699FF; 
  }

  @media only screen and (max-width: 380px) {
    width: 100%;
    padding: 15px;
  }
`;

const UserInfo = styled.div`
  margin-top: 20px;
  font-weight: bold;

  @media only screen and (max-width: 380px) {
    font-size: 14px;
  }
`;

const Message = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: 20px;

  @media only screen and (max-width: 380px) {
    padding: 8px;
    margin-top: 15px;
  }
`;

const ErrorMessage = styled.div`
  background-color: #FF0000;
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: 20px;

  @media only screen and (max-width: 380px) {
    padding: 8px;
    margin-top: 15px;
  }
`;

const UserPage = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createdAt, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          console.error("Access token is missing from localStorage");
          return;
        }

        const config = {
            headers: { authorization: "Token " + accessToken }
          };
  
        const response = await axios.get(`https://fancyclothes.onrender.com/users/find/${id}`, config);
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setDate(response.data.createdAt);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]); 

  const handleUpdateUser = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        console.error("Access token is missing from localStorage");
        return;
      }

      const config = {
        headers: { authorization: "Token " + accessToken }
      };

      if (password !== confirmPassword) {
        setErrorMessage("Password and Confirm Password must match!");
        return;
      }

      let updatedData = { name, email };


      if (password && password.trim() !== '') {
        updatedData.password = password;
      }
  
      await axios.put(`https://fancyclothes.onrender.com/users/${id}`, updatedData, config);

      

      setUser({ ...user, name, email });
      setSuccessMessage("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
    <Navbar />
    <Container>
      {user && (
        <Wrapper>
          <InfoContainer>
            <Title>User Information</Title>
            <UserInfo>
              <img src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1713788907~exp=1713792507~hmac=f2f8744464568c6a5fa3d2fcfe5ac20c31fb0b2c58ecc4420a16bc2af0db1b9e&w=740" alt="User Icon" width="100" height="100" />
              <div>Name: {name}</div>
              <div>Joined: {createdAt.substring(0, 10)} </div>
            </UserInfo>
            {successMessage && <Message>{successMessage}</Message>}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </InfoContainer>
          <InfoContainer>
            <Title>Update Profile</Title>
            <Label>Name:</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label>New Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label>Confirm Password:</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handleUpdateUser}>Update</Button>
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
    </div>
  );
};

export default UserPage;
