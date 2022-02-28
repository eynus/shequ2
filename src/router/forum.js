/*
 * @Author: your name
 * @Date: 2022-02-16 14:13:31
 * @LastEditTime: 2022-02-16 15:01:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \h5vue-master\src\router\forum.js
 */
export default [
  {
    path: '/forum-list',
    name: 'forum',
    meta: {
      auth: true,
      keepAlive: true,
      title: '望峰论坛'
    },
    component: resolve => require(['@/views/forum/Index.vue'], resolve)
  },
  {
    path: '/forum-editor',
    name: 'forum',
    meta: {
      auth: true,
      keepAlive: true,
      title: '望峰论坛'
    },
    component: resolve => require(['@/views/forum/Editor.vue'], resolve)
  },
  {
    path: '/forum-detail',
    name: 'forum',
    meta: {
      auth: true,
      keepAlive: true,
      title: '望峰论坛'
    },
    component: resolve => require(['@/views/forum/Detail.vue'], resolve)
  }
]
