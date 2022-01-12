import { useState } from 'react';
import { voteComment } from '../utils/api';
import { Button } from 'react-bootstrap';

export const CommentsButton = ({ comment }) => {
  const [like, setLike] = useState(comment.votes);
  return (
    <Button
      onClick={() => {
        setLike(like + 1);
        voteComment(comment.comment_id, 1);
      }}
    >
      Upvote Comment! {like}
    </Button>
  );
};
