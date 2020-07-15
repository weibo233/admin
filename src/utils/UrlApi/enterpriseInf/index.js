import request from "../../HttpServe";
module.exports = {
  getEntInf:function (data){
      return request({
        url: '/framework/all/subject/info',
        method:'post',
        data
      })
    },
    updateEntInf:function(data) {
        return request({
            url: '/framework/pf/company/update',
            method:'post',
            data
        })
    }
}

