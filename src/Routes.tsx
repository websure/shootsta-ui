import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import VideoUploadModal from "./components/video/VideoUploadModal";
import VideoComponent from "./components/video";
import VideoStreamModal from "./components/video/VideoStreamModal";
import ErrorBoundary from "./common/ErrorBoundary";

const Routes = (props: any) => {
  let location: any = useLocation();
  let history = useHistory();
  let ismodal = location.state && location.state.ismodal;

  return (
    <>
      <Switch location={ismodal || location}>
        <Route
          exact
          path="/"
          children={
            <ErrorBoundary>
              <VideoComponent />
            </ErrorBoundary>
          }
        />
      </Switch>
      {/* Show the modal when a ismodal page is set */}
      {ismodal && (
        <Switch>
          <Route
            path="/videostream"
            children={
              <ErrorBoundary>
                <VideoStreamModal />
              </ErrorBoundary>
            }
          />
          <Route
            path="/videoupload"
            children={
              <ErrorBoundary>
                <VideoUploadModal history={history} />
              </ErrorBoundary>
            }
          />
        </Switch>
      )}
    </>
  );
};

export default Routes;
