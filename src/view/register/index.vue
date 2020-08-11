<template>
  <div class="login">
    <div class="formInput">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="relus"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            type="password"
            v-model.number="ruleForm.oldPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            type="password"
            v-model.number="ruleForm.newPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="verifyPassword">
          <el-input
            type="password"
            v-model.number="ruleForm.verifyPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')" type="primary"
            >修改密码</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <!-- <el-button @click="goLogin" type="warning">去登陆</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { Register as RegisterUp } from '@/utils/UrlApi/register'
import { updatePwd } from "@/utils/UrlApi/Login";
import md5 from "js-md5"
export default {
  name: "register",
  data() {
    return {
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        verifyPassword: ""
      },
      relus: {
        oldPassword: [
          {
            validator: this.validateoldPassword,
            required: true,
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            validator: this.validatenewPassword,
            required: true,
            trigger: "blur"
          }
        ],
        verifyPassword: [
          {
            validator: this.validateverifyPassword,
            required: true,
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updatePwd({
            oldPassword:md5(this.ruleForm.oldPassword.toString()),
            newPassword:md5(this.ruleForm.newPassword.toString()),
            verifyPassword:md5(this.ruleForm.verifyPassword.toString())
          })
            .then(data => {
              if(data.data.code === "0000") {
                 this.successMsg("修改成功");
                 this.ruleForm.oldPassword = "";
                 this.ruleForm.newPassword = "";
                 this.ruleForm.verifyPassword = "";
                 this.$router.push("/");
              }else{
                this.errorMsg(data.data.msg)
              }
            })
            .catch(err => {
              this.errorMsg(err.msg);
            });
        } else {
          // 验证不通过
          console.log("error submit!!");
          return false;
        }
      });
    },
    goLogin() {
      this.$router.push({ name: "login" });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    validateoldPassword(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    },
    validatenewPassword(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if ((value + "").length < 6) {
        callback(new Error("密码长度最少为6位!"));
      } else {
        callback();
      }
    },
    validateverifyPassword(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #fff;
  color: #fff;
  // background-image: url(../../assets/images/loginBackground.jpg);
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .formInput {
    width: 600px;
    height: 300px;
    // transform: translateY(-200px);
  }
}
</style>
