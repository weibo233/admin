import request from "../../HttpServe";
module.exports = {
    upLoad:function(data) {
      return request({
        url:'/framework/pf/file/getPostUrl',
        method:'post',
        data
      })
    }
}

