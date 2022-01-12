import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticle } from '../utils/api';
import { ArticleButton } from './ArticleButton';
import { Comments } from './Comments';
import { AddComment } from './AddComment';
import { Button } from 'react-bootstrap';

export const DisplayArticle = () => {
  const [comments, setComments] = useState([]);

  const [article, setArticle] = useState([{}]);
  const { article_id } = useParams();
  const [addComment, setAddComment] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getArticle(article_id).then(({ article }) => {
      setArticle(article);
    });
  }, []);
  return (
    <section>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
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
