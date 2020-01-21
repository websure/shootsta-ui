import React from "react";
//import UseRouter from "./common/hoc/useRouter";
import Routes from "./Routes";
const App: React.FC = () => {
  //return UseRouter(Routes);
  return (
    <div data-testid="videoApp">
      <Routes />
    </div>
  );
};

export default App;
