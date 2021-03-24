import Vue from 'vue'
import App from './App'
import router from "./router"
import store from "./store"
import { Button } from "mint-ui";
Vue.component(Button.name, Button);//全局添加mt-button标签
import "./mock/mockServer"//引入即可，文件中没有向外暴露任何东西

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
