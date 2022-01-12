import { useState, useContext } from 'react';
import { submitComment } from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import { Button, Form } from 'react-bootstrap';

export const AddComment = ({ id, setAddComment, comments, setComments }) => {
  const { user } = useContext(UserContext);
  const [commentText, setCommentText] = useState('');
  console.log(user.username);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (event.target.comment.value === '') {
          alert('please fill in the message field');
          return;
        }

        submitComment(id, commentText, user).then((res) => {
          const newComments = comments.map((res) => res);
          const commentToAdd = {
            body: res.body,
            author: res.author,
            comment_id: res.comment_id,
          };
          newComments.unshift(commentToAdd);
          setComments(newComments);
        });
        setCommentText('');
        setAddComment(false);
        const newComments = comments.map((comment) => comment);
        const commentToAdd = { body: commentText, author: user.username };
        newComments.unshift(commentToAdd);

        setComments(newComments);
      }}
    >
      <Form.Group>
        <Form.Control
          autoFocus
          type='text'
          name='comment'
          id='comment'
          value={commentText}
          onChange={(event) => {
            setCommentText(event.target.value);
          }}
        />
        <Button type='submit'>Post Comment</Button>
      </Form.Group>
    </Form>
  );
};
