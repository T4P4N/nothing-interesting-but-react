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

localStorage.setItem('data', JSON.stringify(stuff));

const List = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    let d = localStorage.getItem('data');
    let c = JSON.parse(d);
  }, []);
  return data.map((item) => <Item key={item.objectID} {...item} />);
};

// no need for return statement when using parenthesis
const Item = ({ item }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.points}</span>
    <span>{item.key}</span>
  </div>
);

export default List;
