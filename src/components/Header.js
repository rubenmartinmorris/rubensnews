import React from 'react';

export const Header = () => {
  return (
    <header>
      <img src='/logo.png' alt='reddit clone logo' />
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
