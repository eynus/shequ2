<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 22:27:06
-->
<template>
  <div id="" class="container text-primary">
    <van-nav-bar
      title="详情"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="container-inner container-inner-with-navbar">
      <!-- 精选论坛 -->
      <div class="bg-white" ref="container">
        <!-- 正文 -->
        <div class="">
          <div class="pd">
            <div class="font-bold truncate">
              <span>{{ data.title }}</span>
            </div>
            <!-- 作者，时间 -->
            <div class="flex items-center justify-between text-gray">
              <div class="flex items-center">
                <van-image
                  round
                  width="8vw"
                  height="8vw"
                  :src="
                    (data.user &&
                      data.user.photo &&
                      GlobalCfg.apiUrl + data.user.photo.filePath) ||
                    ''
                  "
                />
                <div class="px">
                  <div class="text-primary">{{ data.userName }}</div>
                  <div>
                    {{ data.posttime | myFormatDate('YYYY-MM-DD HH:mm') }}
                  </div>
                </div>
              </div>
              <div class="flex items-center text-primary">
                <div class="flex items-center pd">
                  <van-icon name="eye" size="large" />
                  <span class="value">{{ data.visibility }}</span>
                </div>
                <div class="flex items-center pd">
                  <van-icon name="chat" size="large" />
                  <span class="value">{{ data.commentCount }}</span>
                </div>
              </div>
            </div>
          </div>
          <van-divider class="mt-0" />
          <div class="break-all pd" v-html="data.content"></div>
        </div>
        <van-divider />
        <!-- 添加评论 -->
        <div class="relative pd">
          <div class="block-box" v-if="!user">
            <div>
              您需要登录后才可以评论
              <span class="text-blue ml" @click="to('/login?type=login')"
                >登录</span
              >
              <span class="mx">|</span>
              <span class="text-blue" @click="to('/login?type=register')"
                >立即注册</span
              >
            </div>
          </div>
          <div class="font-bold my">评论</div>
          <editor-master
            id="editorEl"
            ref="editorEl"
            @submit="handleFatherSubmit"
          ></editor-master>
        </div>
        <van-divider />
        <!-- 全部评论 -->
        <div class="pd">
          <div class="font-bold my">全部评论({{ data.commentCount }})</div>
          <!-- <div class="editor-wrapper" ref="editorEl" v-show="editorVisible">
              <slot name="editor">
                <comment-editor></comment-editor>

              </slot>
            </div> -->
          <template v-if="data.comments && data.comments.length">
            <div
              v-for="(item, index) in data.comments"
              :key="index"
              class="flex items-start py border-1"
            >
              <van-image
                round
                width="10vw"
                height="10vw"
                :src="
                  (item.user.photo &&
                    GlobalCfg.apiUrl + item.user.photo.filePath) ||
                  ''
                "
              />
              <div class="flex-1 px" :ref="`editorContainer${index}`">
                <div class="text-primary">{{ item.userName }}</div>
                <div class="text-gray">
                  {{ item.posttime | myFormatDate('YYYY-MM-DD HH:mm') }}
                </div>
                <div class="">
                  <div class="py" v-html="item.content"></div>
                  <div class="pt" v-if="user">
                    <van-icon
                      name="comment"
                      size="large"
                      @click="replyComment(item, item, index)"
                    />
                  </div>
                </div>
                <div class="">
                  <div
                    v-for="(citem, cindex) in item.comments"
                    :key="`c_${cindex}`"
                    class="border-1 pd py"
                    style="background-color: #fafbfc"
                  >
                    <div class="flex items-start">
                      <van-image
                        round
                        width="9vw"
                        height="9vw"
                        :src="
                          (citem.user.photo &&
                            GlobalCfg.apiUrl + citem.user.photo.filePath) ||
                          ''
                        "
                      />
                      <div
                        class="flex-1 pl"
                        :ref="`editorContainer${index}${cindex}`"
                      >
                        <div class="text-primary">{{ citem.userName }}</div>
                        <div class="text-gray">
                          {{
                            citem.posttime | myFormatDate('YYYY-MM-DD HH:mm')
                          }}
                        </div>
                        <div>
                          <template>
                            <div
                              v-if="citem.commentid !== item.id"
                              class="mr-2 text-gray"
                            >
                              回复
                              <span class="font-bold"
                                >@{{ citem.toUser.userName }}</span
                              >:
                            </div>
                            <div class="py" v-html="citem.content"></div>
                          </template>
                          <div class="pt" v-if="user">
                            <van-icon
                              name="comment"
                              size="large"
                              @click="
                                replyComment(item, citem, `${index}${cindex}`)
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div></div
          ></template>
          <van-empty v-else description="空" />
        </div>
      </div>
    </div>
    <editor-master
      v-show="showCommentInput"
      id="editorChildEl"
      class="mt"
      ref="editorChildEl"
      @submit="handleChildSubmit"
    ></editor-master>
    <footer-tabbar />
  </div>
