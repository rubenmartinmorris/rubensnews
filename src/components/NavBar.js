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
      <Nav.Item key='home'>
        <Nav.Link>
          <Link to={`/`}>
            <div>r/home</div>
          </Link>
        </Nav.Link>
      </Nav.Item>
      {topicsState.map((topic) => {
        return (
          <Nav.Item key={topic.slug}>
            <Nav.Link>
              <Link to={`/topics/${topic.slug}`}>
                <div key={topic.slug}>r/{topic.slug}</div>
              </Link>
            </Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};
