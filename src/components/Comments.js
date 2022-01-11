import { useState, useEffect, useContext } from 'react';
import { getComments, deleteComment } from '../utils/api';
import { UserContext } from '../contexts/UserContext';

export const Comments = ({ id, setComments, comments }) => {
  useEffect(() => {
    getComments(id).then(({ comments }) => {
      setComments(comments);
    });
  }, []);
  const { user } = useContext(UserContext);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div className='comment'>
            <p>{comment.author}</p>
            <p> {comment.body}</p>
            {comment.author === user.username ? (
              <button
                onClick={(event) => {
                  deleteComment(comment.comment_id);
                  let newComments = comments.map((comment) => comment);
                  newComments = newComments.filter(
                    (commentz) => comment.comment_id !== commentz.comment_id
                  );
                  console.log(newComments, 'newComments filtered');
                  setComments(newComments);
                }}
              >
                Delete My Comment
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
