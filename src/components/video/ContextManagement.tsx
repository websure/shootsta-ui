/* 
  React Context Api  
  Fetches video list from the server
  on new video upload, updates the video list
*/
import React, { createContext, useEffect, useReducer } from "react";
import { AxiosResponse } from "axios";
import VideoApi from "./VideoApi";

export const stateContext = createContext<IContextProps>({});

interface IContextProps {
  updateVideoList?: (obj: IVideoList | {}) => void;
  videoObjList?: IVideoList;
}
type Action = "update";
type IState = string[];
export interface IVideoObj {
  id: string;
  name: string;
  size?: number;
  path: string;
  encoding?: string;
  mimetype?: string;
  details?: string;
  screenshot?: string;
}
interface IAction {
  type: Action;
  payload: IVideoList;
}
export interface IVideoList {
  [key: string]: IVideoObj;
}
const VideoContext: React.FC = ({ children }) => {
  useEffect(() => {
    fetchThumbnail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchThumbnail = () => {
    /* Fetch the image list */
    VideoApi.getvideoList()
      .then((resp: AxiosResponse) => {
        dispatch({ type: "update", payload: resp.data.result });
      })
      .catch(e => {});

    // Api.get("/video")
    //   .then((resp: AxiosResponse) => {
    //     dispatch({ type: "update", payload: resp.data.result });
    //   })
    //   .catch(e => {});
  };
  const Reducer = (state: any, action: IAction) => {
    switch (action.type) {
      case "update": {
        return { ...state, ...action.payload };
      }
    }
  };
  const [data, dispatch] = useReducer(Reducer, {});
  const updateVideoList = (obj: IVideoList | {}) => {
    dispatch({ type: "update", payload: obj });
  };

  return (
    <stateContext.Provider
      value={{
        videoObjList: data,
        updateVideoList: updateVideoList
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export default VideoContext;
