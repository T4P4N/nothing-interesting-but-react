import React from 'react';
import './style.css';

const Search = (props) => {
  // destructuring in practice
  const { search, onSearch } = props;

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={onSearch} value={search} />

      <p>
        {props.hel} Searching for: <strong>{props.st}</strong>
      </p>
    </div>
  );
};

export default Search;
