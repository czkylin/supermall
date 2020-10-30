<template>
  <div class="cart">
      <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
export default {
    name: "Cart",
    components: {
      NavBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
      // 可以使用mapGetters函数将getters直接转换成计算属性
      // 方法一：
      ...mapGetters(['cartLength', 'cartList'])
      // 方法二：可以添加映射从而改变使用getters名称
      // ...mapGetters({
      //   length: 'cartLength',
      //   list: 'cartList'
      // })
    }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>