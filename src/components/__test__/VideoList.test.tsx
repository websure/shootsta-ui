import React from "react";
import { Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import VideoList from "../video/VideoList";

afterEach(cleanup);

describe("Test Video List Component", function() {
  test("no images are shown when there are no thum images", () => {
    const { getByTestId } = render(<VideoList />);
    let info = getByTestId(/noThumbImages/i);
    expect(info).toBeInTheDocument();
  });
});
