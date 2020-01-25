import React from "react";
import VideoContext from "./components/video/ContextManagement";
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <div data-testid="videoApp">
      <VideoContext>
        <Routes />
      </VideoContext>
    </div>
  );
};

export default App;
