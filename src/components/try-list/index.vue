<template>
  <div class="trygoods" ref="trying">
    <list-view :listType="state.listType" class="try-list" :nomore="state.nomore" :data="state.tryingList" @select="selectItem" @to-apply-list="toApplyList" @scroll-end="scrollEnd"></list-view>
    <!-- <router-view></router-view> -->

      <transition
        name="slide"
        mode="in-out"
      >
        <router-view></router-view>
      </transition>
  </div>
</template>
<script>
import ListView from '@/base/list-view'
import { getTryList } from '@/api/tryapi'
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
const OK_CODE = 200
export default {
  props: {
    listType: {
      type: Number
    }
  },
  setup (props) {
    const store = useStore()
    const state = reactive({
      isLoading: false,
      pageNum: 1,
      tryingList: [],
      nomore: false
    })
    function _getTryList () {
      if (!state.isLoading && !state.nomore) {
        state.isLoading = true
        getTryList(state.pageNum, props.listType).then((res) => {
          if (res.code === OK_CODE) {
            state.isLoading = false
            if (res.data.length === 0) {
              state.nomore = true
            } else {
              state.tryingList.push(...res.data)
            }
          }
        })
      }
    }
    function selectItem (tryitem) {
      if (props.listType === 3) {
        router.push({
          path: `/trying/${tryitem.id}`
        })
      } else {
        router.push({
          path: `/tryend/${tryitem.id}`
        })
      }
      store.dispatch('trys/setTryItem', tryitem.id)
    }
    function toApplyList (id) {
      if (props.listType === 3) {
        router.push({
          path: `/applys-list/${id}`
        })
      } else {
        router.push({
          path: `/winner-list/${id}`
        })
      }
      store.dispatch('trys/setTryItem', id)
    }
    function scrollEnd () {
      _loadNextPage()
    }
    function _loadNextPage () {
      state.pageNum++
      _getTryList()
    }
    onMounted(() => {
      _getTryList()
    })
    return {
      state,
      selectItem,
      toApplyList,
      scrollEnd,
      _loadNextPage
    }
  },
  components: {
    ListView
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/assets/scss/_variable.scss";
  .trygoods{
    position: fixed;
    width: 100%;
    top: 80*$n;
    bottom: 0;
    .try-list{
      height: 100%;
      overflow: hidden;
      padding-bottom: 30*$n;
    }
  }
</style>
