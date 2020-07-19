<template>
  <div class="album albumvideo">
    <div>
      <p class="type_title">
        <span>视频介绍</span>
      </p>
      <div class="pic_img">
        <div class="pic_img_box">
          <el-upload
            class="avatar-uploader"
            action="https://wujiandong1.oss-cn-hangzhou.aliyuncs.com"
            width="100%"
            :data="dataObj"
            v-bind:on-progress="uploadVideoProcess"
            v-bind:on-success="handleVideoSuccess"
            v-bind:before-upload="beforeUploadVideo"
            v-bind:show-file-list="false"
          >
            <video
              v-if="videoForm.showVideoPath != '' && !videoFlag"
              v-bind:src="videoForm.showVideoPath"
              class="avatar video-avatar"
              controls="controls"
            >
              您的浏览器不支持视频播放
            </video>
            <i
              v-else-if="videoForm.showVideoPath == '' && !videoFlag"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <el-progress
              v-if="videoFlag == true"
              type="circle"
              v-bind:percentage="videoUploadPercent"
              style="margin-top:7px;"
            ></el-progress>
          </el-upload>
        </div>
      </div>
    </div>
    <p class="Upload_pictures">
      <span></span>
      <span>最多可以上传1个视频，建议大小50M，推荐格式mp4</span>
    </p>
  </div>
</template>
<script>
import { policy } from "@/utils/UrlApi/upload";
import { getUUID } from "@/utils";
export default {
  props: {
    value: String
  },
  computed: {
    imageUrl() {
      return this.value;
    },
    imageName() {
      if (this.value != null && this.value !== "") {
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
    fileList() {
      return [
        {
          name: this.imageName,
          url: this.imageUrl
        }
      ];
    },
    showFileList: {
      get: function() {
        return (
          this.value !== null && this.value !== "" && this.value !== undefined
        );
      },
      set: function(newValue) {}
    }
  },
  watch:{
      value:function(val) {
          if(val) {
              this.videoForm.showVideoPath = val
          }
      }
  },
  data() {
    return {
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ""
      },
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: ""
        // callback:'',
      }
    };
  },
  methods: {
    emitInput(val) {
      console.log("emitInput", val);
      this.$emit("input", val);
    },
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        layer.msg("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        layer.msg("视频大小不能超过50MB");
        return false;
      }
      let _self = this;
      return new Promise((resolve, reject) => {
        policy()
          .then(response => {
            _self.dataObj.policy = response.data.data.policy;
            _self.dataObj.signature = response.data.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.data.accessid;
            _self.dataObj.key =
              response.data.data.dir + "/" + getUUID() + "_${filename}";
            _self.dataObj.dir = response.data.data.dir;
            _self.dataObj.host = response.data.data.host;
            console.log(_self.dataObj, "-----");
            resolve(true);
          })
          .catch(err => {
            reject(false);
          });
      });
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      let fileList = [];
      fileList.push({
        name: file.name,
        url:
          this.dataObj.host +
          "/" +
          this.dataObj.key.replace("${filename}", file.name)
      });
      this.showFileList = true;
      this.videoForm.showVideoPath = fileList[0].url;
       this.emitInput(fileList[0].url);
      //前台上传地址
      //if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      //} else {
      //     layer.msg("上传失败，请重新上传");
      //}

      //后台上传地址
      //   if (res.Code == 0) {
      //     this.videoForm.showVideoPath = res.Data;
      //   } else {
      //     layer.msg(res.Message);
      //   }
    }
  },
  created() {
      this.videoForm.showVideoPath = this.value
      console.log(this.value,"-----val")
  }
};
</script>
<style lang="scss" scoped>
.albumvideo{
    
}
</style>
