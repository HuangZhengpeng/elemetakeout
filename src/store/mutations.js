import Vue from "vue";
import {
    RECIVE_ADDRESS,
    RECIVE_CATEGORYS,
    RECIVE_SHOPS,
    // RECIVE_TOKEN,
    RECIVE_USER,
    RECIVE_GOODS,
    RECIVE_INFO,
    RECIVE_RATINGS,
    DECREASE_COUNT,
    INCREASE_COUNT,
    CLEAR_CART,
} from "./mutations-types"
export default {
    [RECIVE_ADDRESS](state,{address}){
        state.address=address.data;
    },
    [RECIVE_CATEGORYS](state,{foodCategorys}){
        state.foodCategorys=foodCategorys
    },
    [RECIVE_SHOPS](state,{shops}){
        state.shops=shops
    },
    [RECIVE_USER](state,{user}){
        state.user=user
    },
    // [RECIVE_GOODS](state,{goods}){
    //     state.shop.goods=goods
    // },
    // [RECIVE_INFO](state,{info}){
    //     state.shop.info=info
    // },
    // [RECIVE_RATINGS](state,{ratings}){
    //     state.shop.ratings=ratings
    // },
    [RECIVE_GOODS](state,{goods}){
        state.goods=goods
    },
    [RECIVE_INFO](state,{info}){
        state.info=info
    },
    [RECIVE_RATINGS](state,{ratings}){
        state.ratings=ratings
    },

    [INCREASE_COUNT](state,{food}){
        if(food.count){
            food.count++;
        }else{
            // food.count=1//新增属性没有数据绑定效果
            Vue.set(food, "count", 1)//用set方法给food增加count属性，能够数据绑定
        }
    },
    [DECREASE_COUNT](state,{food}){
        if(food.count){
            food.count--
        }
    },
    [CLEAR_CART](state,{cartfoods}){
        cartfoods.forEach(cartfood => {
            cartfood.count=0
        });
    }
}