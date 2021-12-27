import React from "react";
import axios from "axios";
// import { act } from "react-dom/test-utils";
import { Heart } from "react-feather";
// Prj files
import List from "./List";
import SearchForm from "./SearchForm";
// import ExerciseOne from "./test";
//
import { uniq } from "lodash";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const useSemiPersistentState = (
  key: string,
  initialState: string
): [string, (newValue: string) => void] => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type Stories = Array<Story>;

type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};

interface StoriesFetchInitAction {
  type: "STORIES_FETCH_INIT";
}

interface StoriesFetchSuccessAction {
  type: "STORIES_FETCH_SUCCESS";
  payload: Stories;
}

interface StoriesFetchFailureAction {
  type: "STORIES_FETCH_FAILURE";
}

interface StoriesRemoveAction {
  type: "REMOVE_STORY";
  payload: Story;
}

type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction;

const storiesReducer = (state: StoriesState, action: StoriesAction) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };

    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        )
      };
    default:
      throw new Error();
  }
};

// replaces API_ENDPOINT TO Empty strings
const extractSearchTerm = (url) => url.replace(API_ENDPOINT, "");

const getUrl = (searchTerm) => `${API_ENDPOINT}${searchTerm}`;

const getLastSearches = (urls) => {
  // uniq filters out the array for any dupes
  console.log(urls);

  // Somethings wrong here may found page 202?
  var fixme = urls
    // Slice it to last five ones but not including current one
    // .slice(-5, -1)
    .slice(-6)
    .slice(0, -1)
    .map((url) => extractSearchTerm(url));

  var fixed = uniq(fixme);

  console.log("->>", fixme);
  console.log("->>", fixed);

  return fixed;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("state", "");

  const [urls, setUrls] = React.useState([getUrl(searchTerm)]);

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false
  });

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);
      const rdh = result.data.hits;

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: rdh
      });
    } catch {
      dispatchStories({
        type: "STORIES_FETCH_FAILURE"
      });
    }
  }, [urls]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };
  // .filter removes any empty strings present in array
  const lastSearches = getLastSearches(urls).filter((n) => n.length >= 1);
  // const lastSearches = getLastSearches(urls);

  const handleLastSearch = (searchTerm) => {
    handleSearch(searchTerm);
    console.log();
  };

  return (
    <div className="container">
      <h1 className="main-head">Hacker News</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      {/* Render only if user has searched once or more than once */}
      {lastSearches.length > 0 ? (
        <p className="recent-search">
          <span className="rs-head">Recent Searches:</span>
          {lastSearches.map((searchTerm, index) => (
            <button
              className="rs-btn"
              key={index}
              type="button"
              onClick={() => handleLastSearch(searchTerm)}
            >
              {searchTerm}
            </button>
          ))}
        </p>
      ) : (
        <></>
      )}

      <br />
      {/* <ExerciseOne /> */}

      {stories.isError && <p>Something went wrong</p>}

      {stories.isLoading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <div className="post-container">
          <List data={stories.data} onRemoveItem={handleRemoveStory} />
        </div>
      )}
      {/* Stick me to the bottom pls ^__^ */}
      <footer>
        <h3 className="footer">
          Made with <Heart /> by T4P4N
        </h3>
      </footer>
    </div>
  );
};

export default App;
