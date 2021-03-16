import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqSearch_shops,
    reqUserinfo
} from "../api"
import {
    RECIVE_ADDRESS,
    RECIVE_CATEGORYS,
    RECIVE_SHOPS,
    // RECIVE_TOKEN,
    RECIVE_USER,
    // RECIVE_CAPTCHA,
} from "./mutations-types"
export default {
    //得到地址，然后通过mutations控制state中的address
    async getaddress({commit,state}){
        const address=await reqAddress(state.longitude, state.latitude)//.then(response=>response)
        commit(RECIVE_ADDRESS,{address})
    },

    //记录user
    recorduser({commit},user){
        commit(RECIVE_USER,{user})
    },

    //得到主页Categorys列表，然后通过mutations控制state中的foodCategorys
    async getcategorys({commit}){
        const category= await reqCategorys()
        commit(RECIVE_CATEGORYS,{foodCategorys:category.data})
    },

    //得到主页shops列表，然后通过mutations控制state中的shops
    async getshops({commit,state}){
        const shops= await reqShops({ latitude:state.latitude, longitude:state.longitude })
        // console.log(shops);
        commit(RECIVE_SHOPS,{shops:shops.data})
    },

    //搜索列表，404了
    async getsearch({commit,state},keyword){
        const searchshops=await reqSearch_shops(state.latitude, state.longitude, keyword)
        console.log(searchshops);
        
    },

    //得到用户信息，404了
    async getUserinfo(){
        const Userinfo= await reqUserinfo()
        console.log(Userinfo);
    }
    //登出貌似也404了

}