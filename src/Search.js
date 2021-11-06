import React from 'react';
import './style.css';

const Search = (props) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={props.onSearch} />

      <p>
        Searching for: <strong>{props.st}</strong>
      </p>
    </div>
  );
};

export default Search;
