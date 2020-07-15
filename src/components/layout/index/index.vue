<template>
  <el-container>
    <!-- <el-header>Header</el-header> -->
    <el-container>
      <ElAside></ElAside>
      <el-main>
        <div class="tileHolder">
          <span>深圳市成效项目管理有限公司后台管理系统</span>

          <div class="tileHolderRight">
            <div class="userIcon">
              <span
                class="iconfont el-icon-s-custom"
                style="font-size:20px;float:right;height:100%;line-height:60px;"
              ></span>
              <i
                style="height:100%;font-size:20px;float:right;line-height:60px;"
                class="iconfont el-icon-caret-bottom"
              ></i>
              <span class="sp" style="float:right;">{{username}}</span>
            </div>
            <transition name="fade1" mode="out-in">
              <div class="tileHolderRightContent">
                <p @click="outLogin">登出</p>
              </div>
            </transition>
          </div>
        </div>
        <div class="navTitle">
          <router-link
            :to="{path:$route.path,query:$route.query,params:$route.params,fullPath:$route.fullPath}"
            tag="span"
          >
            <b @click="goTopDocument">{{getChildTitle}}</b>
          </router-link>
        </div>
        <div class="ElMainContent" ref="ElMainContent">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ElAside from "../aside"; //侧边栏
import { mapGetters } from "vuex";
import { Logout } from "@/utils/UrlApi/Login";
export default {
  components: {
    ElAside
  },
  data() {
    return {
      username: sessionStorage.getItem("userInfo")
    };
  },
  created() {
  },
  computed: {
    ...mapGetters("layOut", ["getChildTitle"])
  },
  methods: {
    goTopDocument() {
      this.$nextTick(() => {
        this.$refs.ElMainContent.scrollTop = 0;
      });
    },
    outLogin() {
      Logout().then(data=>{
        if(data.data.code==="0000") {
          sessionStorage.removeItem("userInfo");
          this.successMsg("登出成功")
          setTimeout(()=>{
            this.$router.push("/login");
          },1000)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.navTitle {
  padding: 0 20px;
  span {
    cursor: pointer;
    display: inline-block;
    color: #117dde;
    line-height: 54px;
    border-bottom: 3px solid #117dde;
  }
}
.tileHolder {
  padding-left: 20px;
  font-size: 30px;
  font-weight: 600;
  color: #000;
  .tileHolderRight {
    position: relative;
    float: right;
    margin-right: 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    .userIcon {
    }
  }
  
  .tileHolderRight:hover{
    .tileHolderRightContent{
      opacity: 1;
    }
  }
  .tileHolderRightContent {
    transition: .5s;
    opacity: 0;
    text-align: center;
    line-height: 45px;
    background: #fff;
    width: 80px;
    height: 45px;
    position: absolute;
    bottom: -40px;
    right: 0;
    box-shadow: 0 0 5px #000;
  }
}
.navTitle,
.tileHolder {
  height: 60px;
  background: #fff;
  line-height: 60px;
}
.navTitle {
  margin-top: 10px;
}
.ElMainContent {
  overflow: auto;
  // background-clip: content-box;
  background-color: #fff;
  height: calc(100% - 170px);
  box-sizing: border-box;
  margin: 20px;
  padding: 10px;
}

.fade1-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade1-enter,
.fade1-leave-to {
  opacity: 0;
  transition: opacity 0.3s;
}
</style>