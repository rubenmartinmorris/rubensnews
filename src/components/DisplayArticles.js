import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticles } from '../utils/api';
import { ArticleButton } from './ArticleButton';

export const DisplayArticles = () => {
  const paramsTopic = useParams().topic;
  const [articles, setArticles] = useState([]);
  const [sort, setSort] = useState(['votes', 'asc']);

  useEffect(() => {
    getArticles(paramsTopic, sort).then(({ articles }) => {
      setArticles(articles);
    });
  }, [paramsTopic, sort]);
  return (
    <section>
      <form action=''>
        <label htmlFor='sort'>sort articles by:</label>
        <select
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
        </select>
        <label htmlFor='direction'>direction:</label>
        <select
          name='direction'
          id='direction'
          onChange={(event) => {
            const newSort = [sort[0], event.target.value];
            setSort(newSort);
          }}
        >
          <option value='asc'>asc</option>
          <option value='desc'>desc</option>
        </select>
      </form>
      {articles.map((article) => {
        return (
          <div>
            <Link to={`/articles/${article.article_id}`}>
              <div className='article author'>{article.author}</div>
              <div className='article id'>ID = {article.article_id}</div>
              <div className='article-topic'>{article.topic}</div>
              <div className='article-title'>{article.article_id}</div>
              <div className='article-body'>{article.body}</div>
              <div className='article-votes'>{article.votes}</div>
            </Link>
            <ArticleButton article={article}></ArticleButton>
          </div>
        );
      })}
    </section>
  );
};
