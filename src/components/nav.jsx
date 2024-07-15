import React from 'react';
import styled from 'styled-components';

const Navbar = styled.div`
  display: flex;
  justify-content: space-between; /* Align items to the left and right */
  align-items: center; /* Center items vertically */
  font-size: 16px;
  background-color: #067ac7;
  padding: 10px 20px; /* Adjusted padding */
`;

const NavList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 20px; /* Adjusted margin */
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 700;
  padding: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Logo = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 700;
`;

const Nav = () => {
  return (
    <Navbar>
      <Logo href="/">Logo</Logo>
      <NavList>
        <NavItem>
          <NavLink href="/loginpage">로그인</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/signup">회원가입</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/detailedpage">상세페이지</NavLink>
        </NavItem>
      </NavList>
    </Navbar>
  );
};

export default Nav;