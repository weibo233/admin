import axios from 'axios';
axios.defaults.withCredentials=true
// axios.defaults.baseURL = 'http://qiuchl.natapp1.cc'
// axios.defaults.baseURL = 'http://39.96.4.225'
// axios.defaults.baseURL = 'http://www.cxxm.net'
axios.defaults.baseURL = '/api'
// create an axios instance

//响应拦截
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


export default axios;