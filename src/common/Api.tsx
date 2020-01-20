import axios from "axios";

const defaultSettings = {
  withCredentials: false,
  timeout: 60000,
  baseURL: "http://localhost:8000"
};

export default axios.create({ ...defaultSettings });
