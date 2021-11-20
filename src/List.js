import React from 'react';
import './style.css';

const Item = ({ item }) => {
  // console.log(item);
  return (
    <>
      <td>{item.title}</td>
      <td>{item.author}</td>
      <td>{item.points}</td>
      <td>{item.objectID}</td>
    </>
  );
};

const List = ({ data, idx }) => {
  // const [data, setData] = React.useState();
  return data.map((items) => <Item key={idx} item={items} />);
};

export default List;
