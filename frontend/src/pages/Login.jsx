import { NavLink } from "react-router-dom";
import styled from "styled-components";



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/premium-photo/male-female-mannequins-fashionable-bright-clothes-window-clothing-store-front-view_120897-3817.jpg?w=900")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 18px;
  
`;

const PasswordInput = styled.input.attrs({ type: 'password' })`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  text-width: 50%;
  font-size: 18px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: darkblue;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto; 
  &:hover {
    background-color: blue; 
  }
  
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto; 
  text-align:center;
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="email" />
          <PasswordInput placeholder="password" />
          <Button>LOGIN</Button>
          <NavLink to="/register" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
          <Link >
          CREATE A NEW ACCOUNT
          </Link>
          </NavLink>
        
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;