/* 
包含n个接口请求函数的模块
每个函数返回的都是promise
*/
import ajax from './ajax'

const BASE = '/api'

//1. 根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax.get(
    BASE + `/position/${latitude},${longitude}`
)

//2. 获取食品分类列表
export const reqCategorys = () => ajax({
    method: 'GET',
    url: BASE + '/index_category',
    headers: {
        needToken: true
    }
})

//3. 根据经纬度获取商铺列表
export const reqShops = ({ latitude, longitude }) => ajax({
    method: 'GET',
    url: BASE + '/shops',
    params: { latitude, longitude },
    headers: {
        needToken: true
    }
})


//4. 根据经纬度和关键字搜索商铺列表
export const reqSearch_shops = (latitude, longitude, keyword) => ajax({
    method: 'GET',
    url: BASE + '/search_shops',
    params: { keyword, geohash:latitude+","+longitude },
    headers: {
        needToken: true
    }
})

//5. 获取一次性验证码
// export const reqCaptcha=()=>ajax.get(BASE+"/captcha")

//6. 用户名密码登陆
export const reqLogin_pwd = ({name, pwd, captcha}) => {
    console.log(name,pwd, captcha);
    return ajax({
        method: 'POST',
        url: BASE + '/login_pwd',
        data: { name, pwd, captcha },
    })
}
//7. 发送短信验证码
export const reqSendcode=(phone)=>ajax({
    method:"GET",
    url:BASE+"/sendcode",
    params:{phone}
})

//8.手机号验证码登陆
export const reqLogin_sms=(phone,code)=>ajax({
    method:"POST",
    url:BASE+"/login_sms",
    data:{phone, code}
})

//9.根据会话获取用户信息404
export const reqUserinfo=()=>ajax({
    method:"GET",
    url:BASE+"/userinfo",
})

//10. 登出404
export const reqLogout=()=>ajax.get(BASE+'/logout')

//测试post
export const reqtest=(name, pwd)=>ajax.post(BASE+"/test_post",{name, pwd})

// import ajax from "./ajax";
// const BASE="/api"
// export const reqAddress=({longitude, latitude})=>{
//     return ajax(BASE+"/position/"+latitude+","+longitude)
// };

// export const reqCategorys=()=>{
//     return ajax(BASE+"/index_category")
// };

// export const reqShops=({longitude, latitude})=>{
//     return ajax(BASE+"/shops",{latitude, longitude})
// }

// //验证码
// export const reqCaptcha=()=>{
//     return ajax(BASE+"/captcha")
// };
// //密码登录
// export const reqLoginpwd=({name, pwd, captcha})=>{
//     return ajax(BASE+"/login_pwd",{name, pwd, captcha}, "post")
// };

// //测试
// export const reqtest=({name, pwd})=>{
//     return ajax(BASE+"/test_post",{name, pwd}, "post")
// };
// export const reqtest0=({name, pwd})=>{
//     return ajax(BASE+"/test_get",{name, pwd}, "get")
// };