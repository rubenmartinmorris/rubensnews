import React from 'react';
import { useState } from 'react';
import { upVote } from '../utils/api';

export const ArticleButton = ({ article }) => {
  const [like, setLike] = useState(article.votes);
  return (
    <>
      <button
        onClick={(event) => {
          const newLike = like + 1;
          setLike(newLike);
          upVote(article.article_id).then(({ votes }) => {});
        }}
      >
        Votes:{like}
      </button>
    </>
  );
};
