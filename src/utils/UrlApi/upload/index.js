import request from "../../HttpServe";
module.exports = {
    policy:function(data) {
      return request({
        url:'/framework/pf/file/getPostUrl',
        method:'post',
        data
      })
    }
}

