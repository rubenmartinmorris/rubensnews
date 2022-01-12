import { useState, useContext } from 'react';
import { submitArticle } from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import { Button, Form } from 'react-bootstrap';
export const AddArticle = ({ articles, setArticles, setToggleNewArticle }) => {
  const { user } = useContext(UserContext);

  const [titleValues, setTitleValues] = useState('Team');
  const [bodyValues, setBodyValues] = useState('Teams are the best');

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault(event);
        if (event.target.title.value === '' || event.target.body.value === '') {
          alert('please fill in all the fields');
        }

        submitArticle(
          event.target.title.value,
          event.target.body.value,
          event.target.topic.value,
          user.username
        ).then((res) => {
          const newArticles = articles.map((article) => article);
          newArticles.unshift(res);
          console.log(articles, 'articles');

          console.log(newArticles, 'newArticles');

          setArticles(newArticles);
          setTitleValues('');
          setBodyValues('');
          setToggleNewArticle(false);
        });
      }}
    >
      <Form.Group>
        <Form.Label htmlFor='title'>Title</Form.Label>
        <Form.Control
          value={titleValues}
          onChange={(event) => {
            setTitleValues(event.target.value);
            console.log(event.target.value);
          }}
          type='text'
          name='title'
          id='title'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='body'>Body</Form.Label>
        <Form.Control
          value={bodyValues}
          onChange={(event) => {
            setBodyValues(event.target.value);
            console.log(event.target.value);
          }}
          type='text'
          name='body'
          id='body'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='topic'>Topic</Form.Label>
        <Form.Select name='topic' id='topic'>
          <option value='coding'>coding</option>
          <option value='football'>football</option>
          <option value='cooking'>cooking</option>
        </Form.Select>
      </Form.Group>
      <Button type='submit' className='m-3'>
        Post Now!
      </Button>
    </Form>
  );
};
