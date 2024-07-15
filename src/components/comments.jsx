import React from 'react'
import styled from 'styled-components';

export default function Comments() {
  return (
    <div>
        <h3>comments</h3>
        <InputComment
            placeholder='한줄평'
        />
    </div>
  )
}

const InputComment = styled.input`
    padding: 10px;
    border: 1px solid #d9d9d9;
    font-size: 16px;
    outline: none;
`
