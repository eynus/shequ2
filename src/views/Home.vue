<template>
  <div class="container">
    <div class="container-inner pd">
      <div class="banner overflow-hidden">
        <van-swipe :autoplay="10000">
          <van-swipe-item
            class="overflow-hidden"
            v-for="(image, index) in images"
            :key="index"
          >
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div
        class="card icon-list"
        v-for="(item, index) in menuList"
        :key="index"
        @click="to(item.path)"
      >
        <div class="card-title">{{ item.title }}</div>
        <div class="card-content">
          <div
            class="item"
            :class="{ width2: item.title === '汇益坊' }"
            :key="`${index}${index1}`"
            v-for="(item1, index1) in item.list"
            @click="to(item1.path)"
          >
            <span
              :style="{ color: item1.color }"
              class="icon"
              :class="item1.icon"
            ></span>
            <div>{{ item1.title }}</div>
          </div>
        </div>
      </div>

      <div class="card article-list" @click="to(item.path)">
        <div class="card-title">精选内容</div>
        <div class="card-content">
          <div
            class="item"
            v-for="(fitem, findex) in policyList"
            :key="`sm1_${findex}`"
            @click="to(`/${fitem.source}-detail?id=${fitem.id}`)"
          >
            <div class="my-1 flex justify-between">
              <div class="title">{{ fitem.title }}</div>
              <van-tag
                v-if="
                  fitem.type2 === '活动抢先看' ||
                  fitem.type2 === '政策最先知' ||
                  fitem.type2 === '新闻及时送' ||
                  fitem.type2 === '治理第一线'
                "
                type="primary"
                >{{ fitem.type2 }}</van-tag
              >
              <van-tag v-else-if="fitem.type2 === '望峰论坛'" type="success">{{
                fitem.type2
              }}</van-tag>
              <van-tag
                v-else-if="
                  fitem.type2 === '党建服务' ||
                  fitem.type2 === '办事流程' ||
                  fitem.type2 === '公告通知'
                "
                type="danger"
                >{{ fitem.type2 }}</van-tag
              >
              <van-tag v-else type="warning">{{ fitem.type2 }}</van-tag>
            </div>
            <p class="break-all my-1">
              {{ fitem.content }}
            </p>

            <Note :view="fitem.visibility" :time="fitem.posttime" />
          </div>
        </div>
      </div>
    </div>

    <footer-tabbar />
  </div>
</template>

<script>
import { Icon, Button, Tabbar, TabbarItem, Swipe, SwipeItem } from 'vant'
import { mapMutations } from 'vuex' // createNamespacedHelpers

import Note from 'components/Note.vue'
import { searchInfo, visitLog } from '@/api/global.js'
export default {
  name: 'home',
  data () {
    return {
      // img,
      value: 1,
      policyList: [],
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      menuList: [
        {
          title: '乐亭驿站',
          list: [
            {
              title: '政策最先知',
              icon: 'iconfont icon-zhengce',
              path: '/policy-list',
              color: 'rgb(55, 211, 9)'
            },
            {
              title: '活动抢先看',
              icon: 'iconfont icon-huodong',
              path: '/activity-list',
              color: 'rgb(44, 74, 240)'
            },
            {
              title: '新闻即时送',
              icon: 'iconfont icon-nav_fabuxinwen',
              path: '/news-list',
              color: 'rgb(18, 44, 197)'
            },
            {
              title: '治理第一线',
              icon: 'iconfont icon-yinhuanzhili3',
              path: '/cure-list',
              color: 'rgb(4, 184, 184)'
            }
          ]
        },
        {
          title: '资讯发布',
          list: [
            {
              title: '公告通知',
              icon: 'iconfont icon-gonggaotongzhi',
              path: '/news-list',
              color: 'rgb(8, 137, 221)'
            },
            {
              title: '办事流程',
              icon: 'iconfont icon-daibanshixiang',
              path: '/handle-list',
              color: 'rgb(5, 199, 123)'
            },
            {
              title: '党建服务',
              icon: 'iconfont icon-dangjian1',
              path: '/service-list',
              color: 'rgb(250, 158, 4)'
            }
          ]
        },
        {
          title: '汇益坊',
          list: [
            {
              title: '日间照料中心',
              icon: 'icon2 iconfont icon-aixin',
              path: '/care-list',
              color: 'rgb(246, 223, 2)'
            },
            {
              title: '康复驿站',
              icon: 'icon2 iconfont icon-kangfuyizhan',
              path: '/recure-list',
              color: 'rgb(76, 229, 177)'
            },
            {
              title: '残疾人之家',
              icon: 'icon2 iconfont icon-canjiren',
              path: '/unhealth-list',
              color: 'rgb(250, 6, 202)'
            },
            {
              title: '儿童关爱之家',
              icon: 'icon2 iconfont icon-ertong',
              path: '/child-list',
              color: 'rgb(217, 6, 248)'
            },
            {
              title: '慈善会',
              icon: 'icon2 iconfont icon-minzhengtubiao',
              path: '/charity-list',
              color: 'rgb(246, 68, 6)'
            }
          ]
        }

      ]
    }
  },
  components: {
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    Note
  },
  created () {
    visitLog()
    this.getList()
  },
  computed: {

  },
  methods: {
    getList (data, container) {
      const params = {
        pageIndex: 1,
        pageSize: 8,
        info: ''
      }
      searchInfo(params).then(res => {
        const re = res.data.data

        this['policyList'] = re.map(r => ({
          ...r,
          type2: r.type.replace('乐亭驿站', '').replace('资讯发布', '')
        }))
      })
    },

    to (path) {
      this.$router.push(path)
    },
    ...mapMutations({
      logout: 'user/LOGOUT'
    })
  }
}
</script>
<style lang="scss" scoped>
.container-inner{
  padding-bottom: 50px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 0;

}
.icon-list{

  .item{
    // font-size: 12px;
    display: inline-block;
    width: 25%;
    margin-bottom: 8px;
    text-align: center;
    font-size: 12px;
    &.width2{
      width: 25%;
    }
    .icon{
      text-align: center;
      font-size:30px;

    }

  }
}

.banner {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
}

</style>
