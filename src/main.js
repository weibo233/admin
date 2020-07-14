// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import './assets/style/index.scss'
import './assets/style/default.scss'
import 'normalize.css/normalize.css'
Vue.config.productionTip = false

import $$ from 'jquery';
Vue.prototype.$$ = $$;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 主题样式
import './assets/style/element-variables.scss'
// 默认primary
Vue.use(ElementUI);
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.prototype.successMsg = function(msg){
  this.$notify({
    title: '成功',
    message: `${msg}`,
    type: 'success',
    duration: 1000
  });
}
Vue.prototype.errorMsg = function(msg){
  this.$notify({
    title: '错误',
    message: `${msg}`,
    type: 'error',
    duration: 1000
  });
}
Vue.prototype.warningMsg = function(msg){
  this.$notify({
    title: '警告',
    message: `${msg}`,
    type: 'warning',
    duration: 1000
  });
}

router.beforeEach(
  (to, from, next) => {
    // 进度条
    document.title = to.meta.documentTitle;
    console.log(to)
    NProgress.start();  
    if(to.name == "login" || to.name == "register"){
      next()
    }else{
      // 判断登陆
      if(sessionStorage.getItem("userInfo")){
        next()
      }else{
        next({name:'login'})
      }
    }
  }
)

router.afterEach(
  (to,from,next) => {
     NProgress.done(); 
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
