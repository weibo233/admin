<template>
  <div id="entInf">
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司地址:" label-width="100px">
            <el-input v-model="Form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务范围:" label-width="100px">
            <el-input v-model="Form.business"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱:" label-width="100px">
            <el-input v-model="Form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="传真:" label-width="100px">
            <el-input v-model="Form.fax"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业名称:" label-width="100px">
            <el-input v-model="Form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号:" label-width="100px">
            <el-input v-model="Form.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话:" label-width="100px">
            <el-input v-model="Form.telephone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="edit">
        <el-col :span="24">
          <el-form-item label="公司简介:" label-width="100px">
            <quill-editor
              ref="myQuillEditor"
              v-model="Form.introduce"
              :options="editorOption"
            ></quill-editor>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="edit">
        <el-col :span="24">
          <el-form-item label="企业logo:" label-width="100px">
            <quill-editor
              ref="myQuillEditor"
              v-model="Form.logo"
              :options="editorOption"
            ></quill-editor>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="edit">
        <el-col :span="24">
          <el-form-item label="宣传视频:" label-width="100px">
            <ali-upload ref="aliUpload" @getProgress="getProgress"></ali-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align:center;">
        <el-col>
          <el-button @click="update" type="primary">更新</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getEntInf, updateEntInf } from "@/utils/UrlApi/enterpriseInf";
import aliUpload from "@/components/upload";
export default {
  components: {
    aliUpload
  },
  data() {
    return {
      editorOption: {},
      Form: {
        address: "",
        business: "",
        email: "",
        fax: "",
        introduce: "",
        logo: "",
        name: "",
        phone: "",
        strify: "",
        telephone: ""
      }
    };
  },
  methods: {
    //获取数据
    get() {
      getEntInf().then(data => {
        if (data.data.code === "0000") {
          this.Form = Object.assign(this.Form, data.data.data);
        }
      });
    },
    //修改数据
    update() {
      updateEntInf(this.Form).then(data => {
        if (data.data.code === "0000") {
          this.successMsg("修改成功");
          this.get();
        } else {
          this.errorMsg(data.data.msg);
        }
      });
    },
    //上传
    getProgress() {}
  },
  created() {
    this.get();
  }
};
</script>
<style lang="scss" scoped>
#entInf {
  .edit {
    // min-height: 500px;
    .quill-editor {
      height: 100%;
      .ql-editor {
        height: 100%;
      }
    }
  }
}
</style>
