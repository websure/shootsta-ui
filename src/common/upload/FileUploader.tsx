/* 
  File uploader 
  by defaults accept Mp4 videos
*/
import React, { forwardRef } from "react";
interface IProps {
  onChangeHandler: (event: any) => void;
  accept?: string;
  [key: string]: any;
}
type Ref = HTMLInputElement;

const FileUploader: React.FC<IProps> = forwardRef<Ref, IProps>(
  ({ onChangeHandler, accept = "video/mp4" }, ref) => {
    return (
      <>
        <input
          type="file"
          ref={ref}
          name="file"
          data-testid="uploader"
          accept={accept}
          onChange={event => onChangeHandler(event)}
        />
      </>
    );
  }
);

export default FileUploader;
