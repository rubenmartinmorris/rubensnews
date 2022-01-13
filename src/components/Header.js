import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getUsers } from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import { Container, Form } from 'react-bootstrap';

export const Header = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setUser(users[0]);
    });
  }, []);
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <Container className='d-flex justify-content-center pb-2'>
        <Link to='/'>
          <img src='/logo.png' alt='reddit clone logo' />
        </Link>
      </Container>
      <Form action=''>
        <Form.Control
          type='text'
          name='search'
          id='search'
          placeholder='search by Topics or Author'
        />
      </Form>
      <Form action=''>
        <Form.Label htmlFor='users'>View App As User:</Form.Label>
        <Form.Select
          name='users'
          id='users'
          onChange={(event) => {
            setUser({ username: event.target.value });
          }}
        >
          {users.map((user) => {
            return (
              <option value={user.username} key={user.username}>
                {user.username}
              </option>
            );
          })}
        </Form.Select>
        <Form.Label htmlFor=''>
          You are logged in as :{user.username}
        </Form.Label>
      </Form>
    </>
  );
};
