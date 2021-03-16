import {
    RECIVE_ADDRESS,
    RECIVE_CATEGORYS,
    RECIVE_SHOPS,
    // RECIVE_TOKEN,
    RECIVE_USER,
} from "./mutations-types"
export default {
    [RECIVE_ADDRESS](state,{address}){
        // console.log(address.data);
        state.address=address.data;
    },
    [RECIVE_CATEGORYS](state,{foodCategorys}){
        state.foodCategorys=foodCategorys
    },
    [RECIVE_SHOPS](state,{shops}){
        state.shops=shops
    },
    // [RECIVE_TOKEN](state,{token}){
    //     state.user.token=token
    // }
    [RECIVE_USER](state,{user}){
        state.user=user
    }
}