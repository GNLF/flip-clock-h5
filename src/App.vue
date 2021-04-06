<template lang="pug">
.lock-screen(:class="{ screenTransform: screenTransform }")
  .clock-container.mobile
    .mode
      flip-item(:total="2" :current="timeArr[0]")
      flip-item(:total="9" :current="timeArr[1]")
    .colon
    .mode
      flip-item(:total="5" :current="timeArr[2]")
      flip-item(:total="9" :current="timeArr[3]")
    .colon
    .mode
      flip-item(:total="5" :current="timeArr[4]")
      flip-item(:total="9" :current="timeArr[5]")
  .date(:class="screenTransform ? 'horizontal' : 'vertical'")
    p {{ date }}
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import FlipItem from './components/FlipItem.vue'
import { getTimeArr, getDate } from './utils'

const timeArr = ref<number[]>([])
const screenTransform = ref<boolean>(window.innerHeight < window.innerWidth)
const date = ref<string>('')

onBeforeMount(() => {
  startTimer()
  window.onresize = () => {
    screenTransform.value = window.innerHeight < window.innerWidth;
  }
})

let timer: number = 0
const startTimer = (): void => {
  timer = setTimeout(() => {
    clearTimeout(timer)
    timeArr.value = getTimeArr()
    date.value = getDate(new Date(), '{y}-{m}-{d}')
    startTimer()
  }, 1000)
};

</script>

<style lang="stylus">
*,
:after,
:before
  -webkit-box-sizing inherit
  box-sizing inherit

html
  text-rendering optimizeLegibility
  font-family Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif

p,
ul
  margin 0
  padding 0

.lock-screen
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  display flex
  align-items center
  justify-content center
  flex-direction column
  background-color #1f1f1f
  z-index 1002
  &.modalShow
    filter blur(4px)

  .open-lock
    position absolute
    top 20px
    left 50%
    transform translateX(-50%)
    display flex
    align-items center
    text-align center
    justify-content center
    flex-wrap wrap
    color #e2e2e2
    font-size 1.5rem
    cursor pointer
    .el-icon-lock
      font-size 2rem
      width 100%
      margin-bottom 10px


  .date
    position absolute
    font-size 1.2rem
    font-weight bold
    color #d7d6d6
    width 100%
    height 30px
    line-height 30px
    text-align center
    // color transparent
    // background-image linear-gradient(to right, #8E2DE2, #4A00E0)
    // background-clip text
    // -webkit-background-clip text
    &.vertical
      bottom 20px
      left 0

    &.horizontal
      top 20px
      right 0

#weather
  position absolute
  top 0
  left 0
  z-index 1000000
  color #e2e2e2
  width 100%

.screenTransform
  .clock-container.mobile
    flex-wrap nowrap
    .mode
      transform scale(1)

.clock-container
  display flex
  align-items center
  &.mobile
    flex-wrap wrap
    justify-content center
    .mode
      width 100%
      justify-content center

    .colon
      visibility hidden


  .mode
    transition all 0.3s
    display flex


.colon
  height 50px
  padding 0 10px
  display flex
  justify-content space-around
  flex-direction column
  &::after,
  &::before
    content ""
    display block
    width 10px
    height 10px
    background rgba(0, 0, 0, 0.7)
    border-radius 50%
</style>
