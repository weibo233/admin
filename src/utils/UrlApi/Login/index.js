import request from "../../HttpServe";
module.exports = {
  Login:function (data){
      return request({
        url: '/framework/all/login',
        method:'post',
        data
      })
    },
}

