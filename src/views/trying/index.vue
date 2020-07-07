<template>
  <try-list :listType="state.listType"></try-list>
</template>

<script>
import { reactive } from 'vue'
import TryList from '@/components/try-list'
export default {
  setup () {
    const state = reactive({
      listType: 3
    })
    return {
      state
    }
  },
  components: {
    TryList
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
