import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqSearch_shops,
    reqUserinfo,
    reqGoods,
    reqInfo,
    reqRatings
} from "../api"
import {
    RECIVE_ADDRESS,
    RECIVE_CATEGORYS,
    RECIVE_SHOPS,
    RECIVE_USER,
    RECIVE_GOODS,
    RECIVE_INFO,
    RECIVE_RATINGS,
    DECREASE_COUNT,
    INCREASE_COUNT,
    CLEAR_CART,
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
    },
    //登出貌似也404了

    //请求得到goods,通过mutations改变state中的shop.goods
    // getGoods({commit}){
    //     reqGoods().then((result)=>{
    //         commit(RECIVE_GOODS,{goods:result.data})
    //     });
    // },
    async getGoods({commit}){
        const req= await reqGoods()
        commit(RECIVE_GOODS,{goods:req.data})
    },
    //请求得到info,通过mutations改变state中的shop.info
    // getInfo({commit}){
    //     reqInfo().then((result)=>{
    //         commit(RECIVE_INFO,{info:result.data})
    //     });
    // },
    async getInfo({commit}){
        const req= await reqInfo()
        commit(RECIVE_INFO,{info:req.data})
    },
    //请求得到ratings,通过mutations改变state中的shop.ratings
    // getRatings({commit}){
    //     reqRatings().then((result)=>{
    //         commit(RECIVE_RATINGS,{ratings:result.data})
    //     });
    // },
    async getRatings({commit}){
        const req= await reqRatings()
        commit(RECIVE_RATINGS,{ratings:req.data})
    },

    update_count({commit},{isAdd,food}){
        if(isAdd){
            commit(INCREASE_COUNT,{food})
        }else{
            commit(DECREASE_COUNT,{food})
        }
    },

    clearcart({commit},cartfoods){
        commit(CLEAR_CART, {cartfoods})
    }

}