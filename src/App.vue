<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <!-- <LayOut /> -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import LayOut from './components/layout/index'
export default {
  name: "App",
  components:{
    LayOut
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  padding:0;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding:0px !important;
}

.el-container {
  height:100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
}

.el-container:nth-child(7) .el-aside {
}
</style>
