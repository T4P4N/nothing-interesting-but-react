import React from 'react';
import './style.css';
import { ChevronUp, User, X } from 'react-feather';

const Item = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
    console.log('Removed --> ' + item.title);
  };
  return (
    <div key={item.objectID} className="posts">
      <h4 className="title">
        <button type="button" onClick={handleRemoveItem}>
          <X height="15px" width="15px" className="x-btn" />
        </button>
        <a href={item.url}>{item.title}</a>
      </h4>

      <p className="author">
        <User size={14} /> {item.author}
      </p>
      <p className="points">
        <ChevronUp /> {item.points}
      </p>
    </div>
  );
};

const List2 = ({ data, onRemoveItem }) => {
  // const [data, setData] = React.useState();
  console.log('---> List');
  return data.map((items) => (
    <Item key={items.objectID} item={items} onRemoveItem={onRemoveItem} />
  ));
};

const List = React.memo(
  ({ data, onRemoveItem }) =>
    console.log('---> List') ||
    data.map((items) => (
      <Item key={items.objectID} item={items} onRemoveItem={onRemoveItem} />
    ))
);

export default List;
