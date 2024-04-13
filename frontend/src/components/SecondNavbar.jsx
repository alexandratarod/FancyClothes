import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  height: 50px;
  background-color: #6666CC;
  color: #fff;
  display: flex;
  justify-content: center; 
  align-items: center; 
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 30px;
  justify-content: center;
`;

const MenuItem = styled.li`
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  height: 50px; 
  display: flex;
  padding-right: 32px;
  padding-left: 32px;
  align-items: center; 
  &:hover {
    background-color:#6699FF;
    color: #fff;
  }
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  height: 50px;
  color: inherit;
  display: flex;
  align-items: center;
  padding-top: 5px; 
`;

const SecondNavbar = () => {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <MenuItem>
            <NavLinkStyled to="/products">Products</NavLinkStyled>
          </MenuItem>
          <MenuItem>
            <NavLinkStyled to="/categories">Categories</NavLinkStyled>
          </MenuItem>
          <MenuItem>
            <NavLinkStyled to="/contact">Contact</NavLinkStyled>
          </MenuItem>
        </Menu>
      </Wrapper>
    </Container>
  );
};

export default SecondNavbar;
