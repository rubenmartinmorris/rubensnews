import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
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
    </header>
  );
};
