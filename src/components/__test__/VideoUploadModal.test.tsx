import React from "react";
import { Router } from "react-router-dom";
import { render, cleanup, wait } from "@testing-library/react";
import VideoUploadModal from "../video/VideoUploadModal";

afterEach(cleanup);

describe("Modal Component", function() {
  test("modal is rendered", () => {
    const { getByTestId } = render(<VideoUploadModal />);
    let modal = getByTestId(/videoUploaModal/i);
    expect(modal).toBeInTheDocument();
  });

  test("modal Upload button is disabled on load", () => {
    const { getByTestId } = render(<VideoUploadModal />);
    let btn = getByTestId(/startUpload/i);
    expect(btn).toHaveAttribute("disabled");
  });

  test("modal cancel button is available", () => {
    const { getByTestId } = render(<VideoUploadModal />);
    let btn = getByTestId(/cancelUpload/i);
    expect(btn).toBeInTheDocument();
  });

  test("modal file uploader is available", async() => {
    const { container, getByTestId } = render(<VideoUploadModal />);

    await wait(() => getByTestId("uploader"));
    expect(getByTestId("uploader")).toBeInTheDocument()
    // let input = container.getElementsByTagName("input");
    // console.log("input ", container.children);
    //expect(input.length).toBe(1)
  });
});
