<template>
  <div class = "Money">
    <mainHead :val="value"></mainHead>
    <div class='list'>
      <img src="/static/images/up.png" class = "upImg">
      <Table stripe :columns='col' :data='data' height="150px"></Table>
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
        head: '积分返还榜',
        name: this.activity.companyName,
        no: 7
      },
      col: [
        {
          type: 'index',
          title: '排名',
          align: 'center'
        },
//        {
//          title: '姓名',
//          key: 'realName',
//          render(row){
//            if(row.realName != '')
//              return '<span>{{row.realName}}</span>'
//            else
//              return '<span>{{row.nickName}}</span>'
//          }
//        },
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
      data: []
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
    activity: function (val, oldVal) {
      this.value.name = val.companyName
      this.data = val.returnPointsRankInfo;
      this.data.forEach(item => {
        item.createDate = this.changeDateToTime(item.createDate);
      })
      if(val.activityType != 2)
        this.value.no = 6;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .headImgStyle
    width rrem(125px);
    height rrem(125px);
    border-radius 100%
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
