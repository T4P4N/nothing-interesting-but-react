import * as React from "react";
import { Search } from "react-feather";
import { SearchFormProps } from "./Story";
import InputWithLabel from "./InputWithLabel";

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit
}: SearchFormProps) => (
  <form onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      {/* <strong>Search:</strong> */}
    </InputWithLabel>
    <button type="submit" disabled={!searchTerm} className="search-btn">
      <Search height="20px" width="20px" className="search-btn" />
    </button>
  </form>
);

export default SearchForm;
