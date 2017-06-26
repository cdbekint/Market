<template>
  <div class="activeCount">
    <div class="countheader">

    </div>
    <ul class="countList" v-if="!countDownData.over">
      <li v-text="countDownData.days"></li>
      <li>天</li>
      <li v-text="countDownData.hours"></li>
      <li>：</li>
      <li v-text="countDownData.minus"></li>
      <li>：</li>
      <li v-text="countDownData.second"></li>
      <div class="clearfix"></div>
    </ul>
    <div class="isover" v-if="countDownData.over">
      活动已结束
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  name: 'activeCount',
  props: [ 'endDate' ],
  data () {
    return {
      countDownData: {
        days: '0',
        hours: '0',
        minus: '0',
        second: '0',
        realCount: '0',
        over: false
      },
      interval: {}
    }
  },
  created(){
    setTimeout(()=>{
      const countTime = moment(this.endDate).format('X') - moment().format('X')
      if (countTime < 0) {
        this.countDownData.over = true
        clearInterval(this.interval)
        return
      }
      this.countDownData.realCount = ~~(countTime)
      const _this = this
      this.interval = setInterval(function () {
        _this.getCount()
      }, 1000)
    },1000)
  },
  methods: {
    getCount () {
      var time = this.countDownData.realCount
      if (time <= 0) {
        clearInterval(this.interval)
        this.countDownData.over = true
        return
      }
      var days = ~~(time / 60 / 60 / 24)
      var hours = ~~((time - days * 60 * 60 * 24) / 60 / 60)
      var minus = ~~((time - days * 60 * 60 * 24 - hours * 60 * 60) / 60)
      var second = ~~((time - days * 60 * 60 * 24 - hours * 60 * 60 - minus * 60))
      hours = hours < 10 ? ('0' + hours) : hours
      minus = minus < 10 ? ('0' + minus) : minus
      second = second < 10 ? ('0' + second) : second
      this.countDownData.days = days
      this.countDownData.hours = hours
      this.countDownData.minus = minus
      this.countDownData.second = second
      this.countDownData.realCount--
    }
  }

}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
rrem(val){
  return (val/144px)rem
}
.activeCount
  width: calc(100% - 10px)
  padding:0px 2px 0 10px
  display:block

.countList
  width:100%
  margin:0 auto
  padding:0px
  li
    list-style:none
    float:left
    width:14.25%
    text-align:center
    color red
    font-size rrem(37px)
</style>
