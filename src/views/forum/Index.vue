<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-27 20:13:43
-->
<template>
  <div id="" class="container">
    <van-search
      class="search-box"
      v-model="searchVal"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    ></van-search>
    <div class="filter-box pd">
      <div class="filter-box-row">
        <div class="">
          <span
            class="filter-item"
            :class="{ active: selectedDate === 'all' }"
            @click="setDate('all')"
            >全部</span
          >
          <span
            class="filter-item"
            :class="{ active: selectedDate === 'day' }"
            @click="setDate('day')"
            >一天</span
          ><span
            class="filter-item"
            :class="{ active: selectedDate === 'week' }"
            @click="setDate('week')"
            >一周</span
          >
          <span
            class="filter-item"
            :class="{ active: selectedDate === 'month' }"
            @click="setDate('month')"
            >一个月</span
          >
        </div>
        <van-button
          type="primary"
          class="button inline-block"
          size="small"
          @click="toEditor"
          >发布</van-button
        >
      </div>
      <div class="filter-box-row">
        <div class="">
          <span
            class="filter-item"
            :class="{ active: selectedFilter === 'all' }"
            @click="setFilter('all')"
            >全部</span
          >
          <span
            class="filter-item"
            :class="{ active: selectedFilter === 'top' }"
            @click="setFilter('top')"
            >置顶</span
          >
          <span
            class="filter-item"
            :class="{ active: selectedFilter === 'good' }"
            @click="setFilter('good')"
            >精华</span
          >
          <span
            class="filter-item"
            :class="{ active: selectedFilter === 'hot' }"
            @click="setFilter('hot')"
            >热帖</span
          >
        </div>
        <van-button
          type="warning"
          class="button inline-block"
          size="small"
          @click="to('/user-article')"
          >管理我的帖子</van-button
        >
      </div>
    </div>

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
            v-for="(fitem, findex) in list"
            :key="`sm1_${findex}`"
          >
            <div
              class="article-title truncate"
              @click="to(`/forum-detail?id=${fitem.id}`)"
            >
              <span v-if="fitem.isGood" class="text-red-600">【精华】</span>
              <span v-if="fitem.isTop" class="text-blue-600">【置顶】</span>
              {{ fitem.title }}
            </div>

            <div
              class="article-content break"
              @click="to(`/forum-detail?id=${fitem.id}`)"
            >
              {{ fitem.content }}
            </div>

            <Note
              :comment="fitem.commentCount"
              :view="fitem.visibility"
              :time="fitem.posttime"
              :id="fitem.id"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <footer-tabbar />
  </div>
</template>

<script>
// import Editor from '@/components/Editor'
import { forum } from '@/api/forum.js'
import { mapGetters } from 'vuex'
export default {
  name: 'list',
  // components: {
  //   [Search.name]: Search

  // },
  data () {
    return {
      searchVal: '',
      currentPage: 1,
      pageSize: 10,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      selectedRow: {},

      // 筛选
      selectedDate: 'all',
      selectedFilter: 'all'

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
    setFilter (val) {
      this.selectedFilter = val
      this.reset()
      this.getList()
    },
    setDate (val) {
      this.selectedDate = val
      this.reset()
      this.getList()
    },

    getList () {
      const params = {
        action: 'list',
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        info: this.searchVal,
        // mine: 1,
        filter: this.selectedFilter,
        date: this.selectedDate,
        order: 'id desc'
      }
      forum(params).then(res => {
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
    toEditor () {
      console.log('user', this.user)
      if (!this.user) {
        this.$dialog.confirm({
          message: '您尚未登录无法发帖，是否登录?'
        }
        ).then((v) => {
          this.$router.replace({
            path: '/login' // 到登录页重新获取token
          })
        })
      } else {
        this.$router.push('/forum-editor?type=Add')
      }
    }
    // handleScroll () {
    //   var scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop
    //   var windowHeitht =
    //     document.documentElement.clientHeight || document.body.clientHeight
    //   var scrollHeight =
    //     document.documentElement.scrollHeight || document.body.scrollHeight
    //   // 是否滚动到底部的判断
    //   if (scrollTop + windowHeitht >= scrollHeight) {
    //     if (this.currentPage < Math.ceil(this.total / this.pageSize)) {
    //       ++this.currentPage
    //       this.getList()
    //     }
    //   }
    // }
  },
  computed: {
    ...mapGetters({
      'user': 'user/user'
    })
  },
  beforeDestroy () { }
}
</script>
<style lang="scss" scoped>
// @import '../../assets/css/variables.scss';
::v-deep .van-button--small{
  height: 24px;
}

.active {
  background-color: $--vant-primary-bg;
  color: #fff;
}
.filter-box{

  height: 80px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // align-items: center;
  &-row{
    display: flex;
    justify-content: space-between;
    .filter-item{
      display: inline-block;
      margin: 0 2px;
      padding:0 6px;
      height: 24px;
      line-height: 24px;
      border-radius: 2px;
    }
  }
}
.container-inner{
  height: calc(100% - 80px - 54px) !important;
}
.article-title{
  margin-bottom: 0.25rem;
}
.article-content{
   margin-bottom: 0.25rem;

}
</style>
