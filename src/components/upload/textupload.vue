<template> 
  <div>
    <el-upload
      :action="dataObj.host"
      :data="dataObj"
      list-type="picture"
      :multiple="false" :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview">
      <rtp-row>
          <rtp-col  :span="24">
              <a :href="value">{{value}}</a>
          </rtp-col>
      </rtp-row>
      <el-button size="small" type="success">点击更换</el-button>

      <div slot="tip" class="el-upload__tip"></div>
    </el-upload>
  </div>
</template>
<script>
import { policy } from "@/utils/UrlApi/upload";
import { getUUID } from '@/utils'

  export default {
    name: 'singleUpload',
    props: {
      value: String
    },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
        }
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',
          // callback:'',
        },
        dialogVisible: false
      };
    },
    methods: {
      emitInput(val) {
        console.log("emitInput",val)
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        console.log("handleRemove")
        this.emitInput('');
      },
      handlePreview(file) {
        console.log("handlePreview")
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        let _self = this;
        return new Promise((resolve, reject) => {
          policy().then(response => {
            _self.dataObj.policy = response.data.data.policy;
            _self.dataObj.signature = response.data.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.data.accessid;
            _self.dataObj.key = response.data.data.dir + '/'+getUUID()+'_${filename}';
            _self.dataObj.dir = response.data.data.dir;
            _self.dataObj.host = response.data.data.host;
            console.log(_self.dataObj,"-----")
            resolve(true)
          }).catch(err => {
            reject(false)
          })
        })
      },
      handleUploadSuccess(res, file) {
        this.successMsg("上传成功")
        console.log("上传成功...")
        this.showFileList = true;
        this.fileList.pop();
        this.fileList.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.key.replace("${filename}",file.name) });
        this.emitInput(this.fileList[0].url);
      }
    }
  }
</script>
<style lang="scss" scoped>

    a{
        display: block;
        width: 100%;
        height: 100%;
    }

</style>


