import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    padding: 10px 20px;
    width: 30%;
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
  margin-right: 15%;

  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
  background: none;
  border: 1px solid #067ac7;
  color: #067ac7;
  padding: 8px 16px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #067ac7;
    color: white;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: #ff3a6e;
`;

const Loginpage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { id, password });
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        const errors = error.response.data;
        if (errors.non_field_errors) setMessage(errors.non_field_errors[0]);
        else setMessage('로그인에 실패했습니다. 다시 시도해주세요.');
      } else {
        setMessage('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const goBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <Login>
      <LoginSetting>
        <h2>Login</h2>
        <Input
          type='text'
          placeholder="Username"
          value={id}
          onChange={(e) => setId(e.target.value)}
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
          <button onClick={handleLogin}>Login</button>
        </LoginButton>
        <BackButton onClick={goBack}>Previous</BackButton>
        {message && <ErrorMessage>{message}</ErrorMessage>}
      </LoginSetting>
    </Login>
  )
}

export default Loginpage;
