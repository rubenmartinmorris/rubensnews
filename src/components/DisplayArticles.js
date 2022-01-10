import { React, useState, useEffect } from 'react';
import { getArticles } from '../utils/api';

export const DisplayArticles = ({ page }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles(page).then(({ articles }) => {
      console.log(articles, 'articles');

      setArticles(articles);
    });
  }, []);
  return (
    <section>
      {articles.map((article) => {
        return (
          <p key={article.article_id}>
            <div className='article author'>{article.author}</div>
            <div className='article-topic'>{article.topic}</div>
            <div className='article-title'>{article.article_id}</div>
            <div className='article-body'>{article.body}</div>
            <button>Votes:{article.votes}</button>
          </p>
        );
      })}
    </section>
  );
};
