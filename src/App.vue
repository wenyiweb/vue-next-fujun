<template>
  <div id="app">
    <div class="tab">
      <div class="tab-item">
        <router-link to="/trying">进行中</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/tryend">已结束</router-link>
      </div>
    </div>
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <router-view :name="viewName" v-slot="{ Component }">
      <transition
        name="slide"
        mode="out-in"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <!-- <router-view name="applyList"></router-view>
    <router-view name="winnerList"></router-view> -->
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup () {
    const viewName = ref('default')
    return {
      viewName
    }
  }
}
</script>
<style lang="scss">
  @import "assets/scss/_variable.scss";
  @import "assets/scss/_mixin.scss";

  html{
    background-color: #F2F7F7;
  }
  .tab{
    display: flex;
    width:100%;
    height:80*$n;
    line-height:80*$n;
    background-color:#fff;
    position: relative;
    .tab-item{
      flex:1;
      text-align: center;
      & > a{
            display: block;
            font-size: 28*$n;
            color:$black;
            &.router-link-active{
               color: $origin;
               @include border-1px($border-origin)
             }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translate(-30px, 0);
  }
  .slide-leave-to,
  .slide-enter-from {
    opacity: 0;
    transform: translate(300px, 0);
  }
</style>
