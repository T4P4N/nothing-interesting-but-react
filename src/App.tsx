import * as React from "react";
import axios from "axios";
// import { act } from "react-dom/test-utils";
import { Heart } from "react-feather";
// Prj files
import List from "./List";
import SearchForm from "./SearchForm";
// import ExerciseOne from "./test";
//
import { uniq } from "lodash";

const API_BASE = "https://hn.algolia.com/api/v1/";
const API_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

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
  page: number;
  list: Array<Story>;
  concat: any;
  filter: any;
};

type StoriesState = {
  page: number;
  list?: Story;
  data: Story;
  isLoading: boolean;
  isError: boolean;
};

interface StoriesFetchInitAction {
  type: "STORIES_FETCH_INIT";
}

interface StoriesFetchSuccessAction {
  type: "STORIES_FETCH_SUCCESS";
  payload: Story | any;
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
        data:
          action.payload.page === 0
            ? action.payload.list
            : state.data.concat(action.payload.list),
        page: action.payload.page
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
          (story: Story) => action.payload.objectID !== story.objectID
        )
      };

    default:
      throw new Error();
  }
};

// replaces API_ENDPOINT TO Empty strings
const extractSearchTerm = (url: string) => {
  return url
    .substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&"))
    .replace(PARAM_SEARCH, "");
};

const getUrl = (searchTerm: any, page: number) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const getLastSearches = (urls: Array<any>) => {
  return uniq(
    urls
      .reduce((result, url, index) => {
        const searchTerm = extractSearchTerm(url);

        if (index === 0) {
          return result.concat(searchTerm);
        }

        const previousSearchTerm = result[result.length - 1];

        if (searchTerm === previousSearchTerm) {
          return result;
        } else {
          return result.concat(searchTerm);
        }
      }, [])
      .slice(-6)
      .slice(0, -1)
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("state", "");

  const [urls, setUrls] = React.useState([getUrl(searchTerm, 0)]);

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    page: 0,
    isLoading: false,
    isError: false
  });

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: {
          list: result.data.hits,
          page: result.data.page
        }
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

  const handleSearch = (searchTerm: any, page: any) => {
    setSearchTerm(searchTerm);
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url));
  };

  const handleMore = () => {
    // window.scrollTo({
    //   top: 1000,
    //   behavior: "smooth"
    // });
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, stories.page + 1);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchTerm, 0);
  };
  // .filter removes any empty strings present in array
  const lastSearches = getLastSearches(urls).filter((n: any) => n.length >= 1);
  // const lastSearches = getLastSearches(urls);

  const handleLastSearch = (searchTerm: any) => {
    handleSearch(searchTerm, 0);
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
          {lastSearches.map((searchTerm: string, index) => (
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
        <>
          <div className="post-container">
            <List data={stories.data} onRemoveItem={handleRemoveStory} />
          </div>
          {stories.isLoading ? (
            <div className="lds-dual-ring"></div>
          ) : (
            <button type="button" className="more-btn" onClick={handleMore}>
              load more
            </button>
          )}
        </>
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
