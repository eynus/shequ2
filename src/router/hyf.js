
export default [

  {
    path: '/charity-list',
    name: 'charity-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '慈善会'
    },
    component: resolve => require(['@/views/hyf/charity/Index.vue'], resolve)
  },
  {
    path: '/charity-detail',
    name: 'charity-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '慈善会'
    },
    component: resolve => require(['@/views/hyf/charity/Detail.vue'], resolve)
  },
  {
    path: '/care-list',
    name: 'care-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '日间照料中心'
    },
    component: resolve => require(['@/views/hyf/care/Index.vue'], resolve)
  },
  {
    path: '/care-detail',
    name: 'care-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '日间照料中心'
    },
    component: resolve => require(['@/views/hyf/care/Detail.vue'], resolve)
  },

  {
    path: '/child-list',
    name: 'child-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '儿童关爱之家'
    },
    component: resolve => require(['@/views/hyf/child/Index.vue'], resolve)
  },
  {
    path: '/child-detail',
    name: 'child-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '儿童关爱之家'
    },
    component: resolve => require(['@/views/hyf/child/Detail.vue'], resolve)
  },
  {
    path: '/unhealth-list',
    name: 'unhealth-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '残疾人之家'
    },
    component: resolve => require(['@/views/hyf/unhealth/Index.vue'], resolve)
  },
  {
    path: '/unhealth-detail',
    name: 'unhealth-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '残疾人之家'
    },
    component: resolve => require(['@/views/hyf/unhealth/Detail.vue'], resolve)
  },
  {
    path: '/recure-list',
    name: 'recure-list',
    meta: {
      auth: true,
      keepAlive: true,
      title: '康复驿站'
    },
    component: resolve => require(['@/views/hyf/recure/Index.vue'], resolve)
  },
  {
    path: '/recure-detail',
    name: 'recure-detail',
    meta: {
      auth: true,
      keepAlive: true,
      title: '康复驿站'
    },
    component: resolve => require(['@/views/hyf/recure/Detail.vue'], resolve)
  }

]
