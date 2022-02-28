<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 20:09:33
-->
<template>
  <div class="">
    <!-- 输入 -->
    <input-box
      ref="inputBox"
      :type="'textarea'"
      content-type="rich"
      :rows="4"
      @focus="onInputFocus"
      @blur="onInputBlur"
      @keyup.enter.ctrl.exact.native="handlerSubmit"
      v-model="inputContent"
      :placeholder="'请输入评论内容'"
      :focused="showInlineButton"
      class="input-box"
    >
      <div
        v-if="inline"
        :class="['input-append', { hasbg: !showInlineButton }]"
        slot="append"
      >
        <emoji-picker
          ref="emojiPicker"
          trigger-pick="click"
          @activated="inputBoxFocused = true"
          @selected="handlerEmojiSelected"
          picker-position="left"
          :button-text-visible="false"
        ></emoji-picker>
      </div>
    </input-box>
    <!-- 提交按钮 -->
    <transition name="button">
      <van-button
        type="primary"
        @click="handlerSubmit"
        :disabled="!inputContent"
        ref="button"
        v-show="showInlineButton && inline"
        >{{ buttonText }}</van-button
      >

      <!-- <div
        @click="handlerSubmit"
        class="submit-btn inline"
        :disabled="!inputContent"
        ref="button"
        v-show="showInlineButton && inline"
      >
        {{ buttonText }}
      </div> -->
    </transition>
    <!-- 表情弹框 -->
    <div class="footer-action" v-if="!inline">
      <emoji-picker
        trigger-pick="click"
        @activated="$refs.inputBox.focus()"
        @selected="handlerEmojiSelected"
      ></emoji-picker>
      <!-- <span class="submit-tiptext">Ctrl + Enter</span> -->
      <van-button
        type="primary"
        @click="handlerSubmit"
        class="submit-btn"
        :disabled="!inputContent"
        size="small"
      >
        {{ buttonText }}
      </van-button>
    </div>
  </div>
</template>

<script>
// import { forum } from '@/api/forum.js'
import InputBox from '@/components/InputBox.vue'
import EmojiPicker from '@/components/EmojiPicker.vue'
export default {
  name: 'Home',
  components: { InputBox, EmojiPicker },
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
      inputContent: '',
      inputBoxFocused: false,
      id: '',
      topCommentid: 0,
      commentid: 0
    }
  },
  created () {
  },
  watch: {
    data: {
      handler: function (newV) {
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    showInlineButton () {
      return !!(this.inputBoxFocused || this.inputContent)
    }
  },
  destroyed () {
    document.removeEventListener('click', this.hideButton)
  },
  mounted () {
    document.addEventListener('click', this.hideButton)
  },
  methods: {
    // 评论
    focus () {
      this.$refs.inputBox.focus()
    },
    hideButton () {
      // if (this.$refs.container.contains(e.target)) {
      //   return
      // }
      // if (!this.$refs.container.contains(e.target)) {
      //   this.inputBoxFocused = false
      // }
    },
    onInputFocus () {
      this.inputBoxFocused = true
    },
    onInputBlur (e) {
      console.log('e:', e)
      // if (this.$refs.container.contains(e.target)) {
      //   return
      // }
      this.inputBoxFocused = false
    },
    handlerSubmit (e) {
      if (e.target.hasAttribute('disabled')) {
        return
      }
      this.$emit('submit', this.inputContent)
      this.$refs.inputBox.clear()
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

<style lang="scss" scoped></style>

<style scoped lang="scss">
.border-1 {
  border-bottom: 1px solid #eee;
}
 img {
  display: inline-block !important;
}
.input-wrapper {
  &.inline {
    display: flex;
    .input-box {
      flex: 1;
      margin-right: 14px;
    }
  }
  .input-append {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    &.hasbg {
      background: #eee;
    }
  }
}

.footer-action {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.submit-tiptext {
  margin-left: auto;
  margin-right: 4px;
  font-size: 14px;
  color: #ccc;
}
.submit-button {
  align-self: center;
  transition: all 0.2s;
  // background: #409eff;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  // font-size: 0.875rem;
  padding: 4px 8px;
  // color: white;
  user-select: none;
  &.button-enter,
  &.button-leave-to {
    // zoom:0;
    margin-left: -40px;
    transform: scale(0, 0);
  }
  &[disabled] {
    cursor: not-allowed;
    background: #66b1ff;
  }
  &:hover {
    background: #66b1ff;
  }
  &:not([disabled]):active {
    background: #3a8ee6;
  }
}
</style>
