import SearchItem from "../components/items/SearchItem";
import Search from "../components/items/Search";
import React from "react";
import renderer from "react-test-renderer";

test("Check if search component is rendering correctly", () => {
  const tree = renderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapShot();
});

test("Check if item component is rendering correctly", () => {
  const tree2 = renderer.create(<SearchItem />).toJSON();
  expect(tree2).toMatchSnapShot();
});
