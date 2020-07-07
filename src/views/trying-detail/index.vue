<template>
  <transition name="slide">
    <div v-if="state.detaildata.product" class="detailpage tryingDetail">
      <item-img :item="state.detaildata" :listType="state.listType"></item-img>
      <back @click.prevent="hide"></back>
      <div class="infos" >
        <item-info :listType="state.listType" :item="state.detaildata"></item-info>
      </div>
      <div v-if="state.detaildata.applayed" class="applyPersons" @click="toapplyList">
        <apply-persons :list="state.detaildata.applayed.list" :showmore="state.showmore" :limit="state.limit" class="persons"></apply-persons>
        <span class="applyNum">{{state.detaildata.applayed.applay_num}}人已申请</span>
      </div>
      <line-line></line-line>
      <div  class="product-detail">
        <h1 class="title">产品介绍</h1>
        <div class="desc">
          <p v-show="!state.openmore" class="source">{{state.detaildata.product.description}}</p>
          <p v-show="state.openmore">{{state.detaildata.product.description}}</p>
          <div class="openbtn" @click="open" :class="{opened: state.openmore}"></div>
        </div>
      </div>
      <line-line></line-line>
      <div class="rule">
        <h1 class="title">产品介绍</h1>
        <div class="desc">
          <p  v-for="(item, index) in state.detaildata.product.try_rule" :key="index">{{item}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Back from '@/base/back'
import ItemImg from '@/base/item-img'
import ItemInfo from '@/base/item-info'
import ApplyPersons from '@/base/apply-persons'
import LineLine from '@/base/line'
import { getTryDetail } from '@/api/tryapi'
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
const ERR_OK = 200
export default {
  setup () {
    const store = useStore()
    const state = reactive({
      // 进行中
      listType: 3,
      end: 'trying',
      detaildata: {},
      showmore: true,
      limit: 5,
      openmore: false
    })
    const tryItem = computed(() => store.state.trys.tryItem)
    function _getTryDetail () {
      if (!tryItem.value) {
        router.push('/trying')
        return
      }
      getTryDetail(1, tryItem.value).then((res) => {
        if (res.code === ERR_OK) {
          res.data.product.cover = res.data.cover
          res.data.product.title = res.data.title
          state.detaildata = Object.assign({}, state.detaildata, res.data)
        }
      })
    }
    function open () {
      state.openmore = !state.openmore
    }
    function hide () {
      router.back()
    }
    function toapplyList () {
      if (!tryItem.value) {
        router.push({
          path: '/trying'
        })
        return
      }
      router.push({
        path: `/applys-list/${tryItem.value}`
      })
    }
    onMounted(() => {
      _getTryDetail()
    })
    return { state, tryItem, open, hide, toapplyList }
  },
  components: {
    ItemImg,
    ItemInfo,
    ApplyPersons,
    LineLine,
    Back
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "@/assets/scss/_variable";
  @import "@/assets/scss/_mixin";
  .slide-enter-active,.slide-leave-active{
    transition:all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform:translate3d(100%,0,0)
  }
  .infos{
    position: relative;
    padding:0 30*$n 10*$n 30*$n;
    margin-top:20*$n;
  }
  .applyPersons{
    padding:0 30*$n 30*$n 30*$n;
    font-size: 0;
    .persons{
      display: inline-block;
    }
    .applyNum{
      float:right;
      font-size:24*$n;
      line-height: 40*$n;
      color: $origin;
      display: block;
      margin-top:8*$n;
    }
  }
  .product-detail,.rule{
    background-color: #fff;
    .title{
      font-size:28*$n;
      line-height: 80*$n;
      height: 80*$n;
      padding-left:30*$n;
      color: #000;
      @include border-1px($color-e9);
    }
    .desc {
      padding: 20*$n 30*$n 46*$n 30*$n;
      color: $color-153;
      position: relative;
      p {
        font-size: 24*$n;
        line-height: 40*$n;
      }
    }
  }
  .product-detail{
    .desc{
      p{
        &.source{
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp:4;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }

      }
      .openbtn{
        position: absolute;
        bottom:0;
        left:50%;
        margin-left:-14*$n;
        padding:15*$n;
        width:28*$n;
        height:16*$n;
        background-repeat: no-repeat;
        background-position: center;
        background-size:28*$n 16*$n;
        @include bg-image('arrow');
        transition:all .3s;
        &.opened{
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
