import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import VideoUploadModal from "./components/video/VideoUploadModal";
import VideoComponent from "./components/video";

const Routes = (props: any) => {
  console.log("Routes ", props);
  let location: any = useLocation();
  let history = useHistory()
  let ismodal = location.state && location.state.ismodal;
  
  return (
    <>
      <Switch location={ismodal || location}>
        <Route exact path="/" children={<VideoComponent />} />
      </Switch>
      {/* Show the modal when a ismodal page is set */}
      {ismodal && <Route path="/videoupload" children={<VideoUploadModal history={history}/>} />}
    </>
  );
};

export default Routes;
