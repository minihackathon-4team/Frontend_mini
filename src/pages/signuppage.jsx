import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignUpSetting = styled.div`
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

const SignUpButton = styled.div`
  margin-top: 50px;

  button {
    padding: 10px 20px;
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

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: #ff3a6e;
`;

const Signuppage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('/api/signup', { id, password });
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        const errors = error.response.data;
        if (errors.non_field_errors) setMessage(errors.non_field_errors[0]);
        else setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      } else {
        setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
      <SignUp>
        <SignUpSetting>
          <h2>Sign Up</h2>
          <Input
            type="text"
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
          <Input
            type="password"
            placeholder="Password Confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SignUpButton>
            <button onClick={handleSignUp}>Sign Up</button>
          </SignUpButton>
          {message && <ErrorMessage>{message}</ErrorMessage>}
        </SignUpSetting>
      </SignUp>
  )
}

export default Signuppage