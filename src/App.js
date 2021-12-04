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

// Async stories
const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialData } }), 2000)
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
};

const App = () => {
  //                    //
  //  STORIES REDUCER  //
  //                  //

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_STORIES': {
        return action.payload;
      }

      case 'REMOVE_STORY': {
        return state.filter(
          (story) => action.payload.objectID !== story.objectID
        );
      }
      default:
        throw new Error();
    }

    // if (action.type === 'SET_STORIES') {
    //   return action.payload.then(console.log('ERRRR'));
    // } else {
    //   console.log('ERRRR');
    //   throw new Error();
    // }
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const [stories, dispatchStories] = React.useReducer(storiesReducer, []);

  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: 'SET_STORIES',
          payload: result.data.stories,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        console.log('HERE: ' + error);
      });
  }, []);

  const defaultSearchTerm = 'Happiness in Small Things!';

  // Custom Hook In Use:
  const [searchTerm, setSearchTerm] = useSemipersistentState(
    'search',
    defaultSearchTerm
  );

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

  const searchedStories = stories.filter(function (story) {
    return story.title.includes(searchTerm);
  });

  // Remove Story
  const handleRemoveStory = (item) => {
    console.log('Target -> ' + item.title);

    const newStories = stories.filter(
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
      <h1 className="main-head">Reducers!</h1>

      {/* <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
        type="text"
      >
        <h3>Search: </h3>
      </InputWithLabel>
       */}

      <Search />

      <br />
      {isError && <h2>Something went wrong!!!</h2>}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
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
      )}
    </div>
  );
};

export default App;

// const InputWithLabel = ({ id, value, onInputChange, type, children }) => (
//   <>
//     <label htmlFor="{id}">{children}</label>
//     &nbsp;
//     <input id={id} type={type} value={value} onChange={onInputChange} />
//   </>
// );

// const Text = ({ str }) => <p>{str}</p>;

// Start of Use Reducer pg no. 92!
