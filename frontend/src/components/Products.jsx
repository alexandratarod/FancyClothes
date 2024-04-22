import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const accessToken = localStorage.getItem('accessToken');
//         console.log(accessToken);

//         if (!accessToken) {
//           console.error("Access token is missing from localStorage");
//           return;
//         }

//         const config = {
//           headers: { authorization: "Token " + accessToken }
//         };

//         const response = await axios.get("http://localhost:3000/products", config);
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <Container>
//       {products.map((item) => (
//         <Product item={item} key={item._id} />
//       ))}
//     </Container>
//   );
// };

const Products = ({ products }) => {
  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
