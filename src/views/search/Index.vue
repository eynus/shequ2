<!--
 * @Description: 
 * @Author: sunye
 * @Date: 2022-01-23 09:29:49
 * @LastEditTime: 2022-02-08 13:35:27
-->
<template>
  <div id="" class="w-full flex items-center justify-center h-full">
    <div class="h-full grid grid-cols-12 gap-2 mt-2 md:mt-0 w-full xl:w-5/6">
      <!-- 精选论坛 -->
      <div class="col-span-12 bg-white rounded-sm shadow p-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-1 h-4 bg-red-600 rounded-xl"></div>
            <div class="ml-2 leading-6 text-gray-800">
              <div separator-class="el-icon-arrow-right">
                <div>搜索结果</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 px-4">
          <div class="col-span-12">
            <div style="min-height: 400px">
              <div class="" v-if="data.length">
                <div
                  class="cursor-pointer w-full border-1 py-4"
                  v-for="(item, index) in data"
                  :key="`${index}`"
                  @click="to(`/${item.source}-detail?id=${item.id}`)"
                >
                  <div class="leading-6">
                    <div class="text-lg font-bold truncate text-gray-900">
                      <span class="text-red-500">【{{ item.type }}】</span>
                      <span>{{ item.title }}</span>
                    </div>

                    <p class="break-all text-gray-600 ml-2">
                      {{ item.content }}
                    </p>

                    <div class="flex flex-row-reverse">
                      <div class="text-gray-400">
                        {{ item.posttime | myFormatDate('YYYY-MM-DD') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="flex justify-center items-center h-full">
                <span class="text-gray-500">暂无数据</span>
              </div>
            </div>
            <div class="flex flex-row-reverse my-2">
              <div
                class="md:hidden"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total"
              ></div>
              <div
                class="hidden md:block"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchInfo } from '@/api/global.js'
export default {
  name: 'Home',
  data () {
    return {
      keywords: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      data: []
    }
  },

  watch: {
    $route: {
      handler: function (route) {
        this.keywords = route.query.keywords
        this.getList()
      },
      immediate: true
    }
  },
  created () {
    this.keywords = this.$route.query.keywords
    this.getList()
  },
  mounted () { },
  methods: {
    getList () {
      const params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        info: this.keywords
      }
      searchInfo(params).then(res => {
        this.data = res.data.data
        this.total = this.data.length
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
    }
  },
  beforeDestroy () { }
}
</script>

<style lang="scss" scoped>
.img {
  display: block;
  max-width: 100%;
}
.list-dot li {
  // margin-left: 20px;
  &::before {
    display: inline-block;
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    margin-top: 0.25rem;
    border-radius: 0.5rem;
    background-color: rgba(220, 38, 38, 0.5);
  }
}
</style>
