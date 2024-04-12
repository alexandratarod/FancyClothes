import { useNavigate } from 'react-router-dom';
import { VisibilityOutlined} from "@material-ui/icons";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  display: flex;
  flex-direction: column; /* Afișează elementele în coloană */
  align-items: center; /* Aliniază elementele la centru */
  margin: 5px;
  min-width: 280px;
  height: 350px;
  position: relative;
  background-color: #f5fbfd;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;


const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Title = styled.h3`
  margin-top: 10px;
`;

const Price = styled.p`
  margin-top: 5px;
  font-weight: bold;
`;

const Product = ({ item }) => {
  const navigate = useNavigate();

  const handleVisibilityClick = () => {
    navigate(`/product/${item._id}`);
  };

  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Icon onClick={handleVisibilityClick}>
          <VisibilityOutlined />
        </Icon>
      </Info>
      <Title>{item.title}</Title>
      <Price>{item.price} RON</Price>
    </Container>
  );
};

export default Product;
