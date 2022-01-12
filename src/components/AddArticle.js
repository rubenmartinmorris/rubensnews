import { useState, useContext } from 'react';
import { submitArticle } from '../utils/api';
import { UserContext } from '../contexts/UserContext';

export const AddArticle = ({ articles, setArticles }) => {
  const { user } = useContext(UserContext);

  const [titleValues, setTitleValues] = useState('Team');
  const [bodyValues, setBodyValues] = useState('Teams are the best');

  return (
    <form
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
          // console.log(articles);
          // console.log(res);

          const newArticles = articles.map((article) => article);
          newArticles.unshift(res);
          console.log(articles, 'articles');

          console.log(newArticles, 'newArticles');

          setArticles(newArticles);
          setTitleValues('');
          setBodyValues('');
        });
      }}
    >
      <label htmlFor='title'>Title</label>
      <input
        value={titleValues}
        onChange={(event) => {
          setTitleValues(event.target.value);
          console.log(event.target.value);
        }}
        type='text'
        name='title'
        id='title'
      />
      <label htmlFor='body'>Body</label>
      <input
        value={bodyValues}
        onChange={(event) => {
          setBodyValues(event.target.value);
          console.log(event.target.value);
        }}
        type='text'
        name='body'
        id='body'
      />
      <label htmlFor='topic'>Topic</label>
      <select name='topic' id='topic'>
        <option value='coding'>coding</option>
        <option value='football'>football</option>
        <option value='cooking'>cooking</option>
      </select>
      <input type='submit' value='Create Article' />
    </form>
  );
};
