import React from "react";
import VideoList from "../video/VideoList";
import { stateContext } from "../video/ContextManagement";
import VideoStreamModal from "../video/VideoStreamModal";
import { withRouter } from "react-router";
import { Link, Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory, createLocation } from "history";
import {
  render,
  screen,
  cleanup,
  wait,
  fireEvent
} from "@testing-library/react";
import routeData from "react-router";

afterEach(cleanup);

const SamplevideoObj = {
  id: "123",
  name: "testimg1",
  path: "/a/b"
};
const mockLocation = {
  pathname: "/videostream",
  hash: "",
  search: "",
  state: {
    video: SamplevideoObj
  }
};

beforeEach(() => {
  jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
});

function renderWithRouter(
  ui: any,
  { route: string = "/videostream", history = createMemoryHistory() } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

describe("Modal Component", function() {
  test("modal is rendered", async () => {
    const { getByTestId } = renderWithRouter(<VideoStreamModal />);
    await wait(() => getByTestId(/videoStreamModal/i));
    expect(getByTestId("videoStreamModal")).toBeInTheDocument();
  });

  test("modal video Player is loaded", async () => {
    const { getByTestId, container } = renderWithRouter(<VideoStreamModal />);
    await wait(() => getByTestId(/videoPlayer/i));
    let videoSrc = getByTestId(/videoPlayer/i).getAttribute('src');
    
    expect(videoSrc).toContain("assets/videos/123");    
    expect(getByTestId(/videoPlayer/i)).toBeInTheDocument();
  });

  test("modal close button is available", async () => {
    const { getByTestId } = renderWithRouter(<VideoStreamModal />);
    await wait(() => getByTestId(/closeStreamBtn/i));
    let btn = getByTestId(/closeStreamBtn/i);
    expect(btn).toBeInTheDocument();
  });
});
