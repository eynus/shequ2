<!--
 * @Description: 
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-08 13:36:43
-->
<template>
  <div id="" class="w-full h-full">
    <!-- <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="w-1 h-4 bg-red-600 rounded-xl"></div>
        <div class="ml-2 leading-6 text-gray-800">
          <div  separator-class="el-icon-arrow-right">
            <div :to="{ path: '/' }"
              >我的活动</el-breadcrumb-item
            >
          </div>
        </div>
      </div>
    </div> -->
    <div class="">
      <div
        class="cursor-pointer w-full border-1 py-6"
        v-for="(aitem, index) in dataList"
        :key="`a_${index}`"
      >
        <div class="img col-span-4 lg:col-span-3" style="">
          <div
            class="text-xl font-bold truncate text-gray-900"
            @click="to(`/activity-detail?id=${aitem.id}`)"
          >
            <span>{{ aitem.title }}</span>
            <span class="text-green-500">【{{ aitem.status }}】</span>
          </div>
          <div class="text-sm text-gray-400 mb-1">
            <div
              class="text-sm pr-2 inline-block"
              @click="to(`/activity-detail?id=${aitem.id}`)"
            >
              {{ aitem.posttime | myFormatDate('YYYY-MM-DD HH:mm') }}
            </div>
            <div
              class="px-2 inline-block"
              @click="to(`/activity-detail?id=${aitem.id}`)"
            >
              <i class="el-icon-view"></i>
              <span class="ml-1">{{ aitem.visibility }}</span>
            </div>
            <div
              class="px-2 inline-block text-blue-400"
              @click="signdown(aitem.id)"
            >
              <span
                class="
                  ml-1
                  bg-blue-400
                  text-white
                  p-1
                  text-xs
                  hover:bg-blue-500
                "
                >取消报名</span
              >
            </div>
          </div>
          <img
            @click="to(`/activity-detail?id=${aitem.id}`)"
            :src="
              (aitem.images[0] &&
                GlobalCfg.apiUrl + aitem.images[0].filePath) ||
              '../../assets/images/demo.png'
            "
            alt="展示图"
          />
        </div>
        <div @click="to(`/activity-detail?id=${aitem.id}`)">
          <div class="text-gray-600 mb-1">
            <div class="pr-2">
              <span class="font-bold w-24">报名人数</span>
              <span class="ml-1"
                ><i class="el-icon-user m-1"></i>
                <span class="ml-1">{{ aitem.signCount || 0 }}</span>
                <span>人</span></span
              >
            </div>
            <div class="pr-2">
              <span class="font-bold w-24">报名时间</span>
              <span class="ml-1">
                <!-- <i class="el-icon-date m-1"></i> -->
                <span>{{
                  aitem.startSignTime | myFormatDate('YYYY-MM-DD hh:mm')
                }}</span>
                <span class="mx-1">-</span>
                <!-- <i class="el-icon-date m-1"></i> -->
                <span>{{
                  aitem.endSignTime | myFormatDate('YYYY-MM-DD hh:mm')
                }}</span>
              </span>
            </div>
            <div class="pr-2">
              <span class="font-bold w-24">活动时间</span>
              <span class="ml-1">
                <!-- <i class="el-icon-date m-1"></i> -->
                <span>{{
                  aitem.startTime | myFormatDate('YYYY-MM-DD hh:mm')
                }}</span>
                <span class="mx-1">-</span>
                <!-- <i class="el-icon-date m-1"></i> -->
                <span>{{
                  aitem.endTime | myFormatDate('YYYY-MM-DD hh:mm')
                }}</span>
              </span>
            </div>
            <div class="pr-2">
              <div class="font-bold w-24">活动内容</div>
              <p class="break-all text-gray-600">
                {{ aitem.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { noticeInfo } from '@/api/user.js'
import { getActivityList } from '@/api/activity.js'

export default {
  name: 'detail',
  data () {
    return {
      currentPage: 1,
      pageSize: 2,
      dataList: [],
      total: 0
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    signdown (id) {
      this.$confirm('确定取消报名?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            action: 'signdown'
          }
          getActivityList(params, { activityid: id }).then(() => {
            this.$toast({
              message: '取消成功',
              position: 'middle',
              duration: 1500
            })
            this.getList()
          })
        })
        .catch(() => { })
    },
    getList (container = 'dataList') {
      const params = {
        action: 'list',
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        mine: 1,
        order: 'id desc'
      }
      getActivityList(params).then(res => {
        this.total = res.data.totalCount
        if (container) {
          if (this.currentPage === 1) {
            this[container] = res.data.data
          } else {
            this[container] = this[container].concat(res.data.data)
          }
        }
      })
    },
    to (path) {
      this.$router.push(path)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList({}, 'dataList')
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList({}, 'dataList')
    },
    handleScroll () {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      var windowHeitht =
        document.documentElement.clientHeight || document.body.clientHeight
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight
      //是否滚动到底部的判断
      if (scrollTop + windowHeitht >= scrollHeight) {
        if (this.currentPage < Math.ceil(this.total / this.pageSize)) {
          ++this.currentPage
          this.getList();
        }

      }
    },
  }
}
</script>
