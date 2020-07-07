<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
import { computed } from 'vue'
const LENGTH = 5
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  setup (props) {
    const starType = computed(() => 'star-' + props.size)
    const itemClasses = computed(() => {
      const result = []
      const score = Math.floor(props.score * 2) / 2
      const hasDecimal = score % 1 !== 0
      const integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLASS_ON)
      }
      if (hasDecimal) {
        result.push(CLASS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLASS_OFF)
      }
      return result
    })
    return {
      starType,
      itemClasses
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_variable";
  @import "@/assets/scss/_mixin";

  .star{
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-16{
      .star-item{
        width:16*$n;
        height:16*$n;
        margin-right: 7*$n;
        background-size:16*$n 16*$n;
        &:last-child{
          margin-right:0;
        }
        &.on{
          @include bg-image('star16_full');
        }
        &.half{
          @include bg-image('star16_half');
        }
        &.off{
          @include bg-image('star16_empty');
        }
      }
    }
  }
</style>
