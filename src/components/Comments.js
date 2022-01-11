import { useState, useEffect } from 'react';
import { getComments } from '../utils/api';
export const Comments = ({ id, setComments, comments }) => {
  useEffect(() => {
    getComments(id).then(({ comments }) => {
      setComments(comments);
    });
  }, []);
  return (
    <div>
      {comments.map((comment) => {
        return <p>{comment.body}</p>;
      })}
    </div>
  );
};
