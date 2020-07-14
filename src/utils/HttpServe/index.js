import axios from 'axios';
axios.defaults.withCredentials=true
// create an axios instance
const service = axios.create({
  // baseURL: "/currentBottle",
  baseURL: "http://qiuchl.natapp1.cc",
  timeout: 10000 // request timeout
})

export default service;