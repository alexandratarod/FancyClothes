import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";

const Container = styled.div`
  width: 100vw;
  height: 73vh ; 
  background: linear-gradient(
    rgba(0, 0, 100, 0.2),
    rgba(0, 0, 100, 0.2)
    ),
    url(https://img.freepik.com/free-photo/enthusiastic-woman-long-dress-posing-one-leg-cloakroom_197531-7148.jpg?t=st=1713019684~exp=1713023284~hmac=9bc125221d21eed7db5ed299ea367e6b42371aa4c06180239f2cb4fd815d5cec&w=900) left top -65px; 
  background-size: cover; 
  padding-top: 50px; 
`;

const ContentWrapper = styled.div`
  text-align: right;
  margin-right: 100px;
  margin-top: 100px; 
  color: #fff;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

const Home = () => {
  return (
    <div>
      <Navbar />
      <SecondNavbar />
      <Container>
        <ContentWrapper>
          <Title>WELCOME TO FANCY CLOTHES!</Title>
          <Description>Style with a story!</Description>
        </ContentWrapper>
      </Container>
    </div>
  );
};

export default Home;
