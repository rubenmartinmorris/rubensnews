import { React, useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticles } from '../utils/api';
import { ArticleButton } from './ArticleButton';
import { AddArticle } from './AddArticle';
import { DeleteArticleButton } from './DeleteArticleButton';
import { UserContext } from '../contexts/UserContext';
import { Button, Card, Form } from 'react-bootstrap';

export const DisplayArticles = () => {
  const { user } = useContext(UserContext);

  const paramsTopic = useParams().topic;
  const [articles, setArticles] = useState([]);
  const [sort, setSort] = useState(['votes', 'asc']);
  const [toggleNewArticle, setToggleNewArticle] = useState(false);

  useEffect(() => {
    getArticles(paramsTopic, sort).then(({ articles }) => {
      setArticles(articles);
    });
  }, [paramsTopic, sort]);

  return (
    <section>
      <Form>
        <Form.Group>
          <Form.Label htmlFor='sort'>sort articles by:</Form.Label>
          <Form.Select
            name='sort'
            id='sort'
            onChange={(event) => {
              const newSort = [event.target.value, sort[1]];
              setSort(newSort);
            }}
          >
            <option value='created_at'>created_at</option>
            <option value='comment_count'>comment_count</option>
            <option value='votes'>votes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='direction'>direction:</Form.Label>
          <Form.Select
            name='direction'
            id='direction'
            onChange={(event) => {
              const newSort = [sort[0], event.target.value];
              setSort(newSort);
            }}
          >
            <option value='asc'>asc</option>
            <option value='desc'>desc</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <Button
        onClick={() => {
          setToggleNewArticle(!toggleNewArticle);
        }}
      >
        {!toggleNewArticle ? 'Create Article ' : 'Forget it!'}
      </Button>
      {toggleNewArticle ? (
        <>
          <AddArticle
            articles={articles}
            setArticles={setArticles}
            setToggleNewArticle={setToggleNewArticle}
          />
        </>
      ) : null}
      <div className='create-article'></div>
      {articles.map((article) => {
        return (
          <Card className='mt-2'>
            <Card.Header>
              <Link className='Link' to={`/articles/${article.article_id}`}>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>By: {article.author}</Card.Text>
              </Link>
            </Card.Header>
            <Card.Body>
              <Link className='Link' to={`/articles/${article.article_id}`}>
                <div className='article-topic'>Topic: {article.topic}</div>
                <Card.Text className='article-body'>
                  <div>{article.body}</div>
                </Card.Text>
              </Link>

              <ArticleButton article={article}></ArticleButton>
              <Button className='mt-3 ms-3'>View Comments</Button>
              {user.username === article.author ? (
                <DeleteArticleButton
                  article={article}
                  articles={articles}
                  setArticles={setArticles}
                />
              ) : null}
            </Card.Body>
          </Card>
        );
      })}
    </section>
  );
};
