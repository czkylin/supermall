import {debounce} from '@/common/utils'
import BackTop from '@/components/content/backTop/BackTop'
import {BACK_POSITION} from '@/common/const'
// 混入
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 3.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    // 对监听事件进行保存
    this.itemImgListener = () => {
      // console.log('-------------');
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // 4.获取tabControl的offsetTop
    // this.tabOffsetTop = this.$refs.tabControl
    // 所有的组件都有一个属性$el:用于获取组件中的元素

    // console.log(this.$refs.tabControl.$el.offsetTop);
    // console.log('混入');
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > BACK_POSITION
    }
  }
}

// 继承
// export class Animal {
//   run () {
//     console.log('run');
//   }
// }

// class Cat extends Animal {
//   // run() {

//   // }
// }

// class Dog extends Animal {
//   // run() {
    
//   // }
// }