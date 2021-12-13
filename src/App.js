import axios from 'axios';
import React from 'react';
import './style.css';
import List from './List';
import { Search, Heart } from 'react-feather';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// Async stories
const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialData } }), 2000)
  );

// Custom Hook
const useSemipersistentState = (key, initalState) => {
  const isMounted = React.useRef(false);
  // Adding reusablity
  const [value, setValue] = React.useState(
    localStorage.getItem('search') || initalState
  );

  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      // console.log('A');
      localStorage.setItem(key, value), [value, key];
    }
  }, [value, key]);

  return [value, setValue];
};

// APPPP

const App = () => {
  // Custom Hook In Use:
  const [searchTerm, setSearchTerm] = useSemipersistentState('search', '');

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
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
  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({
      type: 'STORIES_FETCH_INIT',
    });
    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
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
  const handleRemoveStory = React.useCallback((item) => {
    console.log('Target -> ' + item.title);

    const newStories = stories.data.filter(
      (story) => item.objectID !== story.objectID
    );

    newStories.forEach((item) => console.log('Left: ' + item.title));

    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, []);
  console.log('---> App');

  const getSumComments = (stories) => {
    console.log('C');

    return stories.data.reduce((res, val) => res + val.num_comments, 0);
  };

  const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

  return (
    <div className="container">
      <h1 className="main-head">Hacker News</h1>

      <h3>{sumComments}</h3>
      {/* Up next maybe hero icons!!! */}
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <br />
      {stories.isError && <h2>Something went wrong !!!</h2>}
      {stories.isLoading && <div className="lds-dual-ring"></div>}
      {!stories.isError & !stories.isLoading ? (
        <div className="post-container">
          <List data={stories.data} onRemoveItem={handleRemoveStory} />
        </div>
      ) : (
        <></>
      )}
      <h3 className="footer">
        Made with <Heart size={15} /> by T4P4N
        <br />
      </h3>
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

// Search Form Component
const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit}>
    <InputWithLabel1
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    ></InputWithLabel1>
    <button type="submit" disabled={!searchTerm}>
      <Search height="20px" width="20px" className="search-btn" />
    </button>
  </form>
);

// export default SearchForm;

// Class Based Component //

class InputWithLabel1 extends React.Component {
  render() {
    const {
      id,
      value,
      type = 'text',
      onInputChange,
      children,
      placeholder,
    } = this.props;

    return (
      <>
        <label htmlFor={id}>{children}</label>
        &nbsp;
        <input
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
          placeholder="Type Something "
        />
      </>
    );
  }
}

// Class Component with State

class App1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  render() {
    const { name } = this.state;

    return (
      <div>
        <input
          type="text"
          placeholder="Enter Your Name!"
          onChange={() => this.setState({ name: event.target.value })}
        />
        <p
          onClick={() => alert(`Hello, ${name}!!! from Class Based Component!`)}
        >
          Click me
        </p>
        <hr />
      </div>
    );
  }
}

//   Notes   //
//   Learn more about useRef Hook        //
//   Learn more about useCallback      //
//   Learn more about eventhandlers in react        //
//           //
