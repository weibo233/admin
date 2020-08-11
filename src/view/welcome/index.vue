<template>
<div class="box" @click="goHome">
  <span class="welcome">
    Welcome
  </span>
</div>
</template>

<script>
import {mapActions,mapState,mapGetters} from 'vuex'

  export default {
    name:'welcome',
    created(){
        this.setMenuDefaultActive(this.$route.meta.default)
    },
    computed:{
      ...mapGetters('layOut',["getMenuDefaultActive"])
    },
    methods:{
    ...mapActions("layOut",["setMenuDefaultActive"]),
      goHome(){
        this.setMenuDefaultActive("1-1")
        this.$router.push({name:'enterpriseInformation'})
      }
    }
  }
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.welcome{
  font-size:50px;
}
</style>