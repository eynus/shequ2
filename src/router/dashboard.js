/*
 * @Author: your name
 * @Date: 2022-02-16 11:12:25
 * @LastEditTime: 2022-02-16 14:39:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \h5vue-master\src\router\dashboard.js
 */

export default [
  {
    path: '/search',
    name: 'search',
    meta: {
      auth: true,
      keepAlive: true,
      title: '搜索结果'
    },
    component: resolve => require(['@/views/search/Index.vue'], resolve)
  }

]
