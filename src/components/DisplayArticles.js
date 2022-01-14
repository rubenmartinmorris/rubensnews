import { React, useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArticles } from '../utils/api';
import { ArticleButton } from './ArticleButton';
import { AddArticle } from './AddArticle';
import { DeleteArticleButton } from './DeleteArticleButton';
import { UserContext } from '../contexts/UserContext';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
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
  const navigate = useNavigate();

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
    getArticles(paramsTopic, sort)
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch(() => {
        navigate('/server404');
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
        className='my-3 bg-secondary'
        onClick={() => {
          setToggleNewArticle(!toggleNewArticle);
        }}
      >
        {!toggleNewArticle ? 'Create article ' : 'Forget it!'}
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
      {isLoading && <IsLoading />}
      {articles.map((article) => {
        return (
          <Card className='mt-2' key={article.article_id}>
            <Card.Header>
              <Link className='Link' to={`/articles/${article.article_id}`}>
                {article.article_id}
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                  {/* Date dayjs(article.created_at).format('DD/MM/YYYY') */}
                  <strong>r/</strong>
                  {article.author}
                  <strong className='ms-3'>Posted At: </strong>
                  {dayjs(article.created_at).format('h:mm:ss A DD.MM.YYYY')}
                </Card.Text>
              </Link>
            </Card.Header>
            {/* bg-danger */}
            <Card.Body className={upVotedArticles[0]}>
              <Link className='Link' to={`/articles/${article.article_id}`}>
                <Card.Text className='article-topic'>
                  Topic: {article.topic}
                </Card.Text>
                <Card.Text className='article-body'>{article.body}</Card.Text>
              </Link>

              <ArticleButton
                article={article}
                id={article.article_id}
              ></ArticleButton>
              <Link to={`/articles/${article.article_id}`}>
                <Button className='mt-3 mx-3 '>
                  View / Add comments({article.comment_count})
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
