describe("something truthy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });
});

// test suite

describe("Truthy and falsy", () => {
  // test case
  it("true to be true", () => {
    // test assertation
    expect(false).toBe(false);
  });
});

import React from "react";
import renderer from "react-test-renderer";

import App, { Item, List, SearchForm, InputWithLabel } from "./App";

// item test cases
describe("Item", () => {
  const item = {
    title: "React",
    url: "https://reactjs.org",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  };

  it("renders all properties", () => {
    const component = renderer.create(<Item item={item} />);

    expect(component.root.findAllByProps({ children: "Jordan Walke" })).toEqual(
      "1"
    );
  });
});
