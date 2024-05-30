import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Products from "../components/Products";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div``;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;

const AddProductButton = styled(NavLink)`
  text-decoration: underline;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
`;

const RightSection = styled.div`
  margin-left: auto;
`;

const ProductsPage = () => {
  const [selectedOption, setSelectedOption] = useState("All Products");
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAccessToken = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const id = decodedToken.id;
        setUserId(id);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("accessToken");
        }
      }
    };

    checkAccessToken();

    if (location.pathname === "/my-products") {
      setSelectedOption("My Products");
      if (userId) {
        fetchMyProducts(userId);
      }
    } else if (location.pathname === "/products") {
      setSelectedOption("All Products");
      fetchAllProducts();
    }
  }, [location.pathname, userId]);

  useEffect(() => {
    if (selectedOption === "My Products" && userId) {
      fetchMyProducts(userId);
    } else {
      fetchAllProducts();
    }
  }, [selectedOption, userId]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "My Products") {
      navigate("/my-products");
    } else {
      navigate("/products");
    }
  };

  const accessToken = localStorage.getItem("accessToken");
  const showMyProductsOption = accessToken !== null;

  const config = {
    headers: { authorization: "Token " + accessToken },
  };

  const fetchMyProducts = (userId) => {
    axios
      .get(`http://localhost:3000/products/my-products/${userId}`, config)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user products", error);
        setProducts([]);
      });
  };

  const fetchAllProducts = () => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all products", error);
        setProducts([]);
      });
  };

  
  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:3000/products/${productId}`, config)
      .then(() => {
        if (selectedOption === "My Products" && userId) {
          fetchMyProducts(userId);
        } else {
          fetchAllProducts();
        }
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  };

  return (
    <Container>
      <Navbar />
      <FilterContainer>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSelectChange} value={selectedOption}>
            <Option value="All Products">All Products</Option>
            {showMyProductsOption && <Option value="My Products">My Products</Option>}
          </Select>
        </Filter>
        <RightSection>
          {selectedOption === "My Products" && (
            <Filter>
              <AddProductButton to="/add-product">Add Product</AddProductButton>
            </Filter>
          )}
        </RightSection>
      </FilterContainer>
      <Products products={products} onDeleteClick={handleDelete} />
    </Container>
  );
};

export default ProductsPage;
