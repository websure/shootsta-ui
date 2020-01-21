import React, { useContext, useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";

interface IProps {
  onChangeHandler: (event: any) => void;
  [key: string]: any;
}

const FileUploader: React.FC<IProps> = ({ onChangeHandler }) => {
  return (
    <>
      <input
        type="file"
        name="file"
        data-testid="uploader"
        onChange={event => onChangeHandler(event)}
      />
    </>
  );
};

export default FileUploader;
