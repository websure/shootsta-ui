/* 
  Api methods for Videos
*/
import Api from "../../common/Api";

const VideoApi = {
  uploadVideo: (params: any) => Api.post("/video/upload", params),
  getvideoList: () => Api.get("/video")
};

export default VideoApi;
