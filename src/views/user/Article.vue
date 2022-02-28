<!--
 * @Description:
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-28 00:00:26
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
              :showEdit="true"
              :showDelete="true"
              @handleSubmitEdit="handleSubmitEdit"
              @handleSubmitDelete="handleSubmitDelete"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <footer-tabbar />
  </div>
</template>

<script>
import { forum } from '@/api/forum.js'
// import { Dialog } from 'vant'
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
      refreshing: false,
      selectedRow: {}
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
    getList (action = 'list', data = {}, cb) {
      const params = {
        action,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        info: this.searchVal,
        mine: 1,
        order: 'id desc'
      }
      forum(params, data).then(res => {
        if (!cb) {
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
        } else {
          cb()
        }
      })
    },
    to (path) {
      this.$router.push(path)
    },

    handleSubmitEdit (id) {
      this.to(`/forum-editor?type=Edit&id=${id}`)
    },
    handleSubmitDelete (id) {
      this.$dialog.confirm({
        title: '',
        message: '是否确认删除文章？'
      })
        .then(() => {
          this.getList('delete', { id }, () => {
            this.$toast({
              message: '删除成功',
              position: 'middle',
              duration: 1500
            })
            this.getList()
          })
        })
        .catch(() => {

        })
    }

  }
}
</script>
<style lang="scss" scoped>

.article-title{
  margin-bottom: 0.25rem;
}
.article-content{
   margin-bottom: 0.25rem;

}
</style>
