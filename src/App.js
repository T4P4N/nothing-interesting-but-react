import React from 'react';
import './style.css';

const list = [
  {
    title: 'react',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    point: 5,
    objectID: 1,
  },

  {
    title: 'redux',
    url: 'https://reactjs.org',
    author: 'Dan Abramov, Andrew Clark',
    point: 5,
    objectID: 2,
  },
];

function List() {
  return list.map((item) => {
    return (
      <div key="{item.objectID}">
        <span>
          <a href="{item.url}">{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.point}</span>
      </div>
    );
  });
}

export default function App() {
  return (
    <div>
      <h1>My hacker stories</h1>
      <br></br>
      <List />
    </div>
  );
}
