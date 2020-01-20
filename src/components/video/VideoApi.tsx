import axios from "axios";

const VideoApi = {
  uploadVideo: (params: any) => axios.post('/upload',{data:params})
};

export default VideoApi;
