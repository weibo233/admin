<template>
  <el-aside>
    <el-menu
      :unique-opened='true'
      :default-active="getMenuDefaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#04111d"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-submenu v-for="(item,index) in routerData" :key="index" :index="item.meta.default">
          <template slot="title">
            <i :class="item.meta.icon" style="font-size:20px;margin-right:6px;"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(_item,_key,_index) in item.children" :key="_index" :index="_item.meta.default" @click="changeDefaultActive(_item.meta.default,_item.meta.childTitle)" style="text-indent:2em;"> {{_index}} <router-link :to="{name:_item.name}" tag="p">{{_item.meta.childTitle}}</router-link> </el-menu-item>
          </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
  name: "ElAsideLeft",
  data() {
    return {
      routerData: []
    };
  },
   computed:{
    ...mapGetters("layOut",["getMenuDefaultActive"])
  },
  created(){
    
    this.routerData = this.$router.options.routes.filter(item=>{
      if(item.meta.isNav){
        return item
      }
    })
    console.log(this.routerData)
  },
 
  methods: {
    ...mapActions("layOut",["setMenuDefaultActive","setChildTitle"]),
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 改变展开菜单
    changeDefaultActive(defaultActive,childTitle){
      // console.log(defaultActive,childTitle)
      this.setMenuDefaultActive(defaultActive)
      this.setChildTitle(childTitle)
    }
  }
};
</script>

<style lang="scss" scoped>

.el-menu-vertical-demo {
  height: 100%;
}
.el-menu-item {
  margin-left: 20px;
}
.el-menu-item.is-active {
  background: #117dde !important;
  border-radius: 6px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.el-submenu.is-active.is-opened /deep/ .el-submenu__title {
  color: #fff !important;
}
</style>
