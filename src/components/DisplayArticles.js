import { React, useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticles } from '../utils/api';
import { ArticleButton } from './ArticleButton';
import { AddArticle } from './AddArticle';
import { DeleteArticleButton } from './DeleteArticleButton';
import { UserContext } from '../contexts/UserContext';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../Loading.css';
import { IsLoading } from './IsLoading';
export const DisplayArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  const paramsTopic = useParams().topic;
  const [articles, setArticles] = useState([]);
  const [sort, setSort] = useState(['votes', 'asc']);
  const [toggleNewArticle, setToggleNewArticle] = useState(false);
  const [upVotedArticles, setUpVotedArticles] = useState([]);

  const isLiked = (id) => {
    if (upVotedArticles.includes(id)) {
      console.log('it has already been upvoted');
    } else {
      setUpVotedArticles([2]);
      console.log(upVotedArticles);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getArticles(paramsTopic, sort).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [paramsTopic, sort]);

  return (
    <section>
      <Form>
        <Row>
          <Col>
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
          </Col>
          <Col>
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
          </Col>
        </Row>
      </Form>

      <Button
        className='m-3'
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
      {isLoading && <IsLoading />}
      {articles.map((article) => {
        return (
          <Card className='mt-2' key={article.article_id}>
            <Card.Header>
              <Link className='Link' to={`/articles/${article.article_id}`}>
                {article.article_id}
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                  By: {article.author} At:{article.created_at}
                </Card.Text>
              </Link>
            </Card.Header>
            {/* bg-danger */}
            <Card.Body className={upVotedArticles[0]}>
              <Link className='Link' to={`/articles/${article.article_id}`}>
                <div className='article-topic'>Topic: {article.topic}</div>
                <Card.Text className='article-body'>
                  <div>{article.body}</div>
                </Card.Text>
              </Link>

              <ArticleButton
                article={article}
                id={article.article_id}
              ></ArticleButton>
              <Link to={`/articles/${article.article_id}`}>
                <Button className='mt-3 ms-3'>
                  View / Add Comments({article.comment_count})
                </Button>
              </Link>
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
