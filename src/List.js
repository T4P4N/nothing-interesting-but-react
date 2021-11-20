import React from 'react';
import './style.css';

const Item = ({ item }) => {
  // console.log(item);
  return (
    <>
      <table>
        <th>Title</th>
        <td>{item.title + '  '} </td>
        <th>Author</th>
        <td>{item.author + '  '} </td>
        <th>Points</th>
        <td>{item.points + '  '} </td>
      </table>
    </>
  );
};

const List = ({ data, idx }) => {
  // const [data, setData] = React.useState();
  return data.map((items) => <Item key={idx} item={items} />);
};

export default List;
