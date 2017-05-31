<template>
  <div class = "Money">
    <mainHead :val="value"></mainHead>
    <div class='list'>
      <img src="/static/images/up.png" class = "upImg">
      <Table stripe :columns='col' :data='data'></Table>
      <img src="/static/images/down.png" class="foot">
    </div>
  </div>
</template>

<script>
import mainHead from '../Utils/mainHead.vue'
export default {
  name: 'Money',
  props: ['activity'],
  components: {mainHead},
  data () {
    return {
      value: {
        head: '提现排行榜',
        name: this.activity.companyName,
        no: 7
      },
      col: [
        {
          type: 'index',
          title: '排名',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '返现金额',
          key: 'withdraw'
        }
      ],
      data: [
        {
          name: '小王',
          phone: '183**8322',
          withdraw: 18
        },
        {
          name: '小王',
          phone: '183**8322',
          withdraw: 18
        },
        {
          name: '小王',
          phone: '183**8322',
          withdraw: 18
        },
        {
          name: '小吧',
          phone: '183**9434',
          withdraw: 99
        }
      ]
    }
  },
  created () {
    this.http.get(this.$store.state.prefix + '/withdraw/page/1').then((val) => {
      if (val.error === false) {
        console.log(val.result)
      }
    })
    setTimeout(() => {
      this.value.name = this.activity.companyName
    }, 500)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .Money
    background #fff
    .list
      width 92%
      margin auto
      position relative
      .upImg
        position absolute
        top rrem(-75px)
        left rrem(40px)
        width 100%
      .ivu-table-cell
        width rrem(300px)
        height rrem(130px)
        margin 0px
        padding 0px
        line-height rrem(130px)
        text-align center
      .foot
        z-index 1000
        width 100%
        margin-top rrem(-320px)
        margin-left rrem(-40px)
</style>
