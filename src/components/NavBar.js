import { React, useEffect, useState } from 'react';
import { getTopics } from '../utils/api';
import { Link } from 'react-router-dom';
import { Nav, Row, Col } from 'react-bootstrap';

export const NavBar = () => {
  const [topicsState, setTopicsState] = useState([]);
  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopicsState(topics);
    });
  }, []);
  return (
    <Nav variant='tabs'>
      <Nav.Item>
        <Nav.Link disabled>r/Topic:</Nav.Link>
      </Nav.Item>
      {topicsState.map((topic) => {
        return (
          <Nav.Item>
            <Nav.Link href={`/topics/${topic.slug}`}>
              <div key={topic.slug}>{topic.slug}</div>
            </Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};
