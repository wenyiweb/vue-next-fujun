<template>
  <apply-user-list :applyType="state.applyType" :title="state.title"></apply-user-list>
</template>

<script>
import ApplyUserList from '@/components/apply-user-list'
import { reactive } from 'vue'
export default {
  setup () {
    const state = reactive({
      applyType: 4,
      title: '中奖名单'
    })
    return { state }
  },
  components: {
    ApplyUserList
  }
}
</script>
