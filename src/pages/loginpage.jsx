import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Navlogo from "../components/navlogo";

const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:90vh;
`;

const LoginSetting = styled.div`
  padding: 20px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center;
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const LoginButton = styled.div`
  margin-top: 50px;

  button {
    padding: 10px 10px;
    width: 70%;
    background-color: #067ac7;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #1b4a7d;
    }
  }
`;

const SignUpLink = styled.button`
  background: none;
  border: none;
  color: #067ac7;
  cursor: pointer;
  font-size: 12px;
  float: right;
  margin-right: 12%;
  font-size: 15px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = styled.button`
  margin-top: 10px;
  background: none;
  border: 1px solid #067ac7;
  color: #067ac7;
  padding: 8px 16px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  width:70%;

  &:hover {
    background-color: #067ac7;
    color: white;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  color: #ff3a6e;
`;

const Loginpage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const loginData = { username, password };
      console.log('Sending login data:', loginData); // Log the data being sent
      const response = await axios.post('https://hottomato.store/member/login/', loginData);
      if (response.data) {
        sessionStorage.setItem("access", response.data.access);
        sessionStorage.setItem("nickname", response.data.user.nickname);
        alert('로그인에 성공했습니다.');
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        console.log(errors);
        setMessage(errors.non_field_errors ? errors.non_field_errors[0] : '로그인에 실패했습니다. 다시 시도해주세요.');
      } else {
        setMessage('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const goToSignup = () => {
    navigate('/signuppage');
  };

  const goBack = () => {
    navigate(-1); // Go back to the previous page using react-router-dom's navigate function
  };

  return (
  <>
  <Navlogo/>
    <Login>
      <LoginSetting>
        <h2>Login</h2>
        <Input
          type='text'
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <SignUpLink onClick={goToSignup}>Sign Up</SignUpLink>
        </div>
        <LoginButton>
          <button type="button" onClick={handleLogin}>Login</button>
        </LoginButton>
        <BackButton type="button" onClick={goBack}>Previous</BackButton>
        {message && <ErrorMessage>{message}</ErrorMessage>}
      </LoginSetting>
    </Login>
  </>
  );
}

export default Loginpage;