<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 21:51:06
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
            :key="`a_${index}`"
            @click="to(`/activity-detail?id=${aitem.id}`)"
          >
            <div class="font-bold truncate">
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

            <div class="break">
              {{ aitem.content }}
            </div>
            <Note :view="aitem.visibility" :time="aitem.posttime" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <footer-tabbar />
  </div>
</template>

<script>
// import { getList } from '@/api/content.js'
import { getActivityList } from '@/api/activity.js'
export default {
  name: 'policy',
  data () {
    return {
      searchVal: '',
      currentPage: 1,
      pageSize: 5,
      list: [],
      loading: false,
      mine: false,
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
      this.currentPage = 1
      this.finished = false
      this.list = []
      this.getList()
    },
    getList () {
      // const params = {
      //   action: 'list',
      //   pageIndex: this.currentPage,
      //   pageSize: this.pageSize,
      //   type: '乐亭驿站新闻即时送',
      //   info: this.searchVal,
      //   order: 'id desc'
      // }
      const params = {
        action: 'list',
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        mine: Number(this.mine),
        info: this.searchVal,
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
    }

  },

  beforeDestroy () { }
}
</script>
