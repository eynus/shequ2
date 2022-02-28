<!--
 * @Author: your name
 * @Date: 2022-02-15 16:29:47
 * @LastEditTime: 2022-02-27 22:12:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \h5vue-master\src\components\FooterTabbar.vue
-->
<template>
  <van-tabbar route :safe-area-inset-bottom="true">
    <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="chat-o" replace to="/forum-list"
      >论坛</van-tabbar-item
    >
    <van-tabbar-item icon="comment-o" replace to="/user-message"
      >消息</van-tabbar-item
    >
    <van-tabbar-item icon="user-o" replace to="/user-detail"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'FooterTabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>
