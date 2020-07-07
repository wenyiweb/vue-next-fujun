<template>
    <apply-user-list :applyType="state.applyType" :pageNum="state.pageNum" :title="state.title"></apply-user-list>
</template>

<script>
import ApplyUserList from '@/components/apply-user-list'
import { reactive } from 'vue'
export default {
  setup () {
    const state = reactive({
      pageNum: 1,
      applyType: 3,
      title: '申请名单'
    })
    return { state }
  },
  components: {
    ApplyUserList
  }
}
</script>
