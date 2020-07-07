<template>
  <transition name="slide">
    <div v-if="state.detaildata.product" class="detailpage tryendDetail">
      <item-img :item="state.detaildata" :ptype="state.ptype" :listType="state.listType"></item-img>
      <back @click.prevent="back"></back>
      <div class="infos">
        <item-info :listType="state.listType" :item="state.detaildata" :ptype="state.ptype" @toapplyList="toapplyList"></item-info>
      </div>
      <div class="applyPersons" @click="toWinerList">
        <span class="title">中奖名单</span>
        <apply-persons class="persons" :list="state.detaildata.applayed.list" :showmore="state.showmore" :limit="state.limit"></apply-persons>
        <div class="origin-arrow"></div>
      </div>
      <lineline></lineline>
      <div class="report-conter">
        <h1 class="title">有{{state.detaildata.try_report.reportsnum}}个试用报告</h1>
        <p v-if="state.detaildata.try_report.reportsnum === 0" class="nodata">暂无数据</p>
        <div v-else class="report-list">
          <div v-for="(item,index) in state.detaildata.try_report.userInfo" :key="index" class="report-item">
            <div class="avatar"><img :src="item.user_img" alt=""></div>
            <div class="content">
              <div class="userinfo">
                <span class="username">{{item.user_name}}</span>
                <div class="star-wrapper">
                  <star :size="16" :score="formatScrore(item.score)"></star>
                  <div class="score">{{item.score}}</div>
                </div>
              </div>
              <p class="desc" v-if="item.report_content">{{item.report_content}}</p>
              <div class="pic-wrapper" v-if="item.report_img.length > 0">
                <ul class="pic-list">
                  <li v-for="(pic, index) in item.report_img" :key="index" class="pic-item"><img :src="getpic(pic)" alt=""></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ItemImg from '@/base/item-img'
import ItemInfo from '@/base/item-info'
import Back from '@/base/back'
import ApplyPersons from '@/base/apply-persons'
import Line from '@/base/line'
import Star from '@/base/star'
import { getTryDetail } from '@/api/tryapi'
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
const ERR_OK = 200
export default {
  data () {
    const store = useStore()
    const state = reactive({
      detaildata: {},
      listType: 4,
      ptype: 'end',
      showmore: false,
      limit: 6
    })
    const tryItem = computed(() => store.state.trys.tryItem)
    function _getTryDetail () {
      if (!tryItem.value) {
        router.push('/tryend')
        return
      }
      getTryDetail(2, tryItem.value).then((res) => {
        if (res.code === ERR_OK) {
          res.data.product = {
            cover: res.data.cover,
            title: res.data.title
          }
          state.detaildata = Object.assign({}, state.detaildata, res.data)
        }
      })
    }
    function back () {
      router.back()
    }
    function getpic (url) {
      return 'http://thumb2.yokacdn.com/p?w=200&h=200&f=' + url
    }
    function formatScrore (score) {
      return Number(score)
    }
    function toWinerList () {
      if (!tryItem.value) {
        router.push({
          path: '/trying'
        })
        return
      }
      router.push({
        path: `/winner-list/${tryItem.value}`
      })
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
    return {
      state, tryItem, back, getpic, formatScrore, toWinerList, toapplyList
    }
  },
  components: {
    ItemImg,
    ItemInfo,
    Back,
    ApplyPersons,
    lineline: Line,
    Star
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_variable.scss";
  @import "@/assets/scss/_mixin.scss";
  ::-webkit-scrollbar {
    display: none
  }
  .slide-enter-active,.slide-leave-active{
    transition:all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform:translate3d(100%, 0, 0);
  }
  .infos{
    position: relative;
    padding:0 30*$n 10*$n 30*$n;
    margin-top:20*$n;
    @include border-1px($color-e9);
  }
  .applyPersons{
    padding:26*$n 30*$n;
    font-size:0;
    .title{
      color: $origin;
      font-size:28*$n;
      line-height: 58*$n;
      display: inline-block;
      vertical-align: top;
      margin-right:36*$n;
    }
    .persons{
      display: inline-block;
    }
    .origin-arrow{
      display: block;
      float: right;
      margin-top:18*$n;
    }
  }
  .report-conter{
    background-color: #fff;
    .title{
      font-size:28*$n;
      line-height: 80*$n;
      height: 80*$n;
      padding-left:30*$n;
      color: #000;
      @include border-1px($color-e9);
    }
    .nodata{
      width:100%;
      text-align: center;
      font-size:24*$n;
      line-height: 40*$n;
      margin-top:20*$n;
    }
    .report-list{
      padding:0 30*$n;
    }
    .report-item{
      display: flex;
      padding:20*$n 0 30*$n 0;
      @include border-1px($color-e9);
      &:last-child {
        @include border-none();
      }
      .avatar{
        flex:0 0 44*$n;
        width:44*$n;
        margin-right:8*$n;
        img{
          width:44*$n;
          height:44*$n;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .content{
        flex:1;
        overflow: hidden;
        .userinfo{
          position: relative;
          .username{
            font-size:24*$n;
            line-height: 44*$n;
            color: $color-102;
          }
          .star-wrapper{
            float: right;
            margin-top:14*$n;
            .star{
              float: left;
            }
            .score{
              font-size:22*$n;
              color: $origin;
              float: right;
              line-height: 30*$n;
              margin-top:-7*$n;
              margin-left:12*$n;
            }
          }
        }
        .desc{
          font-size:26*$n;
          line-height:42*$n;
          color: #000;
          text-align: justify;
          margin-top:8*$n;
          display: -webkit-box;
          -webkit-line-clamp:4;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient:vertical;
        }
        .pic-wrapper{
          height: 150*$n;
          margin-top:20*$n;
          width:100%;
          overflow: hidden;

          .pic-list{
            height: 150*$n;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            width:100%;
            overflow-y:hidden;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
          }
          .pic-item{
            width:150*$n;
            height:150*$n;
            overflow: hidden;
            margin-right:10*$n;
            flex:0 0 150*$n;
            position: relative;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
</style>
