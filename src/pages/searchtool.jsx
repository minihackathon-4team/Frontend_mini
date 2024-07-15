import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  margin-left: 10px;
  font-size: 16px;
  background-color: #067ac7;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;

const SearchTool = ({ moviesList, handleSearch, handleButtonClick }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="제목을 입력하세요"
        value={moviesList}
        onChange={handleSearch}
      />
      <SearchButton onClick={handleButtonClick}>검색</SearchButton>
    </SearchContainer>
  );
};

export default SearchTool;
