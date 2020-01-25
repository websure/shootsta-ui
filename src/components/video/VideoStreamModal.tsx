import React from "react";
import { Button, Icon, Modal, Grid } from "semantic-ui-react";
import { useLocation, useHistory } from "react-router-dom";
import Styled from "styled-components";
import { IVideoObj } from "./ContextManagement";

const Label = Styled.span`
  font-weight: bold
`;

interface ILocation {
  state: {
    video: IVideoObj;
    [key: string]: any;
  };
  [key: string]: any;
}

const VideoStreamModal: React.FC = () => {
  const Location: ILocation = useLocation();
  const history = useHistory();
  const handleClose = () => {
    history?.goBack();
  };
  return (
    <Modal
      data-testid="videoStreamModal"
      open={true}
      onClose={() => history?.goBack()}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        <h3>Streaming Video : {Location.state.video.name} </h3>
      </Modal.Header>
      <Modal.Content>
        <Grid doubling columns={2}>
          <Grid.Column>
            <video
              data-testid="videoPlayer"
              src={`http://localhost:5000/assets/videos/${Location.state.video.id}`}
              controls
              width="320"
              height="240"
            >
              Your browser does not support the video tag.
            </video>
          </Grid.Column>
          <Grid.Column style={{ paddingTop: "2rem" }}>
            <p>
              <Label>Name :</Label>
              {Location.state.video.name}
            </p>
            <p>
              <Label> Video Id :</Label>
              {Location.state.video.id}
            </p>
            <p>
              <Label>MIME :</Label>
              {Location.state.video.mimetype}
            </p>
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions style={{ borderTop: "0px" }}>
        <Button
          data-testid="closeStreamBtn"
          color="red"
          onClick={handleClose}
          inverted
        >
          <Icon name="times" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default VideoStreamModal;
