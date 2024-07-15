import React, { useState, useEffect } from "react";
import MovieCardView from "../component/movies/MovieCardView";
import api from "https://port-0-minihackathon-12-lyec0qpi97716ac6.sel5.cloudtype.app/movie/list";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #eee;
  gap: 8px;
  justify-content: start;
  margin: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const PageButton = styled.button`
  border: 1px solid #ddd;
  padding: 5px;
  width: 28px;
  margin: 0 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkgray;
  }

  &:focus {
    outline: none;
    background-color: royalblue;
  }
`;

function Movies() {
  const [movies, setMovies] = useState([]); // 영화 데이터
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수

  // 총 페이지 수 계산
  useEffect(() => {
    const totalPage = async () => {
      try {
        const res = await api.moviePage(0, 10);
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    totalPage();
  }, []);

  useEffect(() => {
    const movieList = async () => {
      try {
        const res = await api.moviePageList(currentPage, 10);
        console.log(res.data);
        setMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    movieList();
  }, [currentPage]);

  // 페이지 이동
  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1);
  };

  const renderPagination = () => {
    return (
      <PaginationContainer>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <PageButton key={page} onClick={() => handlePageChange(page)}>
            {page}
          </PageButton>
        ))}
      </PaginationContainer>
    );
  };

  return (
    <>
      {renderPagination()}
    </>
  );
}

export default Movies;