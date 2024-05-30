import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    url("https://img.freepik.com/free-vector/set-sketches-beautiful-diverse-female-fashion-outfits_1150-52762.jpg?t=st=1713788619~exp=1713792219~hmac=d8badce3d960372dfaed70a2b5219edf23ac213b27ae4b57e66d1b1668870511&w=900")
      center;
  background-color: rgba(255, 255, 255, 0.9);
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 380px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;

  @media only screen and (max-width: 380px) {
    font-size: 24px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  @media only screen and (max-width: 380px) {
    display: block;
    width: 100%;
  }
`;

const StyledTh = styled.th`
  background-color: #f0f0f0;
  color: #333;
  font-weight: 500;
  padding: 12px 15px;
  border-bottom: 2px solid #ccc;

  @media only screen and (max-width: 380px) {
    display: none;
  }
`;

const StyledTd = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  word-wrap: break-word; /* Adaugăm linie nouă pentru a asigura că textul se încadrează pe celulă */

  @media only screen and (max-width: 380px) {
    display: block;
    padding: 8px 10px;
    position: relative;
    border: none;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    word-wrap: break-word; /* Pentru textul care depășește lățimea celulei */
    white-space: initial; /* Permite textului să se încadreze pe mai multe linii */
    text-align: left; /* Alinierea textului pe stânga */
  }
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }

  @media only screen and (max-width: 380px) {
    display: block;
    margin-bottom: 10px;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 10px;
  }
`;

const ViewButton = styled.button`
  padding: 6px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  @media only screen and (max-width: 380px) {
    padding: 5px 10px;
    font-size: 14px;
  }
`;

const MyOrdersPage = () => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: { authorization: "Token " + accessToken },
  };

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
    if (userId) {
      const fetchMyOrders = () => {
        axios
          .get(`https://fancyclothes.onrender.com/orders/find/${userId}`, config)
          .then((response) => {
            setOrders(response.data);
          })
          .catch((error) => {
            console.log("Error fetching user orders", error);
            setOrders([]);
          });
      };

      fetchMyOrders();
    }
  }, [userId]);

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <div>
          <Title>Orders</Title>
          <StyledTable>
            <thead>
              <tr>
                <StyledTh>#</StyledTh>
                <StyledTh>Amount</StyledTh>
                <StyledTh>Status</StyledTh>
                <StyledTh>Created At</StyledTh>
                <StyledTh>Action</StyledTh>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <StyledTr key={index}>
                  <StyledTd data-label="#"> {index + 1} </StyledTd>
                  <StyledTd data-label="Amount"> {order.amount} </StyledTd>
                  <StyledTd data-label="Status"> {order.status} </StyledTd>
                  <StyledTd data-label="Created At"> {order.createdAt.substring(0, 10)} </StyledTd>
                  <StyledTd data-label="Action">
                    <ViewButton onClick={() => handleViewDetails(order._id)}>View Details</ViewButton>
                  </StyledTd>
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      </Container>
    </div>
  );
};

export default MyOrdersPage;
