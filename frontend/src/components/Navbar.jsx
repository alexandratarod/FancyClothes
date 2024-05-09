import { Badge, Menu, MenuItem } from "@material-ui/core";
import { Search, ShoppingCartOutlined, Person } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
`;

const MyMenuItem = styled.div`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    color: darkgrey;
  }
`;

const UserIconContainer = styled.div`
  font-size: 30px;
  color: #6666cc;
  cursor: pointer;
  margin-right: 15px;
  margin-top: 5px;
  justify-content: center;

  &:hover {
    color: darkgrey;
  }
`;

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // Definirea userId în scopul mai larg
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
        const id = decodedToken.id; // Salvarea ID-ului utilizatorului într-o stare
        setUserId(id); // Actualizarea userId cu ID-ul utilizatorului
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
    navigate("/auth/login");
  };

  const loggedIn = localStorage.getItem("accessToken");

  const handleProfileClick = () => {
    navigate(`/user/${userId}`); // Utilizarea userId în handleClickProfile
  };

  const handleMyOrdersClick = () => {
    navigate(`/orders/find/${userId}`);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
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
                <MenuItem onClick={handleMyOrdersClick}>MY ORDERS</MenuItem>
                <MenuItem onClick={handleMenuClose}>MY SALES</MenuItem>
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
