import request from "../../HttpServe";
module.exports =  {
  Register: function (data){
   return request({
     url: '/register',
     method:'post',
     data
   })
 }
}