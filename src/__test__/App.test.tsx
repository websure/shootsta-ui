import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, cleanup } from "@testing-library/react";
import App from "../App";

const history = createMemoryHistory();

afterEach(cleanup);

test("App renders without crashing", () => {
  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  const Element = getByTestId("videoApp");
  expect(Element).toBeInTheDocument();
});
