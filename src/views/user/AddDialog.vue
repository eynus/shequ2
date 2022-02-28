<template>
  <el-dialog
    class="my-dialog"
    append-to-body
    :visible.sync="mVisible"
    :with-header="false"
    width="95vw"
    v-if="mVisible"
  >
    <p class="font-bold text-center text-lg mb-4">修改个人信息</p>
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      auto-complete="on"
      label-position="right"
      label-width="70px"
    >
      <!-- <el-form-item prop="userName" label="登录名">
        <el-input
          v-model="registerForm.userName"
          type="text"
          placeholder="登录名"
        />
      </el-form-item> -->

      <!-- <el-form-item prop="pwd" label="密码">
        <el-input
          v-model="registerForm.pwd"
          type="password"
          placeholder="密码"
        />
      </el-form-item> -->
      <el-form-item prop="phone" label="电话">
        <el-input v-model="registerForm.phone" type="text" placeholder="电话" />
      </el-form-item>
      <el-form-item prop="realName" label="姓名">
        <el-input
          v-model="registerForm.realName"
          type="text"
          placeholder="真实姓名"
        />
      </el-form-item>

      <el-form-item prop="email" label="邮箱">
        <el-input v-model="registerForm.email" type="text" placeholder="邮箱" />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="upload-demo"
          multiple
          ref="upload"
          :limit="1"
          action=""
          :auto-upload="false"
          :file-list="fileList"
          :on-remove="handleRemove"
          :on-change="handleFileChange"
          :on-preview="handlePreview"
          :http-request="httpRequest"
        >
          <el-button size="mini" type="primary" plain>上传头像</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <template>
        <el-button type="primary" @click="handleSubmit" :loading="loading"
          >提 交</el-button
        >
        <el-button v-on:click="cancelDialog">取 消</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { EditUserInfo, uploadPhoto } from '@/api/user'
import { setUserInfo } from '@/utils/common'
export default {
  name: 'adddialog',
  props: {
    visible: {
      type: Boolean
    },
    data: {
      type: Object
    }
  },
  data () {
    // const validateUserName = (rule, value, callback) => {
    //   if (value != '') {
    //     if (value.length < 3) {
    //       callback(new Error('用户名长度不能小于3位'))
    //     } else {
    //       callback()
    //     }
    //   } else {
    //     callback(new Error('请输入用户名'))
    //   }
    // }
    // const validatePwd = (rule, value, callback) => {
    //   if (value != '') {
    //     if (value.length < 6) {
    //       callback(new Error('密码长度不能小于6位'))
    //     } else {
    //       var reg = /(?=\w*\d)(?=\w*[a-zA-Z])^\w+$/
    //       var re = new RegExp(reg)
    //       if (!re.test(value)) {
    //         callback(new Error('密码必须由数字和字母组成'))
    //       } else {
    //         callback()
    //       }
    //     }
    //   } else {
    //     callback(new Error('请输入密码'))
    //   }
    // }

    return {
      fileList: [],
      fileData: [],
      registerForm: {
        id: '',
        // userName: '',
        // pwd: '',
        realName: '',
        email: '',
        phone: ''
      },
      registerRules: {
        // userName: [
        //   { required: true, trigger: 'blur', validator: validateUserName }
        // ],
        // pwd: [{ required: true, trigger: 'blur', validator: validatePwd }],
        realName: [
          { required: true, trigger: 'blur', message: '请输入真实姓名' }
        ],
        email: [{ required: true, trigger: 'blur', message: '请输入邮箱' }],
        phone: [{ required: true, trigger: 'blur', message: '请输入手机号' }]
      },
      loading: false
    }
  },
  computed: {
    // ...mapGetters(['userinfoGetter']),
    mVisible: {
      get () {
        return this.visible
      },
      set (v) {
        this.$emit('update:visible', v)
      }
    }
  },
  watch: {
    visible (newV) {
      if (!newV) {
        this.$emit('update:visible', newV)
      }
    }
  },
  created () {
    this.registerForm = {
      id: this.data.id,
      // userName: this.data.userName,
      // pwd: this.data.pwd,
      realName: this.data.realName,
      email: this.data.email,
      phone: this.data.phone
    }
    if (this.data.photo && this.data.photo.id) {
      this.fileList = [
        Object.assign({}, this.data.photo, {
          name: '头像',
          url: this.GlobalCfg.apiUrl + this.data.photo.filePath
        })
      ]
    }
  },
  mounted () { },
  methods: {
    cancelDialog () {
      this.resetData()
      this.$emit('update:visible', false)
    },
    success (data) {
      setUserInfo(data)
      this.cancelDialog()
      this.$emit('updateUser')
      this.$message.info('修改成功')
    },
    handleSubmit () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          const fd = new FormData()
          const f = this.fileData[0]
          if (f) {
            fd.append('file', f.raw, f.name)
            uploadPhoto(fd).then(res => {
              let data = Object.assign({}, this.registerForm, {
                photo: res.data
              })
              EditUserInfo(data).then(res => {
                this.loading = false

                this.success(res.data.User)
              })
            })
          } else {
            let data = Object.assign({}, this.registerForm, { photo: {} })
            EditUserInfo(data).then(res => {
              this.loading = false
              this.success(res.data.User)
            })
          }
        } else {
          return false
        }
      })
    },
    handleRemove (file) {
      // 目前处理删除
      if (file.status === 'success') {
        // 调用删除附件接口
        // this.DeleteFileMix(file.Id).then(() => {

        // }, e => {
        //   this.$message.error(e)
        // })
      } else if (file.status === 'ready') {
        this.fileData = this.fileData.filter(i => i.uid !== file.uid)
      }
    },
    handleFileChange (file, fileList) {
      // 目前处理新增

      if (file.status === 'ready') {
        this.fileData.push(file)
      }
      this.fileList = fileList // 直接赋值
    },
    handlePreview () { },
    httpRequest () {
      // 请求接口
      // console.log(this.fileData)
    },
    resetData () {
      this.$refs.registerForm.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
// /deep/ {
//   .el-dialog__header {
//     display: none !important;
//   }
// }
</style>
