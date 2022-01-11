import { useState, useEffect } from 'react';
import { getComments } from '../utils/api';
export const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(id).then(({ comments }) => {
      setComments(comments);
      console.log(comments);
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
