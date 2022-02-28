<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 19:49:09
-->
<template>
  <div id="" class="container text-primary">
    <van-nav-bar
      title="详情"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span
          v-if="data.status === '报名中' && false"
          class="vant-blue"
          @click="showDialog('Join')"
          >报名</span
        >
      </template></van-nav-bar
    >
    <div class="container-inner container-inner-with-navbar bg-white pd">
      <!-- <top-note
        :title="data.title"
        :view="data.visibility"
        :time="data.posttime"
      ></top-note> -->
      <div class="font-bold pb text-primary article-title">
        <span>{{ data.title }}</span>
      </div>
      <div class="text-desc">
        <span class="top-label">报名时间：</span>
        <span>
          {{ data.startSignTime | myFormatDate('YYYY-MM-DD HH:MM') }}</span
        >
        <span class="divider">至</span>
        <span> {{ data.endSignTime | myFormatDate('YYYY-MM-DD HH:MM') }}</span>
      </div>
      <div class="text-desc">
        <span class="top-label">活动时间：</span>
        <span> {{ data.startTime | myFormatDate('YYYY-MM-DD HH:MM') }}</span>
        <span class="divider">至</span>
        <span> {{ data.endTime | myFormatDate('YYYY-MM-DD HH:MM') }}</span>
      </div>
      <div class="text-desc">
        <span class="top-label">报名人数：</span>
        <span> {{ data.signCount }}</span>
      </div>
      <span
        v-if="data.status === '报名中'"
        class="my-btn join-btn my"
        @click="showDialog('Join')"
        >报名</span
      >
      <van-divider class="mt-0" />

      <div v-html="data.content"></div>
    </div>
    <footer-tabbar />
    <van-dialog
      v-model="showJoin"
      title=""
      confirm-button-text="报名"
      show-cancel-button
      @confirm="onSubmit"
    >
      <van-form validate-first @failed="onFailed" @submit="onSubmit">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          v-model="form.realName"
          name="姓名"
          label="姓名"
          :error="false"
          placeholder="请输入姓名"
          :rules="[
            { required: true, message: '请输入姓名', trigger: 'onBlur' },
          ]"
        />
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          v-model="form.phone"
          name="手机号"
          label="手机号"
          :error="false"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请输入电话', trigger: 'onBlur' },
          ]"
        />
        <van-field
          v-model="form.email"
          name="邮箱"
          label="邮箱"
          :error="false"
          placeholder="请输入邮箱"
          :rules="[
            { required: true, message: '请输入邮箱', trigger: 'onBlur' },
          ]"
        />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import { getDetail } from '@/api/content.js'
import { getActivityList } from '@/api/activity.js'
import { mapGetters } from 'vuex'
export default {
  name: 'detail',
  data () {
    return {
      data: {},
      showJoin: false,
      form: {
        phone: '',
        email: '',
        realName: '',
        // note: '',
        activityid: ''
      }
    }
  },
  created () {
    const { realName, email, phone } = this.user
    this.form = { realName, email, phone, id: this.$route.query.id }
  },
  watch: {
    $route: {
      handler: function (route) {
        if (route.query.id) {
          this.getList()
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted () { },
  methods: {
    getList () {
      const params = {
        action: 'detail'
      }
      getActivityList(params, { id: this.$route.query.id }).then(res => {
        this['data'] = res.data
      })
    },
    onSubmit () {
      const params = {
        action: 'signup'
      }
      getActivityList(params, this.form).then(res => {
        this.$toast({
          message: '报名成功',
          position: 'middle',
          duration: 1500
        })
        this.showJoin = false
        this.getList()
      })
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    },
    showDialog (flag) {
      if (!this.user) {
        this.$dialog.confirm({
          message: '您尚未登录无法报名，是否登录?'
        }
        ).then((v) => {
          this.$router.replace({
            path: '/login' // 到登录页重新获取token
          })
        })
      } else {
        this['show' + flag] = true
      }
    }
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
::v-deep .van-form{
  margin: 20px 0;
}
.join-btn{
  background-color: $--color-primary-bg;
padding: 0  16px;
}
</style>
