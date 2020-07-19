import request from "../../HttpServe";
module.exports = {
  //获取公司信息
  getAllEntInf:function (data){
      return request({
        url: '/framework/all/company/list',
        method:'post',
        data
      })
    },
    //修改公司信息
    updateEntInf:function(data) {
        return request({
            url: '/framework/pf/company/update',
            method:'post',
            data
        })
    },
    //获取公司主体信息
    getSubInf:function(data) {
      return request({
        url:'/framework/all/subject/info',
        method:'post',
        data
      })
    },
    //修改公司主体信息
    updateSubInf:function(data) {
      return request({
        url:'/framework/pf/subject/update',
        method:'post',
        data
      })
    }
}

