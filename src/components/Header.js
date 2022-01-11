import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getUsers } from '../utils/api';
import { UserContext } from '../contexts/UserContext';

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
    <header>
      <Link to='/'>
        <img src='/logo.png' alt='reddit clone logo' />
      </Link>
      <form action=''>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='search Topics'
        />
      </form>
      <form action=''>
        <label htmlFor='users'>View App As User:</label>
        <select
          name='users'
          id='users'
          onChange={(event) => {
            setUser({ username: event.target.value });
          }}
        >
          {users.map((user) => {
            return <option value={user.username}>{user.username}</option>;
          })}
        </select>
        <label htmlFor=''>You are logged in as :{user.username}</label>
      </form>
    </header>
  );
};
