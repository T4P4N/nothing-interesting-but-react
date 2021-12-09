import React from 'react';
import './style.css';
import { ChevronUp, User } from 'react-feather';

const Item = ({ item, onRemoveItem }) => {
  // console.log(item);

  const handleRemoveItem = () => {
    onRemoveItem(item);
    console.log('Removed --> ' + item.title);
  };
  return (
    <div key={item.objectID} className="posts">
      <h4 className="title">
        <a href={item.url}>{item.title}</a>
      </h4>
      <p className="author">
        <User size={14} /> {item.author}
      </p>
      <p className="points">
        <ChevronUp /> {item.points}
      </p>
      {/* <td>
        <button type="button" onClick={handleRemoveItem}>
          X
        </button>
      </td> */}
    </div>
  );
};

const List = ({ data, onRemoveItem }) => {
  // const [data, setData] = React.useState();
  return data.map((items) => (
    <Item key={items.objectID} item={items} onRemoveItem={onRemoveItem} />
  ));
};

export default List;
