import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';




function Mmo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-row: 3;
  `;

  const Loading = styled.h1`
  text-align: center;
  `;

  const Movieindiv = styled.div `
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    max-width: 200px;
    text-align: center;
  `
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
  `;

  const MovieImage = styled.img`
    width: 100%;
    border-radius: 10px;
  `;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://port-0-minihackathon-12-lyec0qpi97716ac6.sel5.cloudtype.app/movie/list');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        setLoading(false);
      }
    };


    fetchData();
  }, []); 

  return (
    <div>
      {loading ? (
        <p>데이터를 불러오는 중...</p>
      ) : (
        <div>
          {/* 데이터를 표시합니다. */}
          {data && (
            <MovieBox>
              {data.map(item => (
                <Movieindiv key={item.id}>
                  <Link to={`/${item.id}`}>
                    <MovieImage src={item.poster_url} alt={item.title_kor} style={{ maxWidth: '100px', display: 'block', margin: '10px 0' }} />
                    <MovieTitle> {item.title_kor} </MovieTitle> 
                  </Link>
                </Movieindiv>
              ))}
            </MovieBox>
          )}
          {/* 만약 데이터가 없을 경우 */}
          {!data && <p>데이터를 찾을 수 없습니다.</p>}
        </div>
      )}
    </div>
  );
}

export default Mmo;
