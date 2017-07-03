<template>
  <div class = "Money">
    <mainHead :val="value"></mainHead>
    <img src="/static/images/active/bg.png" class="main_bg">
    <div class='list'>
      <Table stripe :columns='col' :data='data' ></Table>
    </div>
  </div>
</template>

<script>
import mainHead from './mainHead.vue'
export default {
  name: 'Money',
  props: ['activity'],
  components: {mainHead},
  data () {
    return {
      value: {
        head: '积分返还榜',
        name: "RANK",
        no:"05"
      },
      col: [
        {
          type: 'index',
          title: '排名',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'realName',
          render(row){
            if(row.realName != '')
              return '<span>{{row.realName}}</span>'
            else
              return '<span>{{row.nickName}}</span>'
          }
        },
        {
          title: '头像',
          key: 'headImg',
          render(row){
            return "<img :src='row.headImg' class='headImgStyle'/>"
          }
        },
        {
          title: '积分',
          key: 'returnPoints'
        },
        {
          title: '时间',
          key: 'createDate'
        }
      ],
      data: [
      ]
    }
  },
  methods: {
    changeDateToTime(date){
      var newDate = new Date(date).toJSON();
      var index = newDate.indexOf("T");
      return newDate.slice(0,index)
    },
  },
  watch: {
    activity: function (val) {
      this.data = val.returnPointsRankInfo;
      this.data.forEach(item => {
        item.createDate = this.changeDateToTime(item.createDate);
      })
      console.log(this.data)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  rrrem(val){
    return (val/108px)rem
  }
  .headImgStyle
    width rrem(125px);
    height rrem(125px);
    border-radius 100%

  .Money
    background #d8006b
    position relative
    height auto
    overflow hidden
    padding-bottom rrem(100px)
    .main_bg
      position absolute
      width 100%
      z-index 1
      top 0px
    .list
      width rrrem(1000px)
      margin auto
      position relative
      z-index 100
      .ivu-table-cell
        width rrem(240px)
        height rrem(130px)
        margin 0px
        padding 0px
        line-height rrem(130px)
        text-align center
</style>
