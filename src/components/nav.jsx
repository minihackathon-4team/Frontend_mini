
export default function Nav() {

  return (
    <>
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <a href={`/`}>Logo</a>
            </li>
            <li>
              <a href={`/login`}>로그인</a>
            </li>
            <li>
              <a href={`/signin`}>회원가입</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
