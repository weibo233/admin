<template>
  <div id="getDetail">
    <el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="招标公告" name="first">
          <el-row>
            <el-col :span="12">
              <el-form-item label="作者:" label-width="100px">
                <el-input v-model="DetailForm.author"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标题:" label-width="100px">
                <el-input v-model="DetailForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="100px" label="简介:">
                <el-input v-model="DetailForm.introduce"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="发布时间:" label-width="100px">
                <el-date-picker
                  v-model="DetailForm.releaseTime"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="内容:" label-width="100px">
                <quill-editor
                  ref="introduce"
                  v-model="DetailForm.content"
                  :options="editorOption"
                ></quill-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="文章封面:" label-width="100px">
                <single-upload
                  v-model="DetailForm.cover"
                  :value="DetailForm.cover"
                ></single-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="图片集:" label-width="100px">
                <multiUpload
                  v-model="picturesArr"
                  :value="picturesArr"
                ></multiUpload>
              </el-form-item>
            </el-col>
          </el-row> -->
        </el-tab-pane>
        <el-tab-pane label="资料下载" name="second"></el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import { getDetail } from "@/utils/UrlApi/article";
import singleUpload from "@/components/upload/singleUpload";
import multiUpload from "@/components/upload/multiUpload";
export default {
  components: {
    singleUpload,
    multiUpload
  },
  data() {
    return {
      activeName: "first",
      editorOption: {},
      picturesArr:[],
      DetailForm: {
        articleId: "102312312", //文章ID
        author: "", //作者
        categoryId: "", //分类ID    6-招标公告，7-资料下载，9-荣誉证书，10-工程案例，12-行政法规，13-建设法律，14-国务院文件，15-部门规章，
        content: "", //内容
        cover: "", //封面地址
        introduce: "", //简介
        pictures: "", //图片集地址
        releaseTime: "", //发布时间
        title: "" //标题
      }
    };
  },
  methods: {
    handleClick() {},
    getDetailData() {
      getDetail(this.DetailForm).then(res => {
        this.DetailForm = res.data.data;
      });
    }
  },
  watch:{
      "DetailForm.pictures":function(val){
          if(val) {
              this.picturesArr = this.DetailForm.pictures.split(',')
          }
      }
  },
  created() {
    this.getDetailData();
  }
};
</script>
<style lang="scss" scoped></style>
