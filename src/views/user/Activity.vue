<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 21:52:26
-->
<template>
  <div id="" class="container">
    <van-search
      class="search-box"
      v-model="searchVal"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <div class="container-inner container-inner-with-search">
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
            v-for="(aitem, index) in list"
            :key="`sm1_${index}`"
            @click="to(`/activity-detail?id=${aitem.id}`)"
          >
            <div class="" style="">
              <div>
                <span>{{ aitem.title }}</span>
                <van-tag v-if="aitem.status === '报名中'" type="primary"
                  >报名中</van-tag
                >
                <van-tag v-else-if="aitem.status === '进行中'" type="success"
                  >进行中</van-tag
                >
                <van-tag v-else-if="aitem.status === '已结束'" type="danger"
                  >已结束</van-tag
                >
                <van-tag v-else-if="aitem.status === '即将开启'" type="warning"
                  >即将开启</van-tag
                >
              </div>

              {{ aitem.content }}
            </div>
            <Note :view="aitem.visibility" :time="aitem.posttime">
              <slot name="sign">
                <span
                  v-if="aitem.status === '报名中'"
                  class="signdown-btn my-btn ml"
                  @click="signdown(aitem.id)"
                  >取消报名</span
                >
              </slot>
            </Note>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <footer-tabbar />
  </div>
</template>

<script>
import { getActivityList } from '@/api/activity.js'

export default {
  name: 'detail',
  data () {
    return {
      searchVal: '',
      currentPage: 1,
      pageSize: 10,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },

  created () { },
  mounted () { },
  methods: {
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
    onSearch () {
      this.reset()
      this.getList()
    },
    reset () {
      this.currentPage = 1
      this.finished = false
      this.list = []
    },
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
    getList () {
      const params = {
        action: 'list',
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        mine: 1,
        order: 'id desc'
      }
      getActivityList(params).then(res => {
        this.loading = false

        if (this.currentPage === 1) {
          this.list = res.data.data
        } else {
          res.data.data.forEach(element => {
            this.list.push(element)
          })
        }
        this.currentPage++
        if (this.list.length >= res.data.totalCount) {
          this.finished = true
        }
      })
    },
    to (path) {
      this.$router.push(path)
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
.signdown-btn{
  display: inline-block;
  line-height: 24px;
  background-color: $--color-yellow-bg;
}
</style>
