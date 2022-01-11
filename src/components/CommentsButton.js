import { useState } from 'react';
import { voteComment } from '../utils/api';

export const CommentsButton = ({ comment }) => {
  const [like, setLike] = useState(comment.votes);
  return (
    <button
      onClick={() => {
        setLike(like + 1);
        voteComment(comment.comment_id, 1);
      }}
    >
      Upvote Comment! {like}
    </button>
  );
};
