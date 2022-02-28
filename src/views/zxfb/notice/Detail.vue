<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 17:32:34
-->
<template>
  <div id="" class="container text-primary">
    <van-nav-bar
      title="详情"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="container-inner container-inner-with-navbar bg-white pd">
      <top-note
        :title="data.title"
        :view="data.visibility"
        :time="data.posttime"
      ></top-note>
      <van-divider class="mt-0" />

      <div v-html="data.content"></div>
    </div>
    <footer-tabbar />
  </div>
</template>

<script>
import { getDetail } from '@/api/content.js'

export default {
  name: 'detail',
  data () {
    return {
      data: {}
    }
  },
  created () { },
  watch: {
    $route: {
      handler: function (route) {
        if (route.query.id) {
          this.getList()
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted () { },
  methods: {
    getList () {
      const params = {
        action: 'detail'
      }
      getDetail(params, { id: this.$route.query.id }).then(res => {
        this['data'] = res.data
      })
    }
  },
  computed: {},
  beforeDestroy () { }
}
</script>

<style lang="scss" scoped>
</style>
