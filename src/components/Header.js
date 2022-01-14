import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getUsers } from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import { Container, Form, Stack, Image } from 'react-bootstrap';

export const myStorage = window.localStorage;
export const Header = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((users) => {
      users.forEach((user) => {
        user.likedComments = [];
      });
      setUsers(users);
      setUser(users[0]);
      myStorage.setItem('usersInStorage', JSON.stringify(users));
      console.log(myStorage, users);
    });
  }, []);
  const { user, setUser } = useContext(UserContext);

  // <Container className={/*d-flex justify-content-center pb-2 */ null}>
  return (
    <Stack direction='horizontal' className=''>
      <Link to='/' className=''>
        <Image width='150px' src='/logo.png' alt='reddit clone logo' />
      </Link>
      <div className='d-md-flex w-100 mb-auto '>
        <Form action='' className='mb-auto ms-auto m-3 w-100'>
          <Form.Control
            type='text'
            name='search'
            id='search'
            placeholder='search by Topics or Author coming soon....'
            disabled
          />
        </Form>

        <Form action='' className='mb-auto my-3'>
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
      </div>
    </Stack>
  );
};
