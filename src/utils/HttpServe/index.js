import axios from 'axios';
axios.defaults.withCredentials=true
// create an axios instance

// axios.interceptors.response.use(res=> {
//   Loading.service().close();
//     if (res.data.code == 200) {
//       return res.data.result;
//     } else if (res.data.code == 401) {
//       router.push('/login')
//     } else if(res.data.code == 201){
//       Message.error({message: res.data.msg});
//       return Promise.reject(res);
//     }
//     return Promise.reject(res);
//   }, err=> {
//   Loading.service().close();
//   if (err.response.status == 504||err.response.status == 404) {
//       Message.error({message: '服务器被吃了⊙﹏⊙∥'});
//     } else if (err.response.status == 403) {
//       Message.error({message: '权限不足,请联系管理员!'});
//     } else {
//       Message.error({message: '未知错误'});
//     }
//     return Promise.reject(err);
// })

const service = axios.create({
  // baseURL: "/currentBottle",
  baseURL: "http://qiuchl.natapp1.cc",
  timeout: 10000 // request timeout
})

export default service;