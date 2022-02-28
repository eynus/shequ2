<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 20:40:37
-->
<template>
  <div id="" class="container">
    <van-nav-bar
      title="发帖"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="vant-blue" @click="release">发布</span>
      </template></van-nav-bar
    >
    <div class="container-inner container-inner-with-navbar bg-white pd">
      <!-- 精选论坛 -->
      <van-form validate-first @submit="release">
        <!-- 通过 pattern 进行正则校验 -->

        <van-field
          v-model="data.title"
          name="标题"
          label=""
          :error="false"
          placeholder="请输入标题"
        />
        <van-field name="checkbox" label="">
          <template #input>
            <Editor
              @getContent="getContent"
              :contentinit="data.content"
            ></Editor>
          </template>
        </van-field>
      </van-form>
    </div>
    <footer-tabbar />
  </div>
</template>

<script>
import { forum } from '@/api/forum.js'
import Editor from '@/components/Editor'
export default {
  name: 'Home',
  components: { Editor },
  data () {
    return {
      // labelwidth: '80px',
      type: '',
      // rules: {
      //   title: { required: true, message: '请输入标题', trigger: 'blur' },
      //   content: { required: true, message: '请输入正文', trigger: 'blur' }
      // },
      data: {
        content: '',
        title: '',
        id: ''
      }
    }
  },
  created () {
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        this.type = query.type
        if (this.type === 'Edit') {
          this.data.id = +query.id
          this.getList({ id: query.id })
        } else {
          this.data = {
            content: '',
            title: '',
            id: ''
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getContent (e) {
      this.data.content = e
    },
    release () {
      const params = {
        action: this.type
      }
      forum(params, this.data).then(() => {
        this.$toast({
          message: '发布成功',
          position: 'middle',
          duration: 1500
        })
        this.$router.push('/forum-list')
      })
    },

    // 监听富文本的输入
    catchData (e) {
      this.data.content = e
    },

    getList (data) {
      const params = {
        action: 'Detail'
      }
      forum(params, data).then(res => {
        const re = res.data
        this.data.title = re.title
        this.data.content = re.content
      })
    },
    showDialog (flag) {
      this['show' + flag] = true
    },
    handleSubmitAddOrUpdate () { },

    handlerSubmit (e) {
      if (e.target.hasAttribute('disabled')) {
        return
      }
      this.$emit('submit', this.inputContent)
    },
    handlerEmojiSelected (e) {
      this.$refs.inputBox.focus()
      const clonedNode = e.target.cloneNode(true)
      clonedNode.style.verticalAlign = 'text-top'
      document.execCommand('insertHTML', false, clonedNode.outerHTML)
    }
  },
  beforeDestroy () { }
}
</script>

<style lang="scss" scoped>
::v-deep .van-cell{
  padding: 10px 0;
}</style>
