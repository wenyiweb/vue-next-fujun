<template>
  <div ref="wrapper" id="fdsa">
      <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { onMounted, ref, reactive, watchEffect } from 'vue'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  setup (props, { emit, refs }) {
    const state = reactive({
      scroll: null
    })
    const wrapper = ref(null)
    function _initScroll () {
      if (!wrapper.value) {
        return
      }
      state.scroll = new BScroll(wrapper.value, {
        probeType: props.probeType,
        click: props.click
      })
      // 是否监听滚动
      if (props.listenScroll) {
        state.scroll.on('scroll', (pos) => {
          // 向父组件派发scroll事件
          emit('scroll', pos)
        })
      }

      // 是否触发滚动底部加载更多
      if (props.pullup) {
        state.scroll.on('scrollEnd', () => {
          if (state.scroll.y <= (state.scroll.maxScrollY + 50)) {
            emit('scroll-end')
          }
        })
      }

      // 是否监听滚动开始事件
      if (props.beforeScroll) {
        state.scroll.on('beforeScrollStart', () => {
          emit('before-scroll')
        })
      }
    }
    function disable () {
      state.scroll && state.scroll.disable()
    }
    function enable () {
      state.scroll && state.scroll.enable()
    }
    function refresh () {
      state.scroll && state.scroll.refresh()
    }
    function scrollTo () {
      state.scroll && state.scroll.scrollTo.apply(state.scroll, arguments)
    }
    function scrollToElement () {
      state.scroll && state.scroll.scrollToElement.apply(state.scroll, arguments)
    }
    watchEffect(() => {
      // 监听data的变化，触发scroll的更新
      if (props.data) {
        setTimeout(() => {
          refresh()
        }, props.refreshDelay)
      }
    })
    onMounted(() => {
      // 在DOM渲染完成之后初始化better-scroll
      setTimeout(() => {
        _initScroll()
      }, 20)
    })
    return {
      state,
      wrapper,
      disable,
      enable,
      refresh,
      scrollTo,
      scrollToElement
    }
  }
}
</script>
<style>

</style>
