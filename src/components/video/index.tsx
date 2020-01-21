import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import VideoList from "./VideoList";
import VideoContext from "./ContextManagement";
const Videos: React.FC = () => {
  let location: any = useLocation();
  return (
    <>
      <VideoContext>
        <Grid data-testid="listContainer" >
          <Grid.Row textAlign="center">
            <h3>Welcome</h3>
          </Grid.Row>
          <Grid.Row textAlign="right">
            <Grid.Column floated="right">
              <Link
                to={{
                  pathname: `videoupload`,
                  // This is the trick! This link sets
                  // the `ismodal` in location state.
                  state: { ismodal: location }
                }}
              >
                <Button data-testid="uploadBtn" size="large" primary compact>
                  Upload
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row data-testid="videoList">
            <VideoList />
          </Grid.Row>
        </Grid>
      </VideoContext>
    </>
  );
};

export default Videos;
