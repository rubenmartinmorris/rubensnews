import React from 'react';
import { useState, useContext } from 'react';
import { upVote } from '../utils/api';
import { Button } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';
import { myStorage } from './Header';

export const ArticleButton = ({ article, text, id }) => {
  const { user, setUser } = useContext(UserContext);

  const [like, setLike] = useState(article.votes);

  return (
    <>
      <Button
        className={
          user.likedComments.includes(id) ? 'mt-3 bg-success' : 'mt-3 bg-danger'
        }
        onClick={(event) => {
          const newUsers = JSON.parse(myStorage.usersInStorage);

          newUsers.forEach((storedUser) => {
            console.log('looping');

            if (storedUser.username === user.username) {
              if (storedUser.likedComments.includes(id)) {
                //console.log('remove');
                //console.log(storedUser.likedComments);

                storedUser.likedComments = storedUser.likedComments.filter(
                  (item) => item !== id
                );
                setUser(storedUser);

                const newUsersString = JSON.stringify(newUsers);
                myStorage.setItem('usersInStorage', newUsersString);
                //console.log(myStorage, 'remove');
                console.log(user);
              } else {
                //console.log(storedUser);
                storedUser.likedComments.push(id);
                setUser(storedUser);
                const newUsersString = JSON.stringify(newUsers);
                myStorage.setItem('usersInStorage', newUsersString);
                //console.log(myStorage, 'add');
                console.log(user);
              }

              // if (storedUser.likedComments.includes(id)) {
              //   console.log('already liked');
              // } else {
              //   console.log('added to stored user');
              //   window.localstorage.setItem('usersInStorage', 'asdfasdf');
              //   console.log(window.localStorage, 'window');
              // }
            }
          });
          // console.log(myStorage, 'myStorage', user);

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
