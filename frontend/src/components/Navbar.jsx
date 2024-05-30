import { Badge, Menu, MenuItem } from "@material-ui/core";
import { Search, ShoppingCartOutlined, Person } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Container = styled.div`
  height: 50px;
  border-bottom: 1px solid lightgray;

  @media only screen and (max-width: 380px) {
    height: 40px;
  }
`;

const Wrapper = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  margin-left: 5px;
  font-size: 14px;
  cursor: pointer;

  @media only screen and (max-width: 380px) {
    font-size: 12px;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MyMenuItem = styled.div`
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;

  @media only screen and (max-width: 380px) {
    font-size: 12px;
    margin-right: 5px;
  }

  &:hover {
    color: darkgrey;
  }
`;

const UserIconContainer = styled.div`
  font-size: 20px;
  color: #6666cc;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 2px;

  @media only screen and (max-width: 380px) {
    font-size: 18px;
    margin-right: 5px;
  }

  &:hover {
    color: darkgrey;
  }
`;

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); 
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {

    const storedCartLength = localStorage.getItem("cartLength");
    if (storedCartLength) {
      setCartLength(parseInt(storedCartLength));
    }


    const checkAccessToken = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const id = decodedToken.id; 
        setUserId(id); 
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("accessToken");
          navigate("/auth/login");
        }
      }
    };

    checkAccessToken();
  }, [navigate]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.setItem("cartLength", 0);
    navigate("/auth/login");
  };

  const loggedIn = localStorage.getItem("accessToken");

  const handleProfileClick = () => {
    navigate(`/user/${userId}`); 
  };

  const handleMyOrdersClick = () => {
    navigate(`/orders/find/${userId}`);
  };

  const handleMySalesClick = () => {
    navigate(`/sales/${userId}`);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>FANCY CLOTHES</Logo>
          </NavLink>
        </Left>
        <Right>
          {loggedIn ? (
            <>
              <UserIconContainer>
                <Person
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                />
              </UserIconContainer>

              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleProfileClick}>PROFILE</MenuItem>
                <MenuItem component={NavLink} to="/products" onClick={handleMenuClose}>PRODUCTS</MenuItem>
                <MenuItem onClick={handleMyOrdersClick}>MY ORDERS</MenuItem>
                <MenuItem onClick={handleMySalesClick}>MY SALES</MenuItem>
                <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
              </Menu>
            </>
          ) : (
            <NavLink
              to="/auth/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MyMenuItem>SIGN IN</MyMenuItem>
            </NavLink>
          )}
          <NavLink
            to="/cart"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MyMenuItem>
              <Badge badgeContent={cartLength} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MyMenuItem>
          </NavLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
