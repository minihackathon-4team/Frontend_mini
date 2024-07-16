import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchTool from './searchtool';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-row: 3;
`;

const Loading = styled.h1`
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

const Movie = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  max-width: 200px;
  text-align: center;
`;

const MovieTitle = styled.h2`
  font-size: 18px;
  margin: 10px 0;
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
  background-color: #06c77a;
  color: white;
  cursor: pointer;


`;

function Moviepage() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [moviesList, setMoviesList] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; 

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https:yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`,
      )
    ).json();
    setMovies(json.data.movies);
    setSearchMovies(json.data.movies); 
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleSearch = (event) => {
    setMoviesList(event.target.value);
  };

  const handleButtonClick = () => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(moviesList.toLowerCase())
    );
    setSearchMovies(filtered);
  };

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = searchMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(searchMovies.length / itemsPerPage);

  return (
    <>
      <SearchTool
        moviesList={moviesList}
        handleSearch={handleSearch}
        handleButtonClick={handleButtonClick}
      />

      <Container>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <MovieBox>
              {currentMovies.map((movie) => (
                <Movie key={movie.id}>
                  <Link to={`/${movie.title}`}>
                    <MovieImage src={movie.medium_cover_image} alt={movie.title} />
                  </Link>
                  <MovieTitle>{movie.title}</MovieTitle>
                </Movie>
              ))}
            </MovieBox>
            <Pagination>
              
              {Array.from({ length: totalPages }, (_, index) => (
                <PageButton
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={currentPage === index + 1}
                >
                  {index + 1}
                </PageButton>
              ))}
            </Pagination>
          </>
        )}
      </Container>
    </>
  );
}

export default Moviepage;