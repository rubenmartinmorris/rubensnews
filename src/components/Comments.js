import { useEffect, useContext } from 'react';
import { getComments, deleteComment } from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import { CommentsButton } from './CommentsButton';
import { Button, Card } from 'react-bootstrap';

import dayjs from 'dayjs';

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
          <Card className='mt-3' key={comment.comment_id}>
            <Card.Header>
              <Card.Text>{comment.author}</Card.Text>
              <strong>r/</strong>
              {comment.author}
              <strong className='ms-3'>Posted At: </strong>
              {dayjs(comment.created_at).format('h:mm:ss A DD.MM.YYYY')}
            </Card.Header>
            <Card.Body className='bg-secondary'>
              <Card.Text> {comment.body}</Card.Text>
              <CommentsButton comment={comment} />
              {comment.author === user.username ? (
                <Button
                  className='ms-3 bg-danger'
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
                  Delete my comment
                </Button>
              ) : null}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};
