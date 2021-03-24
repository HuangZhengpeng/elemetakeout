/* 
包含n个接口请求函数的模块
每个函数返回的都是promise
*/
import ajax from './ajax'

const BASE = '/api'//仅在开发的时候代理，打包的时候写空字符串就可以

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
    // console.log(name,pwd, captcha);
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
    headers: {
        needToken: true
    }
})

//10. 登出404
export const reqLogout=()=>ajax.get(BASE+'/logout')

//测试post
export const reqtest=(name, pwd)=>ajax.post(BASE+"/test_post",{name, pwd})

//mock数据
export const reqGoods=()=>ajax('/goods').then(response=>response)

export const reqRatings=()=>ajax('/ratings').then(response=>response)

export const reqInfo=()=>ajax('/info').then(response=>response)
