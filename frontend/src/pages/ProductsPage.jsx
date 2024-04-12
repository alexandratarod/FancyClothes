import styled from "styled-components";
import { useState, useEffect } from "react";
import Products from "../components/Products";
import Navbar from "../components/Navbar";
import { NavLink} from "react-router-dom";

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
  
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

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
      <Products />
    </Container>
  );
};

export default ProductsPage;
