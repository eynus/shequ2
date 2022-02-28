/*
 * @Author: your name
 * @Date: 2022-02-15 16:29:47
 * @LastEditTime: 2022-02-27 22:26:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \h5vue-master\src\main.js
 */
import Vue from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'utils/permission'
import dayjs from 'dayjs'
// import SvgIcon from 'components/SvgIcon'
import '@/icons' // icon
import '@/assets/iconfont/iconfont.css'
import '@/style/common.scss'
import '@/style/main.scss'
import '@/style/tailwindcss.css'
import { Tag as VanTag, Form as VanForm, Field as VanField, Cell as VanCell, CellGroup as VanCellGroup, Dialog, Search as VanSearch, PullRefresh as VanPullRefresh, List as VanList, NavBar as VanNavBar, Divider as VanDivider, Image, Lazyload, Icon, Button, Empty, Toast } from 'vant'
import defaultSettings from '@/settings'
import FooterTabbar from 'components/FooterTabbar'
import Note from 'components/Note'
import TopNote from 'components/TopNote'

import { mockXHR } from '../mock'
Vue.component('FooterTabbar', FooterTabbar)
Vue.component('Note', Note)
Vue.component('VanSearch', VanSearch)
Vue.component('TopNote', TopNote)
Vue.component('VanTag', VanTag)
Vue.component(Dialog.Component.name, Dialog.Component)

Vue.prototype.GlobalCfg = { apiUrl: 'http://120.26.64.162:8007' }

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// options 为可选参数，无则不传
Vue.use(Lazyload)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Empty)
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
Vue.component(Image.name, Image)
Vue.component('VanDivider', VanDivider)
Vue.component('VanNavBar', VanNavBar)
Vue.component('VanForm', VanForm)
Vue.component('VanPullRefresh', VanPullRefresh)
Vue.component('VanList', VanList)
Vue.component('VanCell', VanCell)
Vue.component('VanCellGroup', VanCellGroup)
Vue.component('VanField', VanField)

if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}
// var vConsole = new VConsole(option)

Vue.config.productionTip = false
Vue.filter('myFormatDate', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (!dateStr) {
    return ''
  }
  if (dateStr.indexOf('1970') > -1) {
    return ''
  }
  return dayjs(dateStr).format(pattern)
})
new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
