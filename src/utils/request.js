/*
 * @Author: your name
 * @Date: 2022-02-15 16:29:47
 * @LastEditTime: 2022-02-27 23:51:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \h5vue-master\src\utils\request.js
 */
import axios from 'axios'
import { Dialog, Toast } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    console.log('store.getters[:', store.getters['user/token'])
    if (store.getters['user/token']) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error, 'err') // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (typeof res === 'string' && res.match(/\d+/)[0] === '1') return res
    else if (res.code !== 200 && res.code !== 1) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === -1) {
        // to re-login
        Dialog.confirm({
          message: '身份信息过期，是否重新登录?'
        }
        ).then((v) => {
          store.commit('user/LOGOUT')

          // location.reload()
          resetRouter()
          return Promise.reject(new Error(res.message || 'Error'))
        })
      } else {
        if (res.code) { Toast.fail(res.message) }

        return Promise.reject(new Error(res.message || 'Error'))
      }
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast.fail({
      message: error.message,
      duration: 1.5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
