<template>
  <div>
    <div class="oss_file">
      <input
        type="file"
        name="file"
        accept="image/png,image/gif,image/jpeg"
        :id="id"
        :multiple="multiple"
        @change="doUpload"
      />
    </div>
  </div>
</template>
<script>
import { upLoad } from "@/utils/UrlApi/upload";
import request from "../../utils/HttpServe";
export default {
  props: {
    multiple: {
      type: Boolean,
      twoWay: false
    },
    id: {
      type: String,
      twoWay: false
    },
    url: {
      type: Array,
      twoWay: true
    }
  },
  data() {
    return {
      region: "Your oss Region",
      bucket: "Bucket Name"
    };
  },
  methods: {
    postAli(url,param) {
      return request({
        url:url,
        method:'post',
        param
      })
    },
    doUpload(e) {
      const _this = this;
      upLoad().then(result => {
        let {accessid,dir,expire,host,policy,signature} = result.data.data
        const photo = window.URL.createObjectURL(e.target.files[0]) //获取图片对象
        const photoName = photo.name//原图的名称
        const timer = new Date().getTime()
        const key = `photo${timer}`;//存储到OSS的名称，确保唯一性
        const OSSAccessKeyId = accessid
        const url = host

        let param = new FormData(); 
        param.append('name',`${photoName}`);
        param.append('key',`${key}`);
        param.append('policy',`${policy}`);
        param.append('OSSAccessKeyId',`${OSSAccessKeyId}`);
        param.append('success_action_status',200);
        param.append('signature',`${signature}`);
        param.append('file',photo);

        console.log(param.get('file'),"----param")
        // this.postAli(url,param).then(res=>{
        //     console.log(res,'------res')
        // }).catch(error=>{
        //     console.log(error,"----error")
        // })

        // const client = new OSS.Wrapper({
        //   region: _this.region,
        //   accessKeyId: result.data.token.AccessKeyId,
        //   accessKeySecret: result.data.token.AccessKeySecret,
        //   stsToken: result.data.token.SecurityToken,
        //   bucket: _this.bucket
        // });
        // const files = document.getElementById(_this.id);
        // if (files.files) {
        //   const fileLen = document.getElementById(_this.id).files;
        //   const resultUpload = [];
        //   for (let i = 0; i < fileLen.length; i++) {
        //     const file = fileLen[i];
        //     const storeAs = file.name;
        //     client
        //       .multipartUpload(storeAs, file, {})
        //       .then(results => {
        //         if (results.url) {
        //           resultUpload.push(results.url);
        //         }
        //       })
        //       .catch(err => {
        //         console.log(err);
        //       });
        //   }
        //   _this.url = resultUpload;
        // }
      });
    }
  }
};
</script>
<style scoped></style>
