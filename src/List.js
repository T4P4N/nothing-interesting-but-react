import React from 'react';
import './style.css';

const Item = ({ item, onRemoveItem }) => {
  // console.log(item);

  const handleRemoveItem = () => {
    onRemoveItem(item);
    console.log('Removed --> ' + item.title);
  };
  return (
    <tr key={item.objectID}>
      <td>
        <a href={item.url}>{item.title}</a>
      </td>
      <td>{item.author}</td>
      <td>{item.points}</td>
      {/* <td>
        <button type="button" onClick={handleRemoveItem}>
          X
        </button>
      </td> */}
    </tr>
  );
};

const List = ({ data, onRemoveItem }) => {
  // const [data, setData] = React.useState();
  return data.map((items) => (
    <Item key={items.objectID} item={items} onRemoveItem={onRemoveItem} />
  ));
};

export default List;
