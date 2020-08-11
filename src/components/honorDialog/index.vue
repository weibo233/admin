<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form>
      <el-row>
        <el-col :span="12">
          <el-form-item label="标题:" label-width="100px">
            <el-input v-model="DetailForm.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布时间:" label-width="100px">
            <el-date-picker
              v-model="DetailForm.releaseTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:SS"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
           <el-col :span="12">
            <el-form-item label="图片:" label-width="100px">
              <single-upload
                v-model="DetailForm.cover"
                :value="DetailForm.cover"
              ></single-upload>
            </el-form-item>
          </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="updateDetailData">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDetail, getPage, updateDetail } from "@/utils/UrlApi/article";
import singleUpload from "@/components/upload/singleUpload";
export default {
  components:{
    singleUpload
  },
  props: {
    title: String,
    dialogVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
        editorOption:{},
        articleId:"",//文章ID
        DetailForm:{

        },
    };
  },
  methods: {
    submit() {
      this.$emit("deter");
    },
    handleClose() {
      this.$emit("cancel");
    },
    getarticleId(articleId){
        this.articleId = articleId
    },
    //更改
    updateDetailData() {
       this.$emit('updateDetail',this.DetailForm)
    }
  },
  watch:{
    //获取单个详情接口
      articleId:function(val){
          if(val) {
              getDetail({
                  articleId:this.articleId
              }).then(res=>{
                  this.DetailForm = res.data.data
              })
          }
      }
  },
  created() {
      // console.log(this.articleId)
  }
};
</script>
<style lang="scss" scoped></style>
