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

const App1 = () => {
  const stories = [];

  const handleSearch = (event) => {
    // C
    console.log(event.target.value);
  };

  // less readable version without array destructuring
  // const searchTermState = React.useState('');

  // const searchTerm = searchTermState[0];
  // const setSearchTerm = searchTermState[1];

  return (
    <div>
      <h1>My hacker news stories</h1>
      <Search onSearch={handleSearch} />
      <hr />

      <List list={stories} />
    </div>
  );
};

// // Basic array definition
// const list = ['a', 'b'];

// // no array destructuring
// const itemOne = list[0];
// const itemTwo = list[1];

// // Array destructuring
// const [firstItem, secondItem] = list;

// function getAlphabet() {
//   return [a, b];
// }

// // no array destructuring
// const itemOne = getAlphabet()[0];
// const itemtwo = getAlphabet()[1];

// // Array destructuring
// const [firstItem, secondItem] = getAlphabet();

// Array destructuring makes code readable

// Callback handlers in JSX

// creating standalone search Component

const Search = (props) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // B
  props.onSearch(event);

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={handleChange} />

      <p>
        Searching for: <strong>{searchTerm}</strong>
      </p>
    </div>
  );
};

export default App1;
