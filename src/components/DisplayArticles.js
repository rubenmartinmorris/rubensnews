import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles } from '../utils/api';

export const DisplayArticles = ({ page }) => {
  const paramsTopic = useParams().topic;
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles(paramsTopic).then(({ articles }) => {
      setArticles(articles);
    });
  }, [paramsTopic]);
  return (
    <section>
      {articles.map((article) => {
        return (
          <div key={article.article_id}>
            <div className='article author'>{article.author}</div>
            <div className='article-topic'>{article.topic}</div>
            <div className='article-title'>{article.article_id}</div>
            <div className='article-body'>{article.body}</div>
            <button>Votes:{article.votes}</button>
          </div>
        );
      })}
    </section>
  );
};
