import React from 'react';
import './style.css';
import Search from './Search';
import List from './List';

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
      <Search onSearch={handleSearch} st={searchTerm} hel={handle_try2} />
      <hr />

      <List />
    </div>
  );
};

export default App;
// React Side-Effects
