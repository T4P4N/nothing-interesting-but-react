import React from 'react';
import './style.css';
import Search from './Search';
import List from './List';

const App = () => {
  // const [searchTerm, setSearchTerm] =

  const stories = [];

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
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

  return (
    <div>
      <h1>My hacker news stories</h1>
      <Search onSearch={handleSearch} st={searchTerm} />
      <hr />

      <List />
    </div>
  );
};

export default App;
// React Side-Effects
