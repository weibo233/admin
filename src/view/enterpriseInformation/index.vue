<template>
  <div id="entInf">
    <el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="公司主体信息" name="first">
          <el-row
            v-for="item in Form"
            :key="item.phone"
            style="margin-bottom:50px;border-bottom:1px dashed #000;"
          >
            <!-- 公司信息 -->
            <el-col :span="24">
              <el-form-item label="编辑公司:" label-width="100px">
                <el-button
                  type="primary"
                  @click="
                    item.disabled = false;
                    getUpdateCompany(item);
                  "
                  :disabled="idx === '' ? false : true"
                  >编辑公司信息</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称:" label-width="100px">
                <el-input v-model="item.name" :disabled="item.disabled">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司地址:" label-width="100px">
                <el-input
                  v-model="item.address"
                  :disabled="item.disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱:" label-width="100px">
                <el-input
                  v-model="item.email"
                  :disabled="item.disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="传真:" label-width="100px">
                <el-input
                  v-model="item.fax"
                  :disabled="item.disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号:" label-width="100px">
                <el-input
                  v-model="item.phone"
                  :disabled="item.disabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话:" label-width="100px">
                <el-input
                  v-model="item.telephone"
                  :disabled="item.disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align:center;">
            <el-col>
              <el-button @click="updateCompany" type="primary"
                >更新公司信息</el-button
              >
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <!-- 公司主体信息 -->
          <el-row class="edit">
            <el-col :span="24">
              <el-form-item label="公司简介:" label-width="100px">
                <quill-editor
                  ref="introduce"
                  v-model="subForm.introduce"
                  :options="editorOption"
                ></quill-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="edit">
            <el-col :span="24">
              <el-form-item label="企业文化:" label-width="100px">
                <quill-editor
                  ref="culture"
                  v-model="subForm.culture"
                  :options="editorOption"
                ></quill-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="edit">
            <el-col :span="24">
              <el-form-item label="业务范围:" label-width="100px">
                <quill-editor
                  ref="business"
                  v-model="subForm.business"
                  :options="editorOption"
                ></quill-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="edit">
            <el-col :span="24">
              <el-form-item label="企业logo:" label-width="100px">
                <single-upload
                  v-model="subForm.logo"
                  :value="subForm.logo"
                  @input="setLogo"
                ></single-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="edit">
            <el-col :span="24">
              <el-form-item label="宣传视频:" label-width="100px">
                <video-upload v-model="subForm.strify" :value="subForm.strify"></video-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align:center;">
            <el-col>
              <el-button @click="updateSubInfData" type="primary"
                >更新</el-button
              >
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import {
  getAllEntInf,
  updateEntInf,
  getSubInf,
  updateSubInf
} from "@/utils/UrlApi/enterpriseInf";
import singleUpload from "@/components/upload/singleUpload";
import videoUpload from "@/components/upload/videoUpload";
export default {
  components: {
    singleUpload,
    videoUpload
  },
  data() {
    return {
      editorOption: {},
      idx: "", //公司下标
      activeName: "first",
      Form: [
        {
          address: "", //公司地址
          company_id: "", //公司标识
          email: "", //公司邮箱
          fax: "", //传真
          name: "", //企业名称
          phone: "", //企业手机号
          telephone: "" //联系电话
        }
      ],
      //将要更改的公司信息
      updateCompanyData: {},
      subForm: {
        business: "", //业务范围
        culture: "", //企业文化
        introduce: "", //公司简介
        logo: "", //logo
        name: "", //名称
        strify: "", //宣传视频
        subject_id: "" //标识
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //获取公司信息
    get() {
      getAllEntInf().then(data => {
        if (data.data.code === "0000") {
          this.Form = data.data.data.map((item, idx) => {
            item.disabled = true;
            item.btndis = idx;
            return item;
          });
        }
      });
    },
    //获取将要修改的公司信息
    getUpdateCompany(item) {
      this.updateCompanyData = item;
      this.idx = item.btndis;
      this.successMsg("每次编辑只能编辑一个公司，提交后可再次编辑");
      console.log(this.updateCompanyData);
    },
    //修改公司数据
    updateCompany() {
      this.updateCompanyData;
      updateEntInf({
        address: this.updateCompanyData.address,
        email: this.updateCompanyData.email,
        fax: this.updateCompanyData.fax,
        name: this.updateCompanyData.name,
        phone: this.updateCompanyData.phone,
        telephone: this.updateCompanyData.telephone
      }).then(data => {
        if (data.data.code === "0000") {
          this.successMsg("修改成功");
          this.get();
          this.idx = "";
        } else {
          this.errorMsg(data.data.msg);
        }
      });
    },
    //获取公司主体信息
    getSubInfData() {
      getSubInf().then(res => {
        this.subForm = Object.assign(this.subForm, res.data.data);
      });
    },
    //修改公司主体信息
    updateSubInfData() {
      updateSubInf(this.subForm).then(data => {
        if (data.data.code === "0000") {
          this.successMsg("修改成功");
          this.getSubInfData();
        } else {
          this.errorMsg(data.data.msg);
        }
      });
    },
    setLogo(e) {
      this.subForm.logo = e;
    },
    //上传
    getProgress() {}
  },
  created() {
    this.get();
    this.getSubInfData();
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
