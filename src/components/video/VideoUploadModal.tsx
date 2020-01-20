import React, { useState, useEffect } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import FileUploader from "../../common/upload/FileUploader";
import useAsync from "../../common/hoc/useAsync";
import VideoApi from "./VideoApi";

interface IProps {
  history?: {
    [key: string]: any;
    goBack: () => void;
  };
}
const VideoUploadModal: React.FC<IProps> = ({ history }) => {
  const [modalOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [disableUploadBtn, setDisableUploadBtn] = useState(true);
  const [refresh, setRefresh] = useState(Date.now());
  const { fetch, loading, data, reset, error } = useAsync();
  useEffect(() => {
    if (selectedFile) {
      setDisableUploadBtn(false);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (data) {
      console.log("data ", data);
    }
  }, [data]);

  const onChangeHandler = (event: any) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const startUpload = () => {
    const data = new FormData();
    data.append("file", selectedFile);
    /* Api to upload the file */
    fetch(() => VideoApi.uploadVideo(data));
  };

  const handleClose = () => {
    history?.goBack();
  };

  return (
    <Modal
      data-testid="videoUploaModal"
      key={refresh}
      open={modalOpen}
      onClose={handleClose}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        <h3>Upload Video</h3>
      </Modal.Header>
      {!error ? (
        <Modal.Content>
          <FileUploader onChangeHandler={onChangeHandler} />
        </Modal.Content>
      ) : (
        <div style={{ padding: '10px 0px 0px 20px' }}>
          <h4 style={{ color: "#ff392b" }}>
            Error in uploading video
          </h4>
          <Button
            data-testid="retryBtn"
            color="red"
            size="small"
            onClick={() => {
              reset();
              setRefresh(Date.now());
            }}
            inverted
          >
            <Icon name="refresh" /> Upload again
          </Button>
        </div>
      )}

      <Modal.Actions style={{ borderTop: "0px" }}>
        <Button
          data-testid="cancelUpload"
          color="red"
          onClick={handleClose}
          inverted
          disabled={loading}
        >
          <Icon name="times" /> Cancel
        </Button>
        <Button
          data-testid="startUpload"
          color="green"
          onClick={startUpload}
          inverted
          disabled={disableUploadBtn || loading || error}
        >
          <Icon name="check" /> Upload
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default VideoUploadModal;
