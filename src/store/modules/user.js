/*
 * @Description:
 * @Author: sunye
 * @Date: 2022-02-26 17:06:19
 * @LastEditTime: 2022-02-27 22:24:39
 */

import { login, register } from 'api/user'
import { Toast } from 'vant'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import router from '@/router'

const LOGIN = 'LOGIN'// 获取用户信息
const SetUserData = 'SetUserData'// 获取用户信息
const LOGOUT = 'LOGOUT'// 退出登录、清除用户数据
const USER_DATA = 'userData'// 用户数据

export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    user: JSON.parse(localStorage.getItem(USER_DATA) || null)
  },
  mutations: {

    [LOGIN] (state, data) {
      let userToken = data.Token
      state.token = userToken
      setToken(userToken)
    },

    [SetUserData] (state, userData = {}) {
      state.user = userData
      localStorage.setItem(USER_DATA, JSON.stringify(userData))
    },
    [LOGOUT] (state) {
      state.user = null
      state.token = null
      removeToken()
      localStorage.removeItem(USER_DATA)
      resetRouter()
    }

  },
  actions: {
    async login (state, data) {
      try {
        let res = await login({
          username: data.username,
          pwd: data.pwd
        })
        state.commit(LOGIN, res.data)
        state.commit(SetUserData, res.data.User)
        Toast({
          message: '登录成功',
          position: 'middle',
          duration: 1500
        })
        setTimeout(() => {
          const redirect = data.$route.query.redirect || '/'
          data.$router.replace({
            path: redirect
          })
        }, 1500)
      } catch (error) {
      }
    },
    async register (state, data) {
      try {
        await register(data)
        Toast({
          message: '注册成功',
          position: 'middle',
          duration: 1500
        })
        setTimeout(() => {
          const redirect = '/login'
          data.$router.replace({
            path: redirect
          })
        }, 1500)
      } catch (error) {
      }
    }

  },
  getters: {
    token (state) {
      return state.token
    },
    user (state) {
      return state.user
    }
  }
}
