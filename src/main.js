import Vue from 'vue'
import App from './App'
import router from "./router"
import store from "./store"
// Vue.config.productionTip = false
import { Button } from "mint-ui";
// Vue.component(MessageBox.name, MessageBox);
Vue.component(Button.name, Button);//mt-button

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
