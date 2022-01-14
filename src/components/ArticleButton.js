import React from 'react';
import { useState, useContext } from 'react';
import { upVote } from '../utils/api';
import { Button } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';

export const ArticleButton = ({ article, text, id }) => {
  const { user, setUser } = useContext(UserContext);

  const [like, setLike] = useState(article.votes);
  return (
    <>
      <Button
        className={'mt-3 bg-success'}
        onClick={(event) => {
          if (user.hasOwnProperty('upvote')) {
            console.log('has upvote');
            if (user.upvote.includes(id)) {
              console.log('already upvoted');
            }
          } else {
            const updatedUser = Object.assign({}, user);

            updatedUser.upvote = [id];
            console.log(id, updatedUser, '<---updatedUser');
          }
          //setUser(updatedUser);

          console.log(user);

          console.log(article.votes, 'article.votes', like, 'like');

          const newLike = like + 1;
          setLike(newLike);
          upVote(article.article_id).then(({ votes }) => {
            setLike(newLike);
          });
        }}
      >
        Up vote:{like}
      </Button>
    </>
  );
};
