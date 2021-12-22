import React from "react";
import renderer from "react-test-renderer";
import App, { Item, List, SearchForm, InputWithLabel } from "./App";
import { render, fireEvent, screen } from "@testing-library/react";
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
  const handleRemoveItem = jest.fn();

  let component;
  beforeEach(() => {
    component = renderer.create(
      <Item item={item} onRemoveItem={handleRemoveItem} />
    );
  });

  it("renders all properties", () => {
    const component = renderer.create(<Item item={item} />);
    // author
    expect(component.root.findAllByType("p")[0].props.children[2]).toEqual(
      "Jordan Walke"
    );
    // title
    expect(component.root.findAllByType("a")[0].props.children).toEqual(
      "React"
    );
    // points
    expect(component.root.findAllByType("p")[1].props.children[2]).toEqual(4);
  });

  // This is all sh*t we should only data-testid to get elements

  it("calls onRemoveItem on button click", () => {
    render(<Item item={item} onRemoveItem={handleRemoveItem} />);
    screen.getByTestId("btn-element").props.onClick();
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(item);
  });
});
