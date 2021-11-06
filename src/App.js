import React from 'react';
import './style.css';
import Search from './Search';
// import List from './List';

const App = () => {
  const stories = [];

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(function (story) {
    return story.title.includes(searchTerm);
  });

  return (
    <div>
      <h1>My hacker news stories</h1>
      <Search onSearch={handleSearch} st={searchTerm} />
      <hr />

      {/* <List list={searchedStories} /> */}
    </div>
  );
};

export default App;

// Lifting state in react (44)
