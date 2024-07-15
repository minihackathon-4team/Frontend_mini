import styled from "styled-components";

const Error = styled.div`
    padding: 20px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    text-align: center;
`;

const ErrorPage = () => {
    return (
        <Error>
            <h2>Error!</h2>
        </Error>
    );
};

export default ErrorPage;