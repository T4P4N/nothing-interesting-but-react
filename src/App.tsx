import React from "react";
import axios from "axios";
// import { act } from "react-dom/test-utils";
import { Heart } from "react-feather";
// Prj files
import List from "./List";
import SearchForm from "./SearchForm";
// import ExerciseOne from "./test";
//

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

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("state", "React");

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false
  });

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const result = await axios.get(url);
      const d = result.data.hits;

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: d
        // payload: _.sortBy(d, ["title"])
      });
    } catch {
      dispatchStories({
        type: "STORIES_FETCH_FAILURE"
      });
    }
  }, [url]);

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

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    event.preventDefault();
  };

  return (
    <div className="container">
      <h1 className="main-head">Hacker News</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

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
      <footer>
        <h3 className="footer">
          Made with <Heart /> by T4P4N
        </h3>
      </footer>
    </div>
  );
};

export default App;
