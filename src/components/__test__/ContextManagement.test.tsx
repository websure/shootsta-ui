import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, cleanup } from "@testing-library/react";
import VideoContext, { stateContext } from "../video/ContextManagement";
import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import VideoList from "../video/VideoList";
import VideoComponent from "../video/index";
const history = createMemoryHistory();

const ContextObj = {
  thumbnailList: [img1, img2]
};

afterEach(cleanup);

describe("Test Context Provider", function() {
  test("thumb images are passed as expected", () => {
    const tree = (
      <stateContext.Provider value={ContextObj}>
        <VideoList />
      </stateContext.Provider>
    );
    const { container } = render(tree);
    let child = container.getElementsByTagName("img");
    expect(child.length).toBe(2);
  });

  test("source of thumb images are passed in sequence as expected", () => {
    const tree = (
      <stateContext.Provider value={ContextObj}>
        <VideoList />
      </stateContext.Provider>
    );
    const { container } = render(tree);
    let child = container.getElementsByTagName("img");
    expect(child[0].src).toContain("1.jpg");
    expect(child[1].src).toContain("2.jpg");
  });

  test("no images are shown when there are no thum images", () => {
    const tree = (
      <stateContext.Provider value={{ thumbnailList: [] }}>
        <VideoList />
      </stateContext.Provider>
    );
    const { container } = render(tree);
    let image = container.getElementsByTagName("img");
    expect(container).not.toContain(image);
  });

  test("message is shown when there are no thum images", () => {
    const tree = (
      <stateContext.Provider value={{ thumbnailList: [] }}>
        <VideoList />
      </stateContext.Provider>
    );
    const { getByTestId } = render(tree);
    let info = getByTestId(/noThumbImages/i);
    expect(info).toBeInTheDocument();
  });

  test("context api works and passes context data to children", () => {
    const tree = (
      <stateContext.Provider value={ContextObj}>
        <VideoList />
      </stateContext.Provider>
    );
    const { getByTestId, container } = render(tree);
    let image = container.getElementsByTagName("img");
    expect(image.length).toBe(2);

    //   const { getByTestId } = render(
    //     <Router history={history}>
    //       <VideoContext>
    //         <VideoComponent />
    //       </VideoContext>
    //     </Router>
    //   );

    // const listElement = getByTestId(/videolist/i);
    // let child = listElement.getElementsByTagName("img");

    // expect(listElement.hasChildNodes()).toBeTruthy();
    // expect(child[0].src).toContain("1.jpg");
    // expect(child[1].src).toContain("2.jpg");
  });
});
