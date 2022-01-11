import { useState } from 'react';
import { submitComment } from '../utils/api';
export const AddComment = ({ id, setAddComment, comments, setComments }) => {
  const [commentText, setCommentText] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (event.target.comment.value === '') {
          alert('please fill in the message field');
          return;
        }

        submitComment(id, commentText).then(() => {
          console.log('comment submitted');
        });
        setCommentText('');
        setAddComment(false);
        const newComments = comments.map((comment) => comment);
        const commentToAdd = { body: commentText };
        //console.log(newComments);
        newComments.unshift(commentToAdd);
        setComments(newComments);
      }}
    >
      <input
        autoFocus
        type='text'
        name='comment'
        id='comment'
        value={commentText}
        onChange={(event) => {
          setCommentText(event.target.value);
        }}
      />
      <button>Post Comment</button>
    </form>
  );
};
