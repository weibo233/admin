<template>
  <div class="aliUpload">
    <div class="oss_file">
      <button
        type="button"
        class="el-button el-button--primary el-button--small is-plain"
      >
        上传文件
      </button>
      <input type="file" id="id" @change="doUpload($event)" />
      <div style="margin-left:100px;">{{ videoname }}</div>
    </div>
  </div>
</template>
<script>
let OSS = require("ali-oss");
let client = new OSS({
  region: $apiUtils.setAliSDK().region,
  accessKeyId: $apiUtils.setAliSDK().accessKeyId,
  accessKeySecret: $apiUtils.setAliSDK().accessKeySecret,
  bucket: $$apiUtils.setAliSDK().bucket
});
export default {
  name: "upload",
  data() {
    return {
      videoName: "",
      videoUrl: "",
      size: ""
    };
  },
  methods: {
    doUpload(event) {
      this.$emit("getProgress", 0);
      let file = event.target.files;
      this.size = file[0].size;
      let tmpArr = file[0].name.split(".");
      let tmpName = md5(Date.now() + tmpArr[0]);
      tmpName = tmpName + "." + tmpArr[1];
      this.multipartUpload(tmpName, file[0]);
    },
    multipartUpload(upName, upFile) {
      //Vue中封装的分片上传方法（详见官方文档）
      let _this = this;
      const progress = async function(p) {
        //项目中需获取进度条，故调用进度回调函数（详见官方文档）
        _this.$emit("getProgress", Math.round(p * 100));
      };
      try {
        let result = client
          .multipartUpload(upName, upFile, {
            progress,
            meta: {
              year: 2017,
              people: "test"
            }
          })
          .then(res => {
            _this.videoUrl = res.res.requestUrls[0].split("?")[0];
            let info = {};
            info.name = res.name;
            info.size = _this.size;
            info.videoUrl = _this.videoUrl;
            _this.$emit("getUrl", info);
            let head = client.head(upName);
          })
          .catch(err => {
            console.log(err);
          });
      } catch (e) {
        // 捕获超时异常
        if (e.code === "ConnectionTimeoutError") {
          console.log("Woops,超时啦!");
        }
        console.log(e);
      }
    }
  }
};
</script>
