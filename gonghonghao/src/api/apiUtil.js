
import $ from 'jquery';
import app from '../main.js'
import url from './config.js'
import commonUtil from '@/assets/js/commonUtil.js';

var TUrl = url.url

const generateApiMap = (map) => {
    let facade = {}
    for (var key in map) {
        facade[key] = toMethod(map[key])
    }
    return facade

}

const toMethod = (options) => {
    options.method = options.method || 'post'
    return (params = {}, attachedParams) => {
        params = $.extend(params, attachedParams)
        return sendApiInstance(options.method, options.url, options.file, params)
    }
}
const sendApiInstance = (method, url, file, params) => {
    var token = localStorage.getItem('ende-ecology-toke')
    //校验是否需要刷新token
    checkLoginStatus();
    if (file == 'file') {
        return $.ajax({
            url:  TUrl + url,
            method: method,
            data: params,
            dataType: 'json',//返回数据类型json
            timeout: 10000,//10秒超时
            cache: false, // 禁用缓存
            headers: {
                "authentication": token
            },
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code === 402) {
                    //登录失效
                    localStorage.setItem("ende-ecology-toke", "")
                    localStorage.setItem("ende-ecology-userinfo", "")
                    localStorage.setItem("ende-ecology-freshTime", "");
                    
                    var shareUserId = commonUtil.parseUrlParams('shareUserId')
                    var productId = commonUtil.parseUrlParams('productId')
                    window.location.href = 'http://shengtai.ende168.com/?shareUserId='+shareUserId+'&productId='+productId+'#/login'
                } else {
                    return res
                }
            },
            error: function () {
                app.$toast({
                    message: '请求异常!',
                    type: 'fail'
                });
            }
    
        })
    } else if (file == 'json') {
        return $.ajax({
            url: TUrl + url,
            method: method,
            data: JSON.stringify(params),
            dataType: 'json',//返回数据类型json
            timeout: 10000,//10秒超时
            cache: false, // 禁用缓存
            headers: {
                'content-type': 'application/json',
                "authentication": token
            },
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code === 402) {
                    //登录失效
                    localStorage.setItem("ende-ecology-toke", "")
                    localStorage.setItem("ende-ecology-userinfo", "")
                    localStorage.setItem("ende-ecology-freshTime", "");
                    
                    var shareUserId = commonUtil.parseUrlParams('shareUserId')
                    var productId = commonUtil.parseUrlParams('productId')
                    window.location.href = 'http://shengtai.ende168.com/?shareUserId='+shareUserId+'&productId='+productId+'#/login'
                } else {
                    return res
                }
            },
            error: function () {
                app.$toast({
                    message: '请求异常!',
                    type: 'fail'
                });
            }
    
        })

    } else {
        return $.ajax({
            url: TUrl + url,
            method: method,
            data: params,
            dataType: 'json',//返回数据类型json
            timeout: 10000,//10秒超时
            cache: false, // 禁用缓存
            headers: {
                "authentication": token
            },
            traditional: true,
            success: function (res) {
                if (res.code === 402) {
                    //登录失效
                    localStorage.setItem("ende-ecology-toke", "")
                    localStorage.setItem("ende-ecology-userinfo", "")
                    localStorage.setItem("ende-ecology-freshTime", "");
                    
                    var shareUserId = commonUtil.parseUrlParams('shareUserId')
                    var productId = commonUtil.parseUrlParams('productId')
                    window.location.href = 'http://shengtai.ende168.com/?shareUserId='+shareUserId+'&productId='+productId+'#/login'

                } else {
                    return res
                }
            },
            error: function () {
                app.$toast({
                    message: '请求异常!',
                    type: 'fail'
                });

            }
    
        })
    }
}

/**
 * 校验token状态,超过一半的超时时间,主动刷新
 */
function checkLoginStatus() {
    let token = localStorage.getItem("ende-ecology-toke");
    let freshTime = localStorage.getItem("ende-ecology-freshTime");
    if (token && new Date().getTime() - freshTime > url.LOGIN_TIMEOUT/2 * 24 * 60 * 60 * 1000 && new Date().getTime() - freshTime < url.LOGIN_TIMEOUT * 24 * 60 * 60 * 1000) {
        $.post(TUrl + 'app/user/token/refresh',function (res) {
            if(res.code == 200){
                //用户已经是系统用户了
                //返回用户信息以及token
                localStorage.setItem("ende-ecology-toke", res.data.token)
                localStorage.setItem("ende-ecology-userinfo",JSON.stringify(res.data.user))
                localStorage.setItem("ende-ecology-freshTime",new Date().getTime());//获取到token的时间戳
            }
        });

    }
}

export default {
    generateApiMap
}
