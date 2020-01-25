import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Icon, Modal, Message } from "semantic-ui-react";
import FileUploader from "../../common/upload/FileUploader";
import useAsync from "../../common/hoc/useAsync";
import VideoApi from "./VideoApi";
import { stateContext, IVideoList } from "./ContextManagement";

interface IProps {
  history?: {
    [key: string]: any;
    goBack: () => void;
  };
}

const VideoUploadModal: React.FC<IProps> = ({ history }) => {
  const { updateVideoList } = useContext(stateContext);
  const [modalOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  const [disableUploadBtn, setDisableUploadBtn] = useState(true);
  const [refresh, setRefresh] = useState(Date.now());
  const [success, setSuccess] = useState(false);
  const { fetch, loading, reset, error } = useAsync();
  const UploaderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedFile) {
      setDisableUploadBtn(false);
    }
  }, [selectedFile]);

  const onChangeHandler = (event: any) => {
    try {
      const data = new FormData();
      data.append("video", event.target.files[0]);
      setSelectedFile(data);
    } catch (e) {
      console.log(e);
    }
  };
  const showMsg = (val: string) => {
    if (val === "success") {
      setSuccess(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  const startUpload = () => {
    /* Api to upload the file */
    fetch(() =>
      VideoApi.uploadVideo(selectedFile).then(resp => {
        if (updateVideoList) {
          let obj: IVideoList = {};
          obj[`${resp.data.result.id}`] = resp.data.result;
          showMsg("success");
          if (null !== UploaderRef.current) {
            UploaderRef.current.value = "";
          }
          updateVideoList(obj);
        }
      })
    );
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
        <h3>Upload Video :</h3>
      </Modal.Header>
      {!error ? (
        <Modal.Content>
          <FileUploader ref={UploaderRef} onChangeHandler={onChangeHandler} />
          {success && (
            <Message compact success color="green">
              Video uploaded successfully !!
            </Message>
          )}
        </Modal.Content>
      ) : (
        <div style={{ padding: "10px 0px 0px 20px" }}>
          <h4 style={{ color: "#ff392b" }}>Error in uploading video</h4>
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
          disabled={disableUploadBtn || loading || error || success}
        >
          <Icon name="check" /> Upload
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default VideoUploadModal;
