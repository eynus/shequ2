<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 21:44:16
-->
<template>
  <div id="" class="container">
    <div class="container-inner bg-white">
      <van-nav-bar
        title="个人信息"
        left-text="返回"
        right-text="提交"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <van-form validate-first @failed="onFailed" @submit="onClickRight">
        <van-field name="uploader" label="头像">
          <template #input>
            <van-uploader v-model="uploader" :after-read="afterRead" />
          </template>
        </van-field>
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

        <!-- <div style="margin: 16px">
          <van-button block type="primary" native-type="submit"
            >提交</van-button
          >
        </div> -->
      </van-form>
    </div>

    <footer-tabbar />
  </div>
</template>

<script>
import { noticeInfo, EditUserInfo, uploadPhoto } from '@/api/user.js'
import { getUserInfo } from '@/utils/common'
// import AddDialog from './AddDialog.vue'
import { mapMutations, mapGetters } from 'vuex'
import { Uploader as VanUploader } from 'vant'
export default {
  name: 'user',
  components: { VanUploader },
  data () {
    return {
      curPath: '',
      noticeCount: 0,
      userInfo: {},
      form: {

      },
      showEditBtn: false,
      showEditDlg: false,
      value1: '',
      value2: '',
      value3: '',
      pattern: /\d{6}/,
      uploader: [],
      avatar: ''
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
  },
  mounted () {
    const { realName, email, phone, id } = this.user
    this.form = {
      realName, email, phone, id
    }
    if (this.user.photo) {
      this.uploader = [{
        url: this.GlobalCfg.apiUrl + this.user.photo.filePath,
        name: this.user.photo.origionName
      }]
    }
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    onClickLeft () {
      this.$router.push('/user-detail')
    },
    onClickRight () {
      const fd = new FormData()
      const f = this.uploader[0]
      if (f && !f.status) {
        console.log(f, 'f', f.raw, f.file.name)
        fd.append('file', f.file, f.file.name)
        uploadPhoto(fd).then(res => {
          let data = Object.assign({}, this.form, {
            photo: res.data
          })
          EditUserInfo(data).then(res => {
            this.$toast({
              message: '修改成功',
              position: 'middle',
              duration: 1500
            })
            this.updateUser(res.data.User)
            setTimeout(() => {
              this.$router.push('/user-detail')
            }, 0)
          })
        })
      } else {
        let data = Object.assign({}, this.form, { photo: null })
        EditUserInfo(data).then(res => {
          this.updateUser(res.data.User)
          this.$toast({
            message: '修改成功',
            position: 'middle',
            duration: 1500
          })
          setTimeout(() => {
            this.$router.push('/user-detail')
          }, 0)
        })
      }
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    },
    afterRead (file, file2) {
      console.log(file)

      if (this.uploader.length > 1) {
        this.uploader.shift()
      } console.log(this.uploader)
    },
    handleUpdateUser () {
      this.userInfo = getUserInfo()
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
      logout: 'user/LOGOUT',
      updateUser: 'user/SetUserData'
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
  height: 30vw;
  background-color: $--color-green;
}
.logout-box{
  position: absolute;
  width: 100%;
  bottom: 0.5rem;
  left: 0;
  padding: 0 0.5rem;
}
</style>
