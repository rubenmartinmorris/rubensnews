import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUsers } from '../utils/api';

export const Header = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((users) => {
      console.log(users, '<--users');
      setUsers(users);
    });
  }, []);
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
        <select name='users' id='users'>
          <option value='admin'>Admin</option>
          {users.map((user) => {
            return <option value={user.username}>{user.username}</option>;
          })}
        </select>
      </form>
    </header>
  );
};
