import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 83vh;
  background: linear-gradient(
      rgba(100, 100, 100, 0.3),
      rgba(100, 100, 100, 0.3)
    ),
    url(https://img.freepik.com/free-photo/enthusiastic-woman-long-dress-posing-one-leg-cloakroom_197531-7148.jpg?t=st=1713019684~exp=1713023284~hmac=9bc125221d21eed7db5ed299ea367e6b42371aa4c06180239f2cb4fd815d5cec&w=900)
      left top -50px;
  background-size: cover;
  padding-top: 50px;

  @media only screen and (max-width: 576px) {
    height: 100vh;
    padding-top: 20px;
  }
`;

const ContentWrapper = styled.div`
  text-align: right;
  padding:100px;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media only screen and (max-width: 576px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;

  @media only screen and (max-width: 576px) {
    font-size: 14px;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  margin-top: 20px;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: bold;
  background-color: #fff;
  color: #000;
  text-decoration: none;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }

  @media only screen and (max-width: 576px) {
    font-size: 16px;
  }
`;

const Home = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <ContentWrapper>
          <Title>WELCOME TO FANCY CLOTHES!</Title>
          <Description>Style with a story!</Description>
          <StyledNavLink to="/products">Shop Now</StyledNavLink>
        </ContentWrapper>
      </Container>
    </div>
  );
};

export default Home;
