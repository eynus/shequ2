<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 20:46:23
-->
<template>
  <div id="" class="container">
    <div class="container-inner bg-white">
      <div class="flex-center avatar-box text-center">
        <div>
          <van-image
            round
            width="20vw"
            height="20vw"
            :src="avatar"
            @click="to('/user-edit')"
          />
          <div>{{ user.userName }}</div>
        </div>
      </div>

      <van-cell-group>
        <van-cell title="姓名" :value="user.realName" />
        <van-cell title="邮箱" :value="user.email" label="" />
        <van-cell title="手机号" :value="user.phone" label="" />

        <van-cell value="个人中心" />

        <van-cell
          title="我的活动"
          icon="fire"
          is-link
          @click="to('/user-activity')"
        />
        <van-cell
          title="我的论坛"
          icon="chat"
          is-link
          @click="to('/user-article')"
        />
      </van-cell-group>
      <div class="logout-box">
        <van-button type="danger" block @click="logout">退出登录</van-button>
      </div>
    </div>

    <footer-tabbar />
  </div>
</template>

<script>
import { noticeInfo } from '@/api/user.js'
import { getUserInfo } from '@/utils/common'
import { mapMutations, mapGetters } from 'vuex'
import { Image as VanImage, Cell as VanCell, CellGroup as VanCellGroup } from 'vant'
import { getToken } from '@/utils/auth'

export default {
  name: 'user',
  components: { VanImage, VanCell, VanCellGroup },
  data () {
    return {
      curPath: '',
      avatar: '',
      noticeCount: 0,
      userInfo: getUserInfo(),
      showEditBtn: false,
      showEditDlg: false,
      map: [
        {
          title: '我的消息',
          to: '/user/message'
        },
        {
          title: '我的帖子',
          to: '/user/article'
        },
        {
          title: '我的活动',
          to: '/user/activity'
        },
        {
          title: '我的机构',
          to: '/user/org'
        }
      ]
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.curPath = route.path
      },
      immediate: true
    }
  },
  created () {
    this.handleUpdateUser()
    this.noticeInfo()
    this.curPath = this.$route.path
    if (!getToken()) {
      this.$toast({
        message: '请登录',
        position: 'middle',
        duration: 1500
      })
      this.$router.push('/login')
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    console.log(this.user, 'user')
    this.avatar = this.GlobalCfg.apiUrl + this.user.photo.filePath
  },
  methods: {
    handleUpdateUser () {
      this.userInfo = getUserInfo()
      console.log(getUserInfo(), 'getUserInfo')
      if (this.userInfo.photo) {
        this.avatar =
          this.GlobalCfg.apiUrl + this.userInfo.photo.filePath
      } else {
        this.avatar = ''
      }
    },
    to (path) {
      this.$router.push(path)
    },
    showEditDlgFun () {
      // this.$router.push(path)
      this.showEditDlg = true
    },
    noticeInfo () {
      const data = {
        action: 'count'
      }
      noticeInfo(data).then(res => {
        this.noticeCount = res.data.count
      })
    },
    handleSubmitAddOrUpdate () {
      this.handleUpdateUser()
    },
    ...mapMutations({
      logout: 'user/LOGOUT'
    })
  },
  computed: {
    ...mapGetters({
      'user': 'user/user'
    })
  },
  beforeDestroy () { }
}
</script>

<style lang="scss" scoped>
.avatar-box{
  height: 38vw;
  color: #fff;
  background-color: rgba(150, 231, 217, 0.8);
}
.logout-box{
  position: absolute;
  width: 100%;
  bottom: 0.5rem;
  left: 0;
  padding: 0 0.5rem;
}

</style>
