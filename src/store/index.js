import Vue  from "vue";
import vuex from "vuex";
Vue.use(vuex)
import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";


export default new vuex.Store({
    state,
    getters,
    actions,
    mutations
})