import React from "react";
import Product from "./Product";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Products = ({ products, onDeleteClick }) => {
  const handleDelete = (productId) => {
    onDeleteClick(productId);
  };

  // Filtrarea produselor care nu sunt achiziționate
  const availableProducts = products.filter((item) => !item.purchased);

  return (
    <Container>
      {availableProducts.map((item) => (
        <Product key={item._id} item={item} onDeleteClick={handleDelete} />
      ))}
    </Container>
  );
};

export default Products;
