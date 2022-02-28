/*
 * @Author: your name
 * @Date: 2022-02-16 14:12:09
 * @LastEditTime: 2022-02-16 15:09:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \h5vue-master\src\router\ltyz.js
 */
export default [

  {
    path: '/activity-list',
    name: 'activity-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '活动抢先看'
    },
    component: resolve => require(['@/views/ltyz/activity/Index.vue'], resolve)
  },
  {
    path: '/activity-detail',
    name: 'activity-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '活动抢先看'
    },
    component: resolve => require(['@/views/ltyz/activity/Detail.vue'], resolve)
  },
  {
    path: '/policy-list',
    name: 'policy-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '政策最先知'
    },
    component: resolve => require(['@/views/ltyz/policy/Index.vue'], resolve)
  },
  {
    path: '/policy-detail',
    name: 'policy-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '政策最先知'
    },
    component: resolve => require(['@/views/ltyz/policy/Detail.vue'], resolve)
  },
  {
    path: '/news-list',
    name: 'news-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '新闻即时送'
    },
    component: resolve => require(['@/views/ltyz/news/Index.vue'], resolve)
  },
  {
    path: '/news-detail',
    name: 'news-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '新闻即时送'
    },
    component: resolve => require(['@/views/ltyz/news/Detail.vue'], resolve)
  },
  {
    path: '/cure-list',
    name: 'cure-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '治理第一线'
    },
    component: resolve => require(['@/views/ltyz/cure/Index.vue'], resolve)
  },
  {
    path: '/cure-detail',
    name: 'cure-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '治理第一线'
    },
    component: resolve => require(['@/views/ltyz/cure/Detail.vue'], resolve)
  }

]
