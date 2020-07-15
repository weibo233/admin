<template>
  <div class="login" @dblclick.prevent="isDownZip = !isDownZip" :style="bg">
    <a
      v-show="false"
      ref="downFile"
    ></a>

    <div class="container">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="relus"
      >
        <el-form-item label-width="0" prop="name">
          <el-input
            type="text"
            v-model="ruleForm.name"
            placeholder="username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label-width="0" prop="captcha">
              <el-input
                v-model="ruleForm.captcha"
                placeholder="captcha"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <img
              src="http://qiuchl.natapp1.cc/framework/all/captcha"
              style="cursor:pointer;height:40px;width:150px;"
              ref="captcha"
              alt="不支持图片验证码"
              @click="_getCaptcha"
            />
          </el-col>
        </el-row>
        <el-form-item label-width="0">
          <el-button type="primary" @click="submitForm('ruleForm')"
          class="submit"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Transition from "@/components/transition";
import { Login } from "@/utils/UrlApi/Login";
export default {
  components: {
    Transition
  },
  data() {
    return {
      isDownZip: false,
      bg: {},
      ruleForm: {
        name: "admin",
        password: "",
        captcha: ""
      },
      relus: {
        name: [
          { validator: this.validateUsername, required: true, trigger: "blur" }
        ],
        password: [
          { validator: this.validatePassword, required: true, trigger: "blur" }
        ],
        captcha: [
          { validator: this.validateCaptcha, required: true, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.bg.backgroundImage =
      "url(" +
      require("@/assets/images/bg0" + new Date().getDay() + ".jpg") +
      ")";
  },
  methods: {
    //更换验证码
    _getCaptcha() {
      let timer = new Date().getTime();
      this.$refs.captcha.src = `http://qiuchl.natapp1.cc/framework/all/captcha?t=${timer}`;
    },
    downZip() {
      this.$refs.downFile.click();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Login(this.ruleForm)
            .then(data => {
              if (data.data.code === "0000") {
                this.successMsg("正在登陆");
                let { userName } = data.data.data;
                setTimeout(()=>{
                  sessionStorage.setItem("userInfo", userName);
                  this.$router.push("/");
                },1000)
              } else {
                this.errorMsg(data.data.msg);
                this._getCaptcha()
              }
            })
            .catch(err => {
              throw new Error(err);
              this.errorMsg(err);
              this._getCaptcha()
            });
        } else {
          return false;
        }
      });
    },
    goRegister() {
      this.$router.push({ name: "register" });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    validateUsername(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if ((value + "").length < 3) {
          callback(new Error("账号长度最少为3位"));
        } else {
          if (this.ruleForm.username !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        }
      }
    },
    validatePassword(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if ((value + "").length < 4) {
        callback(new Error("密码长度最少为4位!"));
      } else {
        callback();
      }
    },
    validateCaptcha(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  .container {
    background: rgba(255, 255, 255, 0.5);
    width: 320px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
    >>> .el-input__inner {
      background-color: transparent;
      color: #fff;
      outline: #fff;
      border-color: #fff;
    }
    .submit{
      width: 320px;
    }
  }
}
</style>
