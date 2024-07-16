import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Nav from '../components/nav';

export default function Detailedpage() {
  const { movieid } = useParams();
  const [movies, setMovies] = useState(null);
  const [titlekr, setTitleKr] = useState('');
  const [titleen, setTitleEn] = useState('');
  const [posterurl, setPostUrl] = useState('');
  const [genre, setGenre] = useState('');
  const [showtime, setShowTime] = useState('');
  const [releasedate, setReleaseDate] = useState('');
  const [plot, setPlot] = useState('');
  const [rating, setRating] = useState('');
  const [directorname, setDirectorName] = useState('');
  const [directorimgurl, setDirectorImgUrl] = useState('');
  const [actors, setActors] = useState([]);
  const [comments, setComments] = useState([]);

  const getMovies = async () => {
    try {
      const res = await axios.get(`https://hottomato.store/mainpage/detail/${movieid}`);
      console.log('영화 정보 로딩 성공!');

      const data = res.data;
      setMovies(data);
      setTitleKr(data.title_kor);
      setTitleEn(data.title_eng);
      setPostUrl(data.poster_url);
      setGenre(data.genre);
      setShowTime(data.showtime);
      setReleaseDate(data.release_date);
      setPlot(data.plot);
      setRating(data.rating);
      setDirectorName(data.director_name);
      setDirectorImgUrl(data.director_image_url);
      setActors(data.actors);
      setComments(data.comments);
    } catch (err) {
      console.error('에러:', err);
    }
  };

  useEffect(() => {
    getMovies();
  }, [movieid]);

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <Nav></Nav>
    <Pagewrapper>
      <ContentWrapper>
        <MovieTitle>
          <h2>{titlekr}</h2>
          <h3>{titleen}</h3>
        </MovieTitle>
        <MovieLayout>
          <img 
          src={posterurl} 
          alt="Movie Poster" />
          <MovieInfo className='MovieInfo'>
            <MovieData><h4>평점</h4><h5>{rating}점</h5></MovieData>
            <MovieData><h4>장르</h4><h5>{genre}</h5></MovieData>
            <MovieData><h4>개봉일</h4><h5>{releasedate}</h5></MovieData>
            <MovieData><h4>상영시간</h4><h5>{showtime}분</h5></MovieData>
            <MoviePlot>
              <h4>줄거리</h4>
              <h5>{plot}</h5>
            </MoviePlot>
          </MovieInfo>
        </MovieLayout>
        <h1>인물정보</h1>
        <ActorsInfo>
          <div>
          <img 
          src={directorimgurl} 
          alt="Director" />
          <h5 style={{color:'#4f4f4f'}}>감독</h5>
          <h5>{directorname}</h5>
          </div>
          {actors.map((actor, index) => (
            <div key={index}>
              <img 
              src={actor.image_url} 
              alt={actor.name} />
              <h5 style={{color:'#4f4f4f'}}>{actor.character}</h5>
              <h5>{actor.name}</h5>
            </div>
          ))}
        </ActorsInfo>
        <h1>comment</h1>
        <InputCommentBox>
          <InputComment></InputComment>
          <InputButton>작성</InputButton>
        </InputCommentBox>
        <CommentsWrapper >
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <h5 style={{color:'#2d5774'}}>{comment.user.nickname}</h5>
              <hr></hr>
              <p>{comment.comment}</p>
            </Comment>
          ))}
        </CommentsWrapper>
      </ContentWrapper>
    </Pagewrapper>
    </>
  );
}

const Pagewrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 0 auto;
  padding: 0 20px;  
  max-width: 100vw;  
  box-sizing: border-box;  
  overflow-x: hidden;  

  h1 {
    font-size: 20px;
    margin: 20px 0px 10px 0px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;  
  box-sizing: border-box;  
`;



const MovieTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: baseline;
  gap: 10px;

  h2 {
    font-size: 25px;
  }

  h3 {
    color: #b8b8b8;
  }
`;


const MovieLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;

  img {
    width: 250px;
  }
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h4 {
    margin-top: 0px;
  }

  h5 {
    margin-top:0px;
  }

  h6 {
    margin-top: 0px;
    margin-bottom: 50px;
    padding: 0px;
  }
`;

const MovieData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: end;
  gap: 20px;
`

const MoviePlot = styled.div`
  display: flex;
  flex-direction: column;
  margin:0px;
  gap:0px;

  h6 {
    margin: 5px;
  }
`

const ActorsInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  word-break: break-all;
  overflow-x: auto;  
  max-width: 100%; 

  img {
    width:120px;
  }

  h5 {
    margin:0px;
    word-break: break-all;
    word-wrap: break-word;
  }
`;

const CommentsWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 10px;

h5 {
  margin-left: 30px;
}

p {
  margin-left: 30px;
}

hr {
  display: flex;
  justify-content: flex-start;
  width:0%;
  margin: 0px;
  margin-left: 30px;
}
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 5px;
  background-color: #f1f1f1;
`;

const InputCommentBox = styled.div`
  display: flex;
  flex-direction: row;
  gap:15px;
  width:100%;
  height: 50px;
`;

const InputComment = styled.input`
  width:100%;
  border: none;
  outline-color: #067ac7;
  box-shadow: 0 0 0 1px #067ac7;
  border-radius: 3px;
`;

const InputButton = styled.button`
  width:100px;
  background-color: #067ac7;
  border: none;
  border-radius: 3px;
  color: white;

  &:hover {
      background-color: black;
    }
`;