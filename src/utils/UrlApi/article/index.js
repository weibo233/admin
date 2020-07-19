import request from "../../HttpServe";
module.exports = {
    //获取文章接口
    getPage:function(data) {
        return request({
            url: '/framework/pf/article/page  ',
            method:'post',
            data
          })
    },
  //获取单个详情接口
  getDetail:function (data){
      return request({
        url: '/framework/pf/article/detail  ',
        method:'post',
        data
      })
    },
    //更新文章接口
    updateDetail:function(data) {
        return request({
            url: '/framework/pf/article/update  ',
            method:'post',
            data
        })
    }
}

