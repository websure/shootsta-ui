/* 
  video component:
  Displays list of videos
  Allow user to stream and upload mp4 videos
*/
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import Styled from "styled-components";
import VideoList from "./VideoList";
import ErrorBoundary from "../../common/ErrorBoundary";

const PlayListText = Styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.4rem;
`;

const Videos: React.FC = () => {
  let location: any = useLocation();
  return (
    <>
      <ErrorBoundary>
        <Grid doubling data-testid="listContainer">
          <Grid.Row
            centered
            style={{
              background: "#2185d0",
              color: "#ffff"
            }}
          >
            <h2>Welcome to video dashboard</h2>
          </Grid.Row>
          <Grid.Row textAlign="center">
            <Grid.Column>
              <Link
                to={{
                  pathname: `videoupload`,
                  /* open the path in modal */
                  state: { ismodal: location }
                }}
              >
                <Button data-testid="uploadBtn" size="large" primary>
                  Upload Video
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <PlayListText>Your Uploads</PlayListText>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row data-testid="videoList">
            <VideoList />
          </Grid.Row>
        </Grid>
      </ErrorBoundary>
    </>
  );
};

export default Videos;
