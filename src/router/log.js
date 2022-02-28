/*
 * @Author: your name
 * @Date: 2022-02-15 16:29:47
 * @LastEditTime: 2022-02-16 15:50:32
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \h5vue-master\src\router\log.js
 */
export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    meta: {
      title: '登录'
      // auth: true,
      // keepAlive: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ 'views/user/Register.vue'),
    meta: {
      title: '注册'
      // auth: true,
      // keepAlive: true
    }
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import(/* webpackChunkName: "reset" */ 'views/user/Reset.vue'),
    meta: {
      title: '重置密码'
      // auth: true,
      // keepAlive: true
    }
  }
]
