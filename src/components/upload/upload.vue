<template> 
  <div>
    <el-upload
     v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
      :action="dataObj.host"
      :data="dataObj"
      list-type="text"
      :multiple="false" :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview">
      <el-button size="small" type="success">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传doc/world文件，且不超过10MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
        <img :src="fileList[0].url" alt="">
    </el-dialog>
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
        loading:false,
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
        this.loading = true
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
        this.loading = false
      }
    }
  }
</script>
<style lang="scss" scoped>
.el-dialog{
  .el-dialog__body{
    background: brown;
    img{
      width: 100%;
    }
  }
}
</style>


