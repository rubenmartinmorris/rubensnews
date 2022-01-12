import React from 'react';
import { useState } from 'react';
import { upVote } from '../utils/api';
import { Button } from 'react-bootstrap';

export const ArticleButton = ({ article, text }) => {
  const [like, setLike] = useState(article.votes);
  return (
    <>
      <Button
        className={'mt-3'}
        onClick={(event) => {
          const newLike = like + 1;
          setLike(newLike);
          upVote(article.article_id).then(({ votes }) => {});
        }}
      >
        Up Vote:{like}
      </Button>
    </>
  );
};
