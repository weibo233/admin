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
      <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model.number="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.number="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.number="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" @keyup.enter.native="submitForm('ruleForm')" v-model.number="ruleForm.password2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')" type="primary">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button @click="goLogin" type="warning">去登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Register as RegisterUp } from '@/utils/UrlApi/register'
export default {
  name:'register',
  data() {
    return {
      ruleForm: {
        name: "",
        username: "",
        password: "",
        password2: ""
      },
      relus: {
       name:[
          { validator: this.validateName, required: true, trigger: "blur" }
        ],
        username: [
          { validator: this.validateUsername, required: true, trigger: "blur" }
        ],
        password: [
          { validator: this.validatePassword, required: true, trigger: "blur" }
        ],
        password2: [
          { validator: this.validatePassword2, required: true, trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.setRegister()
        } else {
          // 验证不通过
          console.log("error submit!!");
          return false;
        }
      });
    },
    setRegister:function(){
      RegisterUp(this.ruleForm).then(data=>{
        console.log(data.data.errCode == '400')
        if(data.data.errCode == '400'){
          console.log(data.data)
          this.errorMsg(data.data.errMsg)
        }else{
          this.goLogin()
          this.successMsg(data.data.errMsg)
        }
      }).catch(err=>{
        // this.errMsg(err.data.status)
      })
    },
    goLogin(){
      this.$router.push({name:'login'})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     validateName(rule, value, callback){
      if(value === ""){
        callback(new Error("请输入用户名"));
      }else if((value+"").length <3){
        callback(new Error("用户名长度最少3位"));
      }else{
        callback()
      }
    },
    validateUsername(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if ((value + "").length < 6) {
          callback(new Error("账号长度最少为6位"));
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
      } else if ((value + "").length < 6) {
        callback(new Error("密码长度最少为6位!"));
      } else {
        callback();
      }
    },
    validatePassword2(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
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
  background: #ccc;
  color: #fff;
  background-image: url(../../assets/images/loginBackground.jpg);
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .formInput {
    width: 600px;
    height: 300px;
    transform: translateY(-200px);
  }
}
</style>