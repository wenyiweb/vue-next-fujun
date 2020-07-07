<template>
  <try-list :listType="state.listType"></try-list>
</template>

<script>
import TryList from '@/components/try-list'
import { reactive } from 'vue'
export default {
  setup () {
    const state = reactive({
      listType: 4
    })
    return { state }
  },
  components: {
    TryList
  }
}
</script>
