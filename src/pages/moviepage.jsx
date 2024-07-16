import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchTool from './searchtool';

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-row: 3;
`;

const Loading = styled.h1`
  text-align: center;
`;

const Movieindiv = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  max-width: 200px;
  text-align: center;
`;

const MovieBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  flex-wrap: wrap;
  gap: 20px;
  justify-items: center;
  justify-content: center;
`;

const MovieTitle = styled.h2`
  font-size: 18px;
  margin: 10px 0;
  text-decoration: none;
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.active ? '#067ac7' : '#f0f0f0'};
  color: ${(props) => props.active ? 'white' : 'black'};
  cursor: pointer;
  display: ${(props) => props.hide ? 'none' : 'inline-block'};
  
  &:hover {
    background-color: ${(props) => props.disabled ? '#ddd' : '#067ac7'};
    color: ${(props) => props.disabled ? 'initial' : 'white'};
  }

  &:focus {
    outline: none;
  }

  ${(props) => props.disabled && `
    display: none;
  `}
`;

function Mmo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moviesList, setMoviesList] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBlock, setCurrentBlock] = useState(0);
  const itemsPerPage = 20;
  const pagesPerBlock = 10;

  const fetchData = async () => {
    try {
      const response = await axios.get('https://port-0-minihackathon-12-lyec0qpi97716ac6.sel5.cloudtype.app/movie/list');
      setData(response.data);
      setSearchMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setMoviesList(event.target.value);
  };

  const handleButtonClick = () => {
    const filtered = data.filter((movie) =>
      movie.title_kor.toLowerCase().includes(moviesList.toLowerCase())
    );
    setSearchMovies(filtered);
  };

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = searchMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(searchMovies.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousBlock = () => {
    setCurrentPage(currentBlock * pagesPerBlock);
    setCurrentBlock(currentBlock - 1);
  };

  const handleNextBlock = () => {
    setCurrentPage((currentBlock + 1) * pagesPerBlock + 1);
    setCurrentBlock(currentBlock + 1);
  };

  const renderPagination = () => {
    const startPage = currentBlock * pagesPerBlock + 1;
    const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);

    return (
      <Pagination>
        <PageButton onClick={handlePreviousBlock} disabled={currentBlock === 0}>
          Previous
        </PageButton>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <PageButton
            key={page}
            onClick={() => handlePageChange(page)}
            active={currentPage === page}
          >
            {page}
          </PageButton>
        ))}
        <PageButton onClick={handleNextBlock} disabled={endPage >= totalPages}>
          Next
        </PageButton>
      </Pagination>
    );
  };

  return (
    <>
      <SearchTool
        moviesList={moviesList}
        handleSearch={handleSearch}
        handleButtonClick={handleButtonClick}
      />
      <Container>
        {loading ? (
          <Loading>데이터를 불러오는 중...</Loading>
        ) : (
          <>
            <MovieBox>
              {currentMovies.map(item => (
                <Movieindiv key={item.id}>
                  <Link to={`/movie/${item.id}`} style={{textDecoration: "none", color:"#067ac7"}}>
                    <MovieImage src={item.poster_url} alt={item.title_kor} />
                    <MovieTitle>{item.title_kor}</MovieTitle>
                  </Link>
                </Movieindiv>
              ))}
            </MovieBox>
            {renderPagination()}
          </>
        )}
      </Container>
    </>
  );
}

export default Mmo;