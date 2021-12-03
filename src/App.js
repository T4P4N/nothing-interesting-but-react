import React from 'react';
import './style.css';
import Search from './Search';
import List from './List';
import TAPP from './ListTable';

const initialData = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    points: 5,
    objectID: 0,
  },

  {
    title: 'Redux',
    url: 'https://reactjs.org',
    author: 'Dan Abramov',
    points: 6,
    objectID: 1,
  },

  {
    title: 'MobX',
    url: 'https://www.mobxjs.com',
    author: 'Michel',
    points: 3,
    objectID: 2,
  },
];

// Async stories
const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialData } }), 5000)
  );
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

  const [stories, setStories] = React.useState([]);

  React.useEffect(() => {
    getAsyncStories().then((result) => {
      // console.log(result);
      setStories(result.data.stories);
    }, []);
  });

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

  const handleRemoveStory = (item) => {
    console.log('Target -> ' + item.title);

    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    newStories.forEach((item) => console.log('Left: ' + item.title));
    setStories(newStories);
  };

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
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Points</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <List data={stories} onRemoveItem={handleRemoveStory} />
        </tbody>
      </table>
      {/* <TAPP /> */}
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

// Start of Async pg no. 86!
