<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-02-27 09:45:36
 * @LastEditTime: 2022-02-27 22:11:22
-->
<template>
  <div class="box text-desc">
    <div class="font-bold pb text-primary article-title">
      <span>{{ title }}</span>
    </div>
    <div class="note-box pb">
      <div class="note-box-inner">
        <div class="icon-item view" v-if="view || view === 0">
          <div class="icon-item-inner">
            <van-icon name="eye" size="large" />
            <span class="value">{{ view || 0 }}</span>
          </div>
        </div>
        <div class="icon-item time" v-if="time">
          <div class="icon-item-inner">
            {{ time | myFormatDate('YYYY-MM-DD HH:MM') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'note',
  props: {

    view: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: [String, Number],
      default: ''
    },
    time: {
      type: String,
      default: ''
    }

  },
  methods: {
  }

}
</script>

<style lang="scss" scoped>
// .box{
//   height: 24px;
// }
.note-box{
  // position: relative;
  &-inner{
    display: flex;
    align-items: center;
    .icon-item{
      display: inline-block;
      margin: 0 6px;
      .icon-item-inner{
        display: flex;
        align-items: center;
        .value{
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
