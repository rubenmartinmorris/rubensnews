import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticle } from '../utils/api';
import { ArticleButton } from './ArticleButton';
import { Comments } from './Comments';
import { AddComment } from './AddComment';
import { Button, Card } from 'react-bootstrap';
import { IsLoading } from './IsLoading';

export const DisplayArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const [article, setArticle] = useState([{}]);
  const { article_id } = useParams();
  const [addComment, setAddComment] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id).then(({ article }) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, []);
  return (
    <section>
      <Button
        className='m-3'
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      {isLoading && <IsLoading />}
      {/* Old code above this */}
      <Card className='mt-2'>
        <Card.Header>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>By: {article.author}</Card.Text>
        </Card.Header>
        <Card.Body>
          <div className='article-topic'>Topic: {article.topic}</div>
          <Card.Text className='article-body'>
            <div>{article.body}</div>
          </Card.Text>

          <ArticleButton article={article}></ArticleButton>
          <Button
            onClick={() => {
              setAddComment(!addComment);
            }}
          >
            {addComment ? 'Back' : 'Add Comment'}
          </Button>
        </Card.Body>
      </Card>
      {/* Old code below this */}
      <div key={article.article_id}>
        <div>Id {article.article_id}</div>
        <div>Author {article.author}</div>
        <div>Title {article.title}</div>
        <div>Body {article.body}</div>
        <div>Votes {article.votes}</div>
        <div>Created at {article.created_at}</div>
        <ArticleButton article={article}></ArticleButton>
        <Button
          onClick={() => {
            setAddComment(!addComment);
          }}
        >
          {addComment ? 'Back' : 'Add Comment'}
        </Button>
      </div>
      {addComment && (
        <AddComment
          id={article_id}
          setAddComment={setAddComment}
          comments={comments}
          setComments={setComments}
        />
      )}

      <Comments id={article_id} comments={comments} setComments={setComments} />
      <Button
        className='mt-3 ms-3'
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </section>
  );
};
