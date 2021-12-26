import React from "react";
import { Search } from "react-feather";

import InputWithLabel from "./InputWithLabel";

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  // what is void?????
};

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
