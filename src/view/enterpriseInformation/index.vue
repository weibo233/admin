<template>
  <div id="entInf">
    <el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="公司信息" name="first">
          <el-table :data="Form">
            <el-table-column label="公司名称" prop="name"></el-table-column>
            <el-table-column label="公司地址" prop="address"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="传真" prop="fax"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column
              label="联系电话"
              prop="telephone"
            ></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope" fixed="right">
                <el-button
                  @click="edit(scope.row)"
                  type="primary"
                  size="small"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="公司主体信息" name="second">
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
          <!-- <el-row class="edit">
            <el-col :span="24">
              <el-form-item label="业务范围:" label-width="100px">
                <quill-editor
                  ref="business"
                  v-model="subForm.business"
                  :options="editorOption"
                ></quill-editor>
              </el-form-item>
            </el-col>
          </el-row> -->
          <!-- <el-row class="edit">
            <el-col :span="24">
              <el-form-item label="企业logo:" label-width="100px">
                <single-upload
                  v-model="subForm.logo"
                  :value="subForm.logo"
                  @input="setLogo"
                ></single-upload>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row class="edit">
            <el-col :span="24">
              <el-form-item label="宣传视频:" label-width="100px">
                <video-upload
                  v-model="subForm.strify"
                  :value="subForm.strify"
                ></video-upload>
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
    <el-dialog title="编辑公司信息"  :visible.sync="dialogVisible">
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称:" label-width="100px">
              <el-input v-model="willUpdate.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地址:" label-width="100px">
              <el-input v-model="willUpdate.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱:" label-width="100px">
              <el-input v-model="willUpdate.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真:" label-width="100px">
              <el-input v-model="willUpdate.fax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号:" label-width="100px">
              <el-input v-model="willUpdate.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:" label-width="100px">
              <el-input v-model="willUpdate.telephone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label-width="250px">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      idx: "", //公司下标
      activeName: "first",
      dialogVisible: false,
      Form: [],//公司信息表格数据
      willUpdate: {
        address: "", //公司地址
        company_id: "", //公司标识
        email: "", //公司邮箱
        fax: "", //传真
        name: "", //企业名称
        phone: "", //企业手机号
        telephone: "" //联系电话
      },
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
      console.log(tab, 111);
    },
    edit(item) {
      console.log(item,"item")
      // this.dialogVisible = true
      this.willUpdate = item
      this.dialogVisible = true
    },
    del() {

    },
    submit() {
      this.updateCompany();//更改公司信息
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
    //修改公司数据
    updateCompany() {
      updateEntInf(this.willUpdate).then(data => {
        if (data.data.code === "0000") {
          this.dialogVisible = false
          this.successMsg("修改成功");
          this.get();
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
