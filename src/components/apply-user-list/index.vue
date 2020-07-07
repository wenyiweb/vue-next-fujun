<template>
  <transition name="slide">
    <div class="container">
      <div class="header">
        <back class="icon-back" @click.prevent="back"></back>
        <h1 class="title">{{title}}</h1>
      </div>
      <div class="apply-wrapper">
        <apply-list class="list-wrapper" :applyType="applyType" :data="state.list" :nomore="state.nomore" @scroll-end="scrollEnd"></apply-list>
      </div>
    </div>
  </transition>
</template>

<script>
import ApplyList from '@/base/apply-list'
import Back from '@/base/back'
import { getApplyList } from '@/api/tryapi'
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
const ERR_OK = 200
export default {
  props: {
    applyType: {
      type: Number
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const store = useStore()
    const state = reactive({
      list: [],
      pageNum: 1,
      isLoading: false,
      nomore: false,
      firstLoad: true
    })
    const tryItem = computed(() => store.state.trys.tryItem)

    function _getApplyList () {
      if (!tryItem.value) {
        router.push('/trying')
        return
      }
      if (!state.isLoading && !state.nomore) {
        state.isLoading = true
        getApplyList(state.pageNum, props.applyType, tryItem.value).then((res) => {
          state.isLoading = false
          if (res.code === ERR_OK) {
            if (res.data.length < 10 && state.firstLoad) {
              state.nomore = true
            }
            state.firstLoad = false
            if (res.data.length === 0) {
              state.isLoading = true
              state.nomore = true
            } else {
              state.list.push(...res.data)
            }
          } else {
            if (res.data.length === 0) {
              state.isLoading = true
              state.nomore = true
            }
          }
        })
      }
    }
    function scrollEnd () {
      _loadNextPage()
    }
    function _loadNextPage () {
      state.pageNum++
      _getApplyList()
    }
    function back () {
      router.back()
    }
    onMounted(() => {
      state.list = []
      _getApplyList()
    })
    return { state, tryItem, scrollEnd, back }
  },
  components: {
    ApplyList,
    Back
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_variable.scss";
  @import "@/assets/scss/_mixin.scss";
  .slide-enter-active,.slide-leave-active{
    transition:all 0.3s
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
  .container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:300;
    background-color: #fff;
    .header{
      height:100*$n;
      width:100%;
      @include border-1px($color-e9);
      .icon-back{
        top:50%;
        transform: translateY(-50%);
      }
      .title{
        width:100%;
        height:100*$n;
        line-height: 100*$n;
        font-size:30*$n;
        font-weight: 600;
        color: #000;
        text-align: center;
      }
    }
    .apply-wrapper{
      position: absolute;
      width: 100%;
      top: 100*$n;
      bottom: 0;
      box-sizing: border-box;
      overflow: hidden;
      .list-wrapper{
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding-bottom: 40*$n;
      }
    }
  }

</style>
