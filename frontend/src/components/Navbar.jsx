import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined, Person } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import loggedIn from "../pages/Login"


const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid lightgray;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 30px;
  padding: 8px;
  width: 350px;
`;

const Input = styled.input`
  width: 350px;
  border: none;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 15px;
`;

const MenuItem = styled.div`
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 30px;
`;

const UserIcon = styled(Person)`
  font-size: 30px;
  color: darkblue; 
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Logo>FANCY CLOTHES</Logo>
        </NavLink>
        </Left>
        <Center>
        <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Center>
        <Right>
        {/*
        {loggedIn ? ( 
              <MenuItem>
                <UserIcon style={{ fontSize: 30 }} /> {}
              </MenuItem>
          ) : (
          */}
            <NavLink to="/auth/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>SIGN IN</MenuItem>
            </NavLink>
         {/*} )}*/}
        <NavLink to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </NavLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;