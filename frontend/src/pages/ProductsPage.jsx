import styled from "styled-components";
import { useState, useEffect } from "react";
import Products from "../components/Products";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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
  const [userId, setUserId] = useState(null); // Definirea userId în scopul mai larg

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
  }, []);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "My Products") {
      fetchMyProducts(userId);
    } else {
      fetchAllProducts();
    }
  };

  const accessToken = localStorage.getItem("accessToken");
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
      .get("http://localhost:3000/products", config)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all products", error);
        setProducts([]);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const showAddProductButton = selectedOption === "My Products";

  return (
    <Container>
      <Navbar />
      <FilterContainer>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSelectChange} value={selectedOption}>
            <Option value="All Products">All Products</Option>
            <Option value="My Products">My Products</Option>
          </Select>
        </Filter>
        <RightSection>
          {showAddProductButton && (
            <Filter>
              <AddProductButton to="/add-product">Add Product</AddProductButton>
            </Filter>
          )}
        </RightSection>
      </FilterContainer>
      <Products products={products} />
    </Container>
  );
};

export default ProductsPage;
