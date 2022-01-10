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
            <Link to={`topics/${topic.slug}`}>
              <li key={topic.slug}>{topic.slug}</li>
            </Link>
          </>
        );
      })}
    </nav>
  );
};
