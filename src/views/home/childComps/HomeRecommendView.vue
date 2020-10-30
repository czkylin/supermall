<template>
  <div class="recommend">
    <div class="remomend-item" v-for="item in recommends" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>
.recommend {
  display: flex;
  padding: 10px 0 20px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  border-bottom: 8px solid #eee;
}
.remomend-item {
  flex: 1
}
.remomend-item img {
  margin-bottom: 10px;
  width: 70px;
  height: 70px;  
}
.recommend p {
  text-align: center;
}
</style>