import React from "react";
import { Router } from "react-router-dom";
import {
  render,
  cleanup,
  screen,
  fireEvent,
  wait
} from "@testing-library/react";
import FileUploader from "../FileUploader";
afterEach(cleanup);

//const file = new File(["dsds"], "1.mp4");

const file = new File(["(⌐□_□)"], "chucknorris.png", {
  type: "image/png"
});

describe("File uploader Component", function() {
  test("show file name", async () => {
    render(<FileUploader onChangeHandler={() => {}} />);
    const inputEl = screen.getByTestId(/uploader/i);

    // Object.defineProperty(inputEl, "files", {
    //   value: [file]
    // });
    // fireEvent.change(inputEl);
    fireEvent.change(inputEl, { target: { files: [file] } });

    await wait();
    console.log(inputEl.innerHTML);

    //https://codesandbox.io/s/rl0wj028pp
    // https://github.com/testing-library/react-testing-library/issues/93
    // expect( screen.getByText(/1\.mp4/)).toBeInTheDocument();

    // fireEvent.change(inputEl, { target: { files: [file] } });

    // console.log("screen ", screen);
    //expect(.getByText(/1\.mp4/)).toBeInTheDocument();
  });
});
