<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 21:53:29
-->
<template>
  <div id="" class="container">
    <div class="container-inner">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        class="article-list pd"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="card"
            v-for="(pitem, index) in list"
            :key="`a_${index}`"
            @click="view(pitem)"
          >
            <div class="list-item-head">
              <div>
                <span
                  class="role"
                  :class="{ 'text-red-600': pitem.userName === '管理员' }"
                  >{{ pitem.userName }}</span
                >
                <span class="">{{ pitem.info }}</span>
              </div>
              <div>
                <!-- <span v-if="pitem.viewed" class="viewed my-btn">已读</span> -->
                <van-tag v-if="pitem.viewed" type="success">已读</van-tag>
                <!-- <span v-else class="unviewed my-btn">未读</span> -->
                <van-tag v-else type="warning">未读</van-tag>
              </div>
            </div>

            <p class="break-all detail">
              {{ pitem.title }}
            </p>

            <Note :time="pitem.posttime" />
          </div>
        </van-list>
      </van-pull-refresh>

      <!-- <vo-pages
        :data="list"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
        :loadedAll="loadedAll"
      >
        <div
          class="border-1 list-item card"
          v-for="(pitem, pindex) in list"
          :key="`p_${pindex}`"
          @click="view(pitem)"
        >
          <div>
            <div class="list-item-head">
              <div>
                <span
                  class="role"
                  :class="{ 'text-red-600': pitem.userName === '管理员' }"
                  >{{ pitem.userName }}</span
                >
                <span class="">{{ pitem.info }}</span>
              </div>
              <div>
                <span v-if="pitem.viewed" class="viewed">已读</span>
                <span v-else class="unviewed">未读</span>
              </div>
            </div>

            <p class="break-all detail">
              {{ pitem.title }}
            </p>

            <Note :time="pitem.posttime" />
          </div>
        </div>
      </vo-pages> -->
    </div>
    <footer-tabbar />
  </div>
</template>

<script>
import { noticeInfo } from '@/api/user.js'
export default {
  name: 'detail',
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,

      // total: 0,
      loadedAll: false
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.getList()
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.getList()
  },
  // mounted () {
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  methods: {
    // pullingDown () {
    //   this.beforePullDown = false
    //   this.currentPage = 1
    //   this.getList(false)
    // },
    // pullingUp () {
    //   this.currentPage += 1
    //   this.getList()
    // },
    onLoad () {
      if (this.refreshing && this.currentPage === 1) {
        this.list = []
        this.refreshing = false
      }

      this.getList()
    },
    onRefresh () {
      this.currentPage = 1
      // 清空列表数据
      this.finished = false

      this.loading = true
      this.onLoad()
    },
    async getList (container = 'list') {
      const params = {
        action: 'list',
        pageIndex: this.currentPage,
        pageSize: this.pageSize
        // source: 'activity'
      }
      const res = await noticeInfo(params)
      this.loading = false
      this.currentPage++
      res.data.data.forEach(element => {
        this.list.push(element)
      })
      if (this.list.length >= res.data.totalCount) {
        this.finished = true
      }
    },
    view (item) {
      const params = {
        action: 'view'
      }
      const data = { id: item.id }
      noticeInfo(params, data).then(() => {
        this.to(`/${item.source}-detail?id=${item.detailid}`)
      })
    },
    to (path) {
      this.$router.push(path)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    handleScroll () {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      var windowHeitht =
        document.documentElement.clientHeight || document.body.clientHeight
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight
      // 是否滚动到底部的判断
      if (scrollTop + windowHeitht >= scrollHeight) {
        if (this.currentPage < Math.ceil(this.total / this.pageSize)) {
          ++this.currentPage
          this.getList()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

  .list-item-head{
    display: flex;
    justify-content: space-between;
    .viewed,.unviewed{
      padding: 0 10px;
    }
    .viewed{
      background-color: $--color-primary-bg;
    }
    .unviewed{
      background-color: $--color-yellow-bg;
    }

}
.container-inner{
  padding-bottom: 50px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 0;

}
</style>
