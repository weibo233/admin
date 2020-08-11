<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose"
  >
    <el-form>
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
        <el-col :span="24">
          <el-form-item label="上传封面:" label-width="100px">
            <upload v-model="DetailForm.cover"></upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label-width="100px" label="简介:">
            <el-input v-model="DetailForm.introduce" type="textarea"></el-input>
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
        <el-col :span="24">
          <el-form-item label="内容:" label-width="100px">
            <quill-editor
              ref="business"
              v-model="DetailForm.content"
              :options="editorOption"
            ></quill-editor>
            <!-- <editor v-model="DetailForm.content"></editor> -->
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
import upload from "@/components/upload/upload";
import editor from "@/components/Editor";
export default {
  props: {
    title: String,
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    editor,
    upload
  },
  data() {
    // 工具栏配置
    // const toolbarOptions = [
    //   ["bold", "italic", "underline", "strike"], // toggled buttons
    //   ["blockquote", "code-block"],

    //   [{ header: 1 }, { header: 2 }], // custom button values
    //   [{ list: "ordered" }, { list: "bullet" }],
    //   [{ script: "sub" }, { script: "super" }], // superscript/subscript
    //   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    //   [{ direction: "rtl" }], // text direction

    //   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    //   [{ header: [1, 2, 3, 4, 5, 6, false] }],

    //   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    //   [{ font: [] }],
    //   [{ align: [] }],
    //   ["clean"] // remove formatting button
    // ];
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向

            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式

            ["clean"] //清除字体样式
            // ['image','video']        //上传图片、上传视频
          ]
        }
      },
      articleId: "", //文章ID
      DetailForm: {}
    };
  },
  methods: {
    submit() {
      this.$emit("deter");
    },
    handleClose() {
      this.$emit("cancel");
    },
    getarticleId(articleId) {
      this.articleId = articleId;
    },
    //更改
    updateDetailData() {
      this.$emit("updateDetail", this.DetailForm);
    }
  },
  watch: {
    //获取单个详情接口
    articleId: function(val) {
      if (val) {
        getDetail({
          articleId: this.articleId
        }).then(res => {
          this.DetailForm = res.data.data;
        });
      }
    }
  },
  created() {
    console.log(this.articleId);
  }
};
</script>
<style lang="scss" scoped></style>
