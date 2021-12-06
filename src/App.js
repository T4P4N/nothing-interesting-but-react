import axios from 'axios';
import React from 'react';
import './style.css';
import Search from './Search';
import List from './List';

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

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// Async stories
const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialData } }), 2000)
  );
// new Promise((resolve, reject) => setTimeout(reject, 2000));

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
};

// APPPP

const App = () => {
  // Custom Hook In Use:
  const [searchTerm, setSearchTerm] = useSemipersistentState(
    'search',
    'Type Something'
  );

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };
  //                    //
  //  STORIES REDUCER  //
  //                  //

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'STORIES_FETCH_INIT': {
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      }
      case 'STORIES_FETCH_SUCESS': {
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      }
      case 'STORIES_FETCH_FAILURE': {
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      }

      case 'REMOVE_STORY': {
        return {
          ...state,
          data: state.data.filter(
            (story) => action.payload.objectID !== story.objectID
          ),
        };
      }
      default:
        throw new Error();
    }
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // Memoized Handler In React
  const handleFetchStories = React.useCallback(() => {
    // if (searchTerm === '') return;
    // if (!searchTerm) return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    //
    // Get data from
    // api using fetch
    //

    axios
      .get(url)
      // .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCESS',
          payload: result.data.hits,
        });
      })
      .catch((error) => {
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
      });
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const defaultSearchTerm = 'Happiness in Small Things!';

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm, [searchTerm]);

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  });

  // Search
  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);

    localStorage.setItem('search', event.target.value);
  };

  // const searchedStories = stories.data.filter(function (story) {
  //   return 'story.title.includes(searchTerm)';
  // });

  // Remove Story
  const handleRemoveStory = (item) => {
    console.log('Target -> ' + item.title);

    const newStories = stories.data.filter(
      (story) => item.objectID !== story.objectID
    );

    newStories.forEach((item) => console.log('Left: ' + item.title));

    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  return (
    <div className="container">
      <h1 className="main-head">HACKER NEWS</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearchInput}
        type="text"
      >
        <h3>Search: </h3>
      </InputWithLabel>
      <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>
      {/* <Search onSearch={handleSearch} st={searchTerm} /> */}
      <br />
      {stories.isError && <h2>Something went wrong !!!</h2>}
      {stories.isLoading && <h2>Loading...</h2>}
      {!stories.isError & !stories.isLoading ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Points</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            <List data={stories.data} onRemoveItem={handleRemoveStory} />
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;

const InputWithLabel = ({ id, value, onInputChange, type, children }) => (
  <>
    <label htmlFor="{id}">{children}</label>
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
);

// const Text = ({ str }) => <p>{str}</p>;

// Start of Use Reducer pg no. 92!
