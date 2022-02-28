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

        <div class="button-wrap">
          <van-button size="large" type="info" native-type="submit">{{
            loading ? '正在修改...' : '修改'
          }}</van-button>
        </div>
        <div class="more-wrap">
          <router-link class="link" to="/login">有账号？去登录</router-link>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { EditPasswordByInfo } from '@/api/user'
import { mapActions } from 'vuex'
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
    onSubmit () {
      this.loading = true

      let data = Object.assign({}, this.registerForm, { photo: {} })
      EditPasswordByInfo(data).then(
        res => {
          if (res.code === 200) {
            this.$toast({
              message: '修改成功',
              position: 'middle',
              duration: 1500
            })
            this.loading = false
            this.$router.push('/login')
          }
        },
        () => {
          this.loading = false
          this.$toast('修改失败,帐号信息错误')
        }
      )
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
  }
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
