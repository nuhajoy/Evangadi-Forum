import axios from 'axios';
const axiosBase = axios.create({
  // This is for local host
  // baseURL: 'http://localhost:5000/api',

  // This is for hosting
  baseURL: "https://evangadi-forum-last.onrender.com/api",
});

export default axiosBase;