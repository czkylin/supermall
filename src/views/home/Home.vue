<template>
  <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行', '新款', '精选']"
                     @tabClick="tabClick" 
                     ref="tabControl1"
                     class="tab-control"
                     v-show="isTabFixed"/>
      <scroll class="content" 
              ref="scroll" 
              :probe-type="3" 
              @scroll="contentScroll"
              :pull-up-load="true"              
              @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <feature-view/>
        <tab-control :titles="['流行', '新款', '精选']"
                     @tabClick="tabClick" 
                     ref="tabControl"/>
        <goods-list :goods="showGoods"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Scroll from '@/components/common/scroll/Scroll'

import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata, getHomeGoods} from '@/network/home'
import {itemListenerMixin, backTopMixin} from '@/common/mixin'

export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,      
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        dKeywords: [],
        keywords: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      console.log(this.saveY);
      this.$refs.scroll.refresh()
      this.$nextTick(() => {
        this.$refs.scroll.scrollTo(0, this.saveY)
      })
      this.$refs.scroll.refresh()      
    },
    deactivated() {
      console.log(this.$refs.scroll.scroll.y);
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 2.取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      // this.$nextTick(() => {
      //   console.log(this.$refs.scroll);
      //   this.$refs.scroll.refresh()
      // })      
    },
    mounted() {
      // 3.监听item中图片加载完成
    },
    methods: {
      // 事件监听
      tabClick(index) {
        switch(index) {
          case 0: 
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl1.currentIndex = index
      },
      contentScroll(position) {
        // console.log(position.y);
        // 1.判断BackTop是否显示
        this.listenShowBackTop(position)
        // 2.决定tabControl是否吸顶(position: fixed)
        // console.log(this.tabOffsetTop);
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('111111');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      // 网络请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res.data);
          this.banners = res.data.banner.list
          this.dKeywords = res.data.dKeyword.list
          this.keywords = res.data.keywords.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 完成上拉加载更多 
          this.$refs.scroll.finishPullUp()
        })
      }

    }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  padding: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时使用 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
} */
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>