import { React, useEffect, useState } from 'react';
import { getTopics } from '../utils/api';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export const NavBar = () => {
  const [topicsState, setTopicsState] = useState([]);
  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopicsState(topics);
    });
  }, []);
  return (
    <Container>
      <Row>
        <h2>Trending:</h2>
      </Row>
      <Row>
        {topicsState.map((topic) => {
          return (
            <Col>
              <Link to={`topics/${topic.slug}`}>
                <div key={topic.slug}>{topic.slug}</div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
