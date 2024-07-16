import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navlogo from '../components/navlogo';

const SignUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
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
  margin-top: 20px;

  button {
    padding: 10px 20px;
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

const BackButton = styled.button`
  margin-top: 20px;
  background: none;
  border: 1px solid #067ac7;
  color: #067ac7;
  padding: 8px 16px;
  border-radius: 3px;
  cursor: pointer;
  width:70%;
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

const Signuppage = () => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('https://hottomato.store/member/signup', { username, nickname, password });
      if (response.status === 200) {
        navigate('/loginpage');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        const errors = error.response.data;
        if (errors.non_field_errors) setMessage(errors.non_field_errors[0]);
        else if (errors.username) setMessage(`Username: ${errors.username[0]}`);
        else if (errors.nickname) setMessage(`Nickname: ${errors.nickname[0]}`);
        else setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      } else {
        setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const goLogin = () => {
    navigate('/loginpage');
  };

  return (
    <>
      <Navlogo/>
      <SignUp>
        <SignUpSetting>
          <h2>Sign Up</h2>
          <div className='input-group'>
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className='input-group'>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password Confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <SignUpButton>
            <button onClick={handleSignUp}>Sign Up</button>
          </SignUpButton>
          <BackButton onClick={goBack}>Previous</BackButton>
          {message && <ErrorMessage>{message}</ErrorMessage>}
        </SignUpSetting>
      </SignUp>
    </>
  );
}

export default Signuppage;
