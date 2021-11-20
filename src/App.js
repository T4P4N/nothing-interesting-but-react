import React from 'react';
import './style.css';
import Search from './Search';
import List from './List';
import TAPP from './ListTable';

const data = [
  {
    title: 'react',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    points: 5,
    objectID: 0,
  },

  {
    title: 'redux',
    url: 'https://reactjs.org',
    author: 'Dan Abramov, Andrew Clark',
    points: 5,
    objectID: 1,
  },
];

// Custom Hook

const useSemipersistentState = (key, initalState) => {
  // Adding reusablity
  const [value, setValue] = React.useState(
    localStorage.getItem('search') || initalState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value), [value, key];
  });

  return [value, setValue];
  // end reusablity
  // const [searchTerm, setSearchTerm] = React.useState(
  //   localStorage.getItem('search') || ''
  // );

  // React.useEffect(() => {
  //   localStorage.setItem('search', searchTerm);
  // }, [searchTerm]);

  // return [searchTerm, setSearchTerm];
};

const App = () => {
  // const [searchTerm, setSearchTerm] =

  const stories = [];

  // const [searchTerm, setSearchTerm] = React.useState(
  //   localStorage.getItem('search') || 'React'
  // );

  const defaultSearchTerm = 'Happiness in Small Things!';
  // Custom Hook in Action

  const [searchTerm, setSearchTerm] = useSemipersistentState(
    'search',
    defaultSearchTerm
  );

  // useEffect Hook in Action Here.

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm, [searchTerm]);

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  });

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);

    localStorage.setItem('search', event.target.value);
  };

  const searchedStories = stories.filter(function (story) {
    return story.title.includes(searchTerm);
  });

  // just for testing some
  let words = [
    'spray',
    'paint',
    'limit',
    'elite',
    'exuberant',
    'destruction',
    'present',
  ];

  const filteredWords = words.filter((word) => {
    return word.length > 5;
    console.log('Here');
  });

  const [handle_try2, setTry2] = React.useState('');

  return (
    <div className="container">
      <h1 className="main-head">My hacker news stories</h1>
      {/* <Search onSearch={handleSearch} st={searchTerm} hel={handle_try2} /> */}

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
        type="text"
      >
        <strong>Search: </strong>
        <Text str="Text component for excercise :)" />
      </InputWithLabel>
      <br />
      <List data={data} idx={data.objectID} />
      <TAPP />
    </div>
  );
};

export default App;
// React Side-Effects

const InputWithLabel = ({ id, value, onInputChange, type, children }) => (
  <>
    <label htmlFor="{id}">{children}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
);

const Text = ({ str }) => <p>{str}</p>;
