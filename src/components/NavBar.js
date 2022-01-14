import { React, useEffect, useState } from 'react';
import { getTopics } from '../utils/api';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();
  const [topicsState, setTopicsState] = useState([]);
  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        setTopicsState(topics);
      })
      .catch((err) => {
        navigate('/server404');
      });
  }, []);
  return (
    <Nav variant='tabs'>
      <Nav.Item key='home'>
        <Link to={`/`}>
          <span>r/home</span>
        </Link>
      </Nav.Item>
      {topicsState.map((topic) => {
        return (
          <Nav.Item key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>
              <span key={topic.slug}>r/{topic.slug}</span>
            </Link>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};
