import React from 'react';
import './style.css';

const Item = ({ item, onRemoveItem }) => {
  // console.log(item);

  const handleRemoveItem = () => {
    onRemoveItem(item);
    console.log(item);
  };
  return (
    <tr key={item.objectID}>
      <td>{item.title}</td>
      <td>{item.author}</td>
      <td>{item.points}</td>
      <td>
        <button type="button" onClick={handleRemoveItem}>
          X
        </button>
      </td>
    </tr>
  );
};

const List = ({ data, idx, onRemoveItem }) => {
  // const [data, setData] = React.useState();
  return data.map((items) => (
    <Item key={idx} item={items} onRemoveItem={onRemoveItem} />
  ));
};

export default List;
