import styled from "styled-components";

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  background-color: #1606c7;
  padding-top: 10px;
  padding-bottom: 8px;
  padding-left: 3cqmin;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
`;

const NavItem = styled.li`
  font-size: 20px;
  padding-right: 50px;
  overflow: auto;
`;

const NavLink = styled.a`
  text-decoration: none;
  padding-top: 9px;
  color: black;
  font-weight: 700;
  align-content: center;

  &:link {
    text-decoration: none;
  }
`;

const Navigation = styled.nav`
  display: flex;
`;

export default function Nav() {

  return (
    <>
      <div className="navbar">
        <nav>
          <ul>
              <a href={`/`}>Logo</a>
              <a href={`/loginpage`}>로그인</a>
              <a href={`/signup`}>회원가입</a>
              <a href={`/detailedpage`}>상세페이지</a>
          </ul>
        </nav>
      </div>
    </>
  );
}
