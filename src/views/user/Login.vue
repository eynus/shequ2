<template>
  <div class="container flex-center">
    <div class="content login-form">
      <van-form @submit="onSubmit" class="">
        <van-field
          placeholder="账号"
          label="账号"
          v-model="username"
          name="username"
          :error="false"
          :rules="[
            { required: true, message: '请输入账号', trigger: 'onBlur' },
          ]"
        />
        <van-field
          placeholder="登录密码"
          label="密码"
          v-model="password"
          name="password"
          :type="passwordType"
          :error="false"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
        </van-field>

        <div class="button-wrap">
          <van-button size="large" type="info" native-type="submit">{{
            loading ? '正在登录...' : '登录'
          }}</van-button>
        </div>
        <div class="more-wrap">
          <router-link class="link" to="/register"
            >没有账号？去注册</router-link
          >
          <router-link class="link" to="/reset">修改密码</router-link>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Field, Icon, Button, Form } from 'vant'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      username: '',
      password: '',
      code: '',
      loginWay: 'password',
      pattern: /(?=\w*\d)(?=\w*[a-zA-Z])^\w+$/,
      passwordType: 'password'
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      const data = {
        username: this.username,
        pwd: this.password,
        $router: this.$router,
        $route: this.$route
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
      this.login(data)
    },
    ...mapActions({
      login: 'user/login'
    })
  },
  computed: {
    errorMessage1 () {
      return this.username.length && this.username.length < 3 ? '账号不少于三位' : ''
    },
    errorMessage2 () {
      return this.password && !(/(?=\w*\d)(?=\w*[a-zA-Z])^\w+$/.test(this.password))
        ? '密码格式必须由数字和字母组成'
        : ''
    }
  },
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Form.name]: Form
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
::v-deep .van-field{
  margin: 16px 0;
}
::v-deep .van-button--large{
  height: 44px;
}
.login-form{
  background-color: #fff;
  border-radius: 16px;
  padding: 20px 16px;
  margin: 0 10px;
}
</style>
