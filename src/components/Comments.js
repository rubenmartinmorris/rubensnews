import { useState, useEffect, useContext } from 'react';
import { getComments, deleteComment } from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import { CommentsButton } from './CommentsButton';
import { Button, Card } from 'react-bootstrap';

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
          <Card className='mt-3'>
            <Card.Header>
              <Card.Text>{comment.author}</Card.Text>
            </Card.Header>
            <Card.Body className='bg-secondary'>
              <Card.Text> {comment.body}</Card.Text>
              <CommentsButton comment={comment} />
              {comment.author === user.username ? (
                <Button
                  className='ms-3'
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
                </Button>
              ) : null}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};
