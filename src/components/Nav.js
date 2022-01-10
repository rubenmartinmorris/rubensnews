import { React, useEffect, useState } from 'react';
import { getTopics } from '../utils/api';
import { Link } from 'react-router-dom';

export const Nav = () => {
  const [topicsState, setTopicsState] = useState([]);
  useEffect(() => {
    getTopics().then(({ topics }) => {
      console.log(topics);

      setTopicsState(topics);
    });
  }, []);
  return (
    <nav>
      <h2>Popular Topics</h2>
      {topicsState.map((topic) => {
        return (
          <>
            <Link key={topic.slug} to={`/${topic.slug}`}>
              <li>{topic.slug}</li>
            </Link>
          </>
        );
      })}
    </nav>
  );
};
