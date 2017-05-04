<template>
<div class="coutpage">
<div class="countheader">
  
</div>
  <ul class="countdowmlist" v-if="!countdowndata.over">
    <li v-text="countdowndata.days"></li>
    <li>天</li>
    <li v-text="countdowndata.hours"></li>
    <li>时</li>
    <li v-text="countdowndata.minus"></li>
    <li>分</li>
    <li v-text="countdowndata.second"></li>
    <li>秒</li>
    <div class="clearfix"></div>
  </ul>
  <div class="isover" v-if="countdowndata.over">
    时间到
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  name: 'Countdown',
  props: [ 'endDate' ],
  data () {
    return {
      countdowndata: {
        days: '0',
        hours: '0',
        minus: '0',
        second: '0',
        realcount: '0',
        over: false
      },
      interval: {}
    }
  },
  created () {
    const counttime = moment(this.endDate).format('X') - moment().format('X')
    if (counttime < 0) {
      clearInterval(this.interval)
      return
    }
    this.countdowndata.realcount = Math.floor(counttime)
    const _this = this
    this.interval = setInterval(function () {
      _this.getCount()
    }, 1000)
  },
  methods: {
    getCount () {
      var time = this.countdowndata.realcount
      if (time <= 0) {
        clearInterval(this.interval)
        this.countdowndata.over = true
        return
      }
      var days = Math.floor(time / 60 / 60 / 24)
      var hours = Math.floor((time - days * 60 * 60 * 24) / 60 / 60)
      var minus = Math.floor((time - days * 60 * 60 * 24 - hours * 60 * 60) / 60)
      var second = Math.floor((time - days * 60 * 60 * 24 - hours * 60 * 60 - minus * 60))
      hours = hours < 10 ? ('0' + hours) : hours
      minus = minus < 10 ? ('0' + minus) : minus
      second = second < 10 ? ('0' + second) : second
      this.countdowndata.days = days
      this.countdowndata.hours = hours
      this.countdowndata.minus = minus
      this.countdowndata.second = second
      this.countdowndata.realcount--
    }
  }

}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
.coutpage
  width: calc(100% - 10px)
  padding:0px 5px
  display:block

.countdowmlist
  width:80%
  margin:0 auto
  padding:0px
  li
    list-style:none
    float:left
    width:30px
    text-align:center
    &:nth-child(even)
      font-size:0.9em
      color:#000
    &:nth-child(odd)
      font-weight:bold
      color:red
      font-size:1.3em
</style>
