import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer
} from "react";
import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";

export const stateContext = createContext<IContextObj>({thumbnailList:[]});

type Action = "update";
type IState = string[];

export interface IContextObj {
    thumbnailList : IState,
    updateThumbnailList? : (thumbnail: string) => void
}

interface IAction {
  type: Action;
  payload: IState;
}

const VideoContext: React.FC = ({ children }) => {
  let thumblist = [img1, img2];

  useEffect(() => {
    fetchThumbnail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchThumbnail = () => {
    /* Fetch api will come here */
    dispatch({ type: "update", payload: thumblist });
  };

  const Reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
      case "update": {
        return [...state, ...action.payload];
      }
    }
    //return [...state, ...action.payload];
  };

  const [data, dispatch] = useReducer(Reducer, []);

  const updateThumbnailList = (thumbnail: string) => {
    dispatch({ type: "update", payload: [thumbnail] });
  };

  return (
    <stateContext.Provider
      value={{
        thumbnailList: data,
        updateThumbnailList: updateThumbnailList
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export default VideoContext;
