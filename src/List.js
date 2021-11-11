import React from 'react';
import './style.css';

const stuff = [
  {
    title: 'react',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    point: 5,
    objectID: 0,
  },

  {
    title: 'redux',
    url: 'https://reactjs.org',
    author: 'Dan Abramov, Andrew Clark',
    point: 5,
    objectID: 1,
  },
];

const List = ({ stuff }) =>
  stuff.map((item) => <Item key={item.objectID} {...item} />);

// no need for return statement when using parenthesis
const Item = ({ key, title, url, author, points }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{points}</span>
    <span>{key}</span>
  </div>
);

export default List;
