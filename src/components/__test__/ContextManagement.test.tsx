import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import { stateContext } from "../video/ContextManagement";
import VideoList from "../video/VideoList";

const ContextObj = {
  videoObjList: {
    samplevideoObj1: {
      id: "123",
      name: "testimg1",
      path: "/a/b"
    },
    samplevideoObj2: {
      id: "456",
      name: "testimg2",
      path: "/a/b"
    }
  }
};
const EmptyVideoObj = {
  videoObjList: {}
};
const Tree = (
  <Router>
    <stateContext.Provider value={ContextObj}>
      <VideoList />
    </stateContext.Provider>
  </Router>
);

afterEach(cleanup);

describe("Test Context Provider", function() {
  test("thumb images are passed as expected", () => {
    const { container } = render(Tree);
    let child = container.getElementsByTagName("img");
    expect(child.length).toBe(2);
  });

  test("source of thumb images are passed in sequence as expected", () => {
    const { container } = render(Tree);
    let child = container.getElementsByTagName("img");
    expect(child[0].src).toContain("assets/images/123.png");
    expect(child[1].src).toContain("assets/images/456.png");
  });

  test("no images are shown when there are no thum images", () => {
    const tree = (
      <Router>
        <stateContext.Provider value={EmptyVideoObj}>
          <VideoList />
        </stateContext.Provider>
      </Router>
    );
    const { container } = render(tree);
    let image = container.getElementsByTagName("img");
    expect(container).not.toContain(image);
  });

  test("message is shown when there are no thum images", () => {
    const tree = (
      <Router>
        <stateContext.Provider value={EmptyVideoObj}>
          <VideoList />
        </stateContext.Provider>
      </Router>
    );
    const { getByTestId } = render(tree);
    let info = getByTestId(/noThumbImages/i);
    expect(info).toBeInTheDocument();
  });
});
