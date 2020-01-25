import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, cleanup } from "@testing-library/react";
import VideoComponent from "../video/index";

const history = createMemoryHistory();

afterEach(cleanup);

describe("Renders  video App", function() {
  test("renders App without crashing", () => {
    const { getByTestId } = render(
      <Router history={history}>
        <VideoComponent />
      </Router>
    );
    const Element = getByTestId(/listContainer/i);
    expect(Element).toBeInTheDocument();
  });

  test("renders upload button", () => {
    const { getByTestId } = render(
      <Router history={history}>
        <VideoComponent />
      </Router>
    );
    const uploadElement = getByTestId(/uploadBtn/i);
    expect(uploadElement).toBeInTheDocument();
  });

  test("renders video list", () => {
    const { getByTestId } = render(
      <Router history={history}>
        <VideoComponent />
      </Router>
    );
    const listElement = getByTestId(/videolist/i);
    expect(listElement.hasChildNodes()).toBeTruthy();
  });
});
