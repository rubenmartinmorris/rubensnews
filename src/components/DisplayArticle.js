import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticle } from '../utils/api';
import { ArticleButton } from './ArticleButton';
import { Comments } from './Comments';
import { AddComment } from './AddComment';

export const DisplayArticle = () => {
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
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        exit
      </button>
      <div key={article.article_id}>
        <div>Id {article.article_id}</div>
        <div>Author {article.author}</div>
        <div>Title {article.title}</div>
        <div>Body {article.body}</div>
        <div>Votes {article.votes}</div>
        <div>Created at {article.created_at}</div>
        <ArticleButton article={article}></ArticleButton>
        <button
          onClick={() => {
            setAddComment(!addComment);
            console.log(addComment);
          }}
        >
          {addComment ? 'Back' : 'Add Comment'}
        </button>
      </div>
      {addComment && (
        <AddComment id={article_id} setAddComment={setAddComment} />
      )}

      <Comments id={article_id} />
    </section>
  );
};
