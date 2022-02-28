/*
 * @Author: your name
 * @Date: 2022-02-16 14:14:32
 * @LastEditTime: 2022-02-27 09:16:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \h5vue-master\src\router\userCenter.js
 */

export default [
  {
    path: '/user-detail',
    name: 'user-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '个人中心'
    },
    component: resolve => require(['@/views/user/Index.vue'], resolve)
  },
  {
    path: '/user-activity',
    name: 'user-activity',
    meta: {
      auth: true,
      keepAlive: true,
      title: '我的活动'
    },
    component: resolve => require(['@/views/user/Activity.vue'], resolve)
  },
  {
    path: '/user-article',
    name: 'user-article',
    meta: {
      auth: true,
      keepAlive: true,
      title: '我的文章'
    },
    component: resolve => require(['@/views/user/Article.vue'], resolve)
  },
  {
    path: '/user-message',
    name: 'user-message',
    meta: {
      auth: true,
      keepAlive: true,
      title: '我的消息'
    },
    component: resolve => require(['@/views/user/Message.vue'], resolve)
  },
  {
    path: '/user-edit',
    name: 'user-edit',
    meta: {
      auth: true,
      keepAlive: true,
      title: '编辑信息'
    },
    component: resolve => require(['@/views/user/EditInfo.vue'], resolve)
  }

]