</template>

<script>
import { forum } from '@/api/forum.js'
import EditorMaster from './EditorMaster.vue'
import { Divider as VanDivider } from 'vant'
// import { getUserInfo } from '@/utils/common'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: { EditorMaster, VanDivider },
  props: {
    buttonText: {
      type: String,
      default: '提交'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      editorVisible: false,
      data: {},
      // 评论
      active: false,
      inputContent: '',
      inputBoxFocused: false,
      id: '',
      topCommentid: 0,
      commentid: 0,
      showCommentInput: false,
      selectedTopComment: null,
      // 用户信息
      userName: ''
    }
  },
  created () {
    // this.init()
  },
  watch: {
    $route: {
      handler: function (route) {
        if (route.query.id) {
          this.init()
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    showInlineButton () {
      return !!(this.inputBoxFocused || this.inputContent)
    },
    ...mapGetters({
      'user': 'user/user'
    })
  },
  destroyed () {
    document.removeEventListener('click', this.hideButton)
  },
  mounted () {
    window.scrollTo(0, 0)
    document.addEventListener('click', this.hideButton)
  },
  methods: {
    init () {
      // this.id = +this.$route.query.id
      console.log(1555)
      this.getList('detail', { id: this.$route.query.id }, 'data')
    },
    getList (action, data, container, cb) {
      const params = {
        action
      }
      forum(params, data).then(res => {
        if (cb) {
          cb()
        } else if (container) {
          this[container] = res.data
        }
      })
    },
    handleChildSubmit (val) {
      this.getList(
        'CommentAdd',
        {
          topCommentid: this.topCommentid,
          commentid: this.commentid,
          forumid: this.id,
          content: val
        },
        '',
        () => {
          this.$toast({
            message: '评论成功',
            position: 'middle',
            duration: 1500
          })
          // this.inputContent = ''
          this.init()
        }
      )
    },
    handleFatherSubmit (val) {
      this.topCommentid = 0
      this.commentid = 0
      this.getList(
        'CommentAdd',
        {
          topCommentid: this.topCommentid,
          commentid: this.commentid,
          forumid: this.id,
          content: val
        },
        '',
        () => {
          this.$toast({
            message: '评论成功',
            position: 'middle',
            duration: 1500
          })
          this.inputContent = ''
          this.init()
        }
      )
    },
    showDialog (flag) {
      this['show' + flag] = true
    },
    replyComment (topitem, toitem, index) {
      this.showCommentInput = true
      // this.selectedTopComment = topitem
      this.topCommentid = (topitem && topitem.id) || 0
      this.commentid = (toitem && toitem.id) || 0
      console.log(this.$refs)
      this.$refs['editorContainer' + index][0].appendChild(
        document.getElementById('editorChildEl')
      )
    },

    to (path) {
      this.$router.push(path)
    }
  },
  beforeDestroy () { }
}
</script>

<style lang="scss" scoped>
// .container{
//   height: 100vh;
// }
.container-inner{
  padding-bottom: 50px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 0;

}

.comment img {
  display: inline-block !important;
}
.block-box{
  position: absolute;
  z-index: 999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.75);
  & > div{
      width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    }
}
.value{
  margin-left: 4px;
}
</style>
