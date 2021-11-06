import React from 'react';
import './style.css';

const list = [
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

function List() {
  return list.map((item) => {
    return (
      <div className="react-eco" key={item.objectID}>
        <p>
          <a href="{item.url}">{item.title}</a>
        </p>
        <p>{item.author}</p>
        <p>{item.point}</p>
      </div>
    );
  });
}
