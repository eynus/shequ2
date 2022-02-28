<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 17:33:56
-->
<template>
  <div id="" class="w-full flex items-center justify-center h-full">
    <div class="h-full mt-2 md:mt-0 w-full xl:w-5/6">
      <!-- 精选论坛 -->
      <div class="bg-white rounded-sm shadow p-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-1 h-4 bg-red-600 rounded-xl"></div>
            <div class="ml-2 leading-6 text-gray-800"></div>
          </div>
        </div>

        <!-- 正文 -->
        <div class="py-6 px-2 mb-8">
          <div class="text-xl font-bold truncate text-gray-900">
            <span>{{ data.title }}</span>
          </div>
          <!-- 作者，时间 -->
          <div class="flex text-sm items-center text-gray-400 mt-1 mb-2">
            <div class="pr-2">
              {{ data.posttime | myFormatDate('YYYY-MM-DD HH:mm') }}
            </div>
            <div class="">
              <i class="el-icon-view"></i>
              <span class="ml-1">{{ data.visibility }}</span>
            </div>
          </div>
          <div
            class="break-all text-md text-gray-600"
            style="min-height: 200px"
            v-html="data.content"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/content.js'

export default {
  name: 'Home',
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.getList({ id: this.$route.query.id }, 'data')
  },
  mounted () { },
  methods: {
    getList (data, container) {
      const params = {
        action: 'detail'
      }
      getDetail(params, data).then(res => {
        if (container) {
          this[container] = res.data
        }
      })
    },
    showDialog (flag) {
      this['show' + flag] = true
    }
  },
  computed: {},
  beforeDestroy () { }
}
</script>

<style lang="scss" scoped></style>
