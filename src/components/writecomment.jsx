import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

export default function WriteComment() {

    const { movieid } = useParams();
    const [movies, setMovies] = useState(null);
    const [comments, setComments] = useState([]);

    const getComments = useCallback(async () => {
        try {
            const res = await axios.get(`https://port-0-minihackathon-12-lyec0qpi97716ac6.sel5.cloudtype.app/movie/${movieid}`)
            console.log('코멘트 로딩 성공')
            const data = res.data;
            setMovies(data);
            setComments(data.comments);
        } catch (err) {
            console.error('error:', err);
        }
    });

    useEffect(() => {
        getComments();
    }, []);

    if (!movies) {
        return <div>Loading...</div>;
    }

  return (
    <CommentPage>
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
    </CommentPage>
  );
}

const CommentPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;  
  box-sizing: border-box; 

  h1 {
    font-size: 20px;
    margin: 20px 0px 10px 0px;
  }
`

const CommentsWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 10px;
margin-bottom: 10px;

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