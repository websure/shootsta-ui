import React from "react";
import { render } from "@testing-library/react";
import VideoList from "../video/VideoList";
import routeData from "react-router";

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

describe("Test Video List Component", function() {
  test("no images are shown when there are no thum images", () => {
    const { getByTestId } = render(<VideoList />);
    let info = getByTestId(/noThumbImages/i);
    expect(info).toBeInTheDocument();
  });
});
