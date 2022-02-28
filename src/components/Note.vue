<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-02-27 09:45:36
 * @LastEditTime: 2022-02-27 22:17:52
-->
<template>
  <div class="box mt text-desc">
    <div class="note-box">
      <div class="note-box-inner">
        <div class="icon-item comment" v-if="comment || comment === 0">
          <div class="icon-item-inner">
            <van-icon name="comment" size="large" />
            <span class="value">{{ comment || 0 }}</span>
          </div>
        </div>
        <div class="icon-item view" v-if="view || view === 0">
          <div class="icon-item-inner">
            <van-icon name="eye" size="large" />
            <span class="value">{{ view || 0 }}</span>
          </div>
        </div>
        <div class="icon-item time" v-if="time">
          <div class="icon-item-inner">
            {{ time | myFormatDate('YYYY-MM-DD HH:mm') }}
          </div>
        </div>
        <div
          class="icon-item edit-item"
          v-if="showEdit"
          @click="handleSubmit('handleSubmitEdit')"
        >
          <van-icon name="edit" size="large" />
        </div>
        <div
          class="icon-item del-item"
          v-if="showDelete"
          @click="handleSubmit('handleSubmitDelete')"
        >
          <van-icon name="delete" size="large" />
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'note',
  props: {
    id: {
      type: [String, Number],
      default: ''
    },
    view: {
      type: [String, Number],
      default: ''
    },
    comment: {
      type: [String, Number],
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    showDelete: {
      type: Boolean,
      default: false
    }

  },
  methods: {
    handleSubmit (e) {
      this.$emit(e, this.id)
    }
  }

}
</script>

<style lang="scss" scoped>
.box{
  height: 24px;
}
.note-box{
  position: relative;
  &-inner{
    position: absolute;
    right: 0;
    .del-item .van-icon{
      color: $--color-red;
    }
    .edit-item .van-icon {
      color:$--color-green;
    }
    .icon-item{
      display: inline-block;
      margin: 0 6px;
      &-inner{
        display: flex;
        align-items: center;
        .value{
          display: inline-block;
          width: 30px;
        }
      }
    }
  }
}
</style>
