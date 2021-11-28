import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("should render without crashing", () => {
  render(<Carousel/>)
})

it("should match snapshot", () => {
  const { asFragment } = render(<Carousel/>)
  expect(asFragment()).toMatchSnapshot()
})

it("should cycle correctly", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument()
  
  const rightArrow = queryByTestId("right-arrow")
  
  
  fireEvent.click(rightArrow)
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  const leftArrow = queryByTestId("left-arrow")

  fireEvent.click(leftArrow)
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument()
})

it("should not over flow", () => {
  const { queryByTestId } = render(<Carousel />);
  expect(queryByTestId("left-arrow")).toEqual(null)
  const rightArrow = queryByTestId("right-arrow")
  fireEvent.click(rightArrow)
  fireEvent.click(rightArrow)
  expect(queryByTestId("right-arrow")).toEqual(null)
  const leftArrow = queryByTestId("left-arrow")
  fireEvent.click(leftArrow)
  expect(queryByTestId("right-arrow"))


})