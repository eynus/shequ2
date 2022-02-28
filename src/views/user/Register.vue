<template>
  <div class="container flex-center">
    <div class="content register-form">
      <van-form @submit="onSubmit">
        <van-field
          placeholder="账号"
          v-model="username"
          left-icon="friends-o"
          label="账号"
          name="username"
          :error="false"
          :error-message="errorMessage1"
          :rules="[
            { required: true, message: '请输入账号', trigger: 'onBlur' },
          ]"
        />
        <van-field
          v-if="loginWay === 'pwd'"
          placeholder="密码"
          label="密码"
          v-model="pwd"
          name="pwd"
          left-icon="lock"
          :type="pwdType"
          :error="false"
          :error-message="errorMessage2"
          :rules="[
            { required: true, message: '请输入密码' },
            { pattern, message: '密码格式错误', trigger: 'onBlur' },
          ]"
        >
        </van-field>
        <van-field
          placeholder="电话"
          label="电话"
          v-model="phone"
          left-icon="phone-o"
          name="phone"
          :error="false"
          :rules="[
            { required: true, message: '请输入电话', trigger: 'onBlur' },
          ]"
        />
        <van-field
          placeholder="姓名"
          label="姓名"
          v-model="realName"
          left-icon="manager-o"
          name="realName"
          :error="false"
          :rules="[
            { required: true, message: '请输入姓名', trigger: 'onBlur' },
          ]"
        />
        <van-field
          placeholder="邮箱"
          label="邮箱"
          v-model="email"
          left-icon="envelop-o"
          name="email"
          :error="false"
          :rules="[
            { required: true, message: '请输入邮箱', trigger: 'onBlur' },
          ]"
        />
        <van-field
          placeholder="头像"
          label="头像"
          left-icon="user-circle-o"
          :error="false"
        >
          <template #input>
            <van-uploader v-model="uploader" :after-read="afterRead" />
          </template>
        </van-field>
        <div class="button-wrap">
          <van-button size="large" type="info" native-type="submit">{{
            loading ? '正在注册...' : '注册'
          }}</van-button>
        </div>
        <div class="more-wrap">
          <router-link class="link" to="/login">有账号？去登录</router-link>
          <router-link class="link" to="/reset">修改密码</router-link>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
// import { Field, Icon, Button, Form } from 'vant'
import { Uploader as VanUploader } from 'vant'
import { mapActions } from 'vuex'
import { uploadPhoto, register } from '@/api/user.js'
export default {
  name: 'register',
  data () {
    return {
      uploader: [],
      loading: false,
      username: '',
      pwd: '',
      realName: '',
      email: '',
      phone: '',
      loginWay: 'pwd',
      pattern: /(?=\w*\d)(?=\w*[a-zA-Z])^\w+$/,
      pwdType: 'password'
    }
  },
  methods: {

    afterRead (file) {
      if (this.uploader.length > 1) {
        this.uploader.shift()
      }
    },
    onSubmit () {
      this.loading = true
      const fd = new FormData()
      const f = this.uploader[0]
      if (f && !f.status) {
        fd.append('file', f.file, f.file.name)
        uploadPhoto(fd).then(res => {
          let data = Object.assign({}, this.registerForm, {
            photo: res.data
          })
          register(data).then(
            () => {
              this.loading = false
              this.$toast({
                message: '注册成功',
                position: 'middle',
                duration: 1500
              })
              this.$router.push('/login')
            },
            () => {
              this.loading = false
            }
          )
        })
      } else {
        let data = Object.assign({}, this.registerForm, { photo: {} })
        register(data).then(
          () => {
            this.$toast({
              message: '注册成功',
              position: 'middle',
              duration: 1500
            })
            this.loading = false
            this.$router.push('/login')
          },
          () => {
            this.loading = false
          }
        )
      }
    },
    ...mapActions({
      register: 'user/register'
    })
  },
  computed: {
    errorMessage1 () {
      return this.username.length && this.username.length < 3 ? '账号不少于三位' : ''
    },
    errorMessage2 () {
      return this.pwd && !(/(?=\w*\d)(?=\w*[a-zA-Z])^\w+$/.test(this.pwd))
        ? '密码格式必须由数字和字母组成'
        : ''
    }
  },
  components: { VanUploader }
}
</script>
<style lang="scss" scoped>
.container{
  width: 100%;
  background-image: url('../../assets/bg.jpg');
  background-size: cover;
}
  .header{
    width: 100%;
    height: 165px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
  }
  .content{
    width: 100%;
    height: auto;

    box-sizing: border-box;
    .button-wrap{
      width: 100%;
      height: auto;
      margin-top: 15px;
    }
  }
  .more-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 14px;
    a.link{
      color: #1989fa;
    }
    .switch-way{
      color: #333;
    }
  }

::v-deep .van-button--large{
  height: 44px;
}
::v-deep .van-uploader__upload{
  border-radius: 40px !important;
  overflow: hidden;
  width: 60px;
  height: 60px;
}
::v-deep .van-image.van-uploader__preview-image{
  border-radius: 40px !important;
  overflow: hidden;
  width: 60px;
  height: 60px;
}
.register-form{
    background-color: #fff;
  border-radius: 16px;
  padding: 20px 16px;
  margin: 0 10px;
}
</style>
