/*
 * @Author: your name
 * @Date: 2022-02-16 14:12:42
 * @LastEditTime: 2022-02-16 15:13:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \h5vue-master\src\router\zxfb.js
 */

export default [
  {
    path: '/notice-list',
    name: 'notice-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '公告通知'
    },
    component: resolve => require(['@/views/zxfb/notice/Index.vue'], resolve)
  },
  {
    path: '/notice-detail',
    name: 'notice-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '公告通知'
    },
    component: resolve => require(['@/views/zxfb/notice/Detail.vue'], resolve)
  },
  {
    path: '/handle-list',
    name: 'handle-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '办事流程'
    },
    component: resolve => require(['@/views/zxfb/handle/Index.vue'], resolve)
  },
  {
    path: '/handle-detail',
    name: 'handle-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '办事流程'
    },
    component: resolve => require(['@/views/zxfb/handle/Detail.vue'], resolve)
  },
  {
    path: '/service-list',
    name: 'service-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '党建服务'
    },
    component: resolve => require(['@/views/zxfb/service/Index.vue'], resolve)
  },
  {
    path: '/service-detail',
    name: 'service-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '党建服务'
    },
    component: resolve => require(['@/views/zxfb/service/Detail.vue'], resolve)
  }

]
