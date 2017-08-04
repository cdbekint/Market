<template>
  <div :class="[changeSkin.activeClass]">
    <mainHead :val="changeSkin.realValue"></mainHead>
    <img :src="changeSkin.realBgUrl" class="main_bg">
    <div class='list'>
      <Table stripe :columns='col' :data='data'></Table>
    </div>
  </div>
</template>

<script>
import mainHead from './mainHead.vue'
export default {
  name: 'Money',
  props: ['activity'],
  components: { mainHead },
  data() {
    return {
      value: {
        head: '积分返还榜',
        name: "RANK",
        no: "05"
      },
      valueColor: {
        head: '积分返还榜',
        name: "RANK",
        no: "b05"
      },
      valueBlue: {
        head: '积分返还榜',
        name: "RANK",
        no: "c05"
      },
      valueGolden: {
        head: '积分返还榜',
        name: "RANK",
        no: "d05"
      },
      valuePink: {
        head: '积分返还榜',
        name: "RANK",
        no: "e05"
      },
      bgUrl: {
        bg: require('../../../static/images/active/bg.png'),
        bgColor: require('../../../static/images/active/bg1.png'),
        bgBlue: require('../../../static/images/active/bg2.png'),
        bgGolden: require('../../../static/images/active/bg3.png'),
        bgPink: require('../../../static/images/active/bg4.png')
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
          render(row) {
            if (row.realName != '')
              return '<span>{{row.realName}}</span>'
            else
              return '<span>{{row.nickName}}</span>'
          }
        },
        {
          title: '头像',
          key: 'headImg',
          render(row) {
            return "<img :src='row.headImg' class='headImgStyle'/>"
          }
        },
        {
          title: '积分',
          key: 'returnPoints'
        },
        {
          title: '时间',
          key: 'createDate',
          width: "75px"
        }
      ],
      data: [
      ],
      changeStyle: {
        Money: 'Money',
        Moneycolor: 'Moneycolor',
        Moneypink: 'Moneypink',
        Moneygolden: 'Moneygolden',
        Moneyblue: 'Moneyblue'
      },
      changeSkin: {
        activeClass: '',
        realValue: {},
        realBgUrl: {}
      },
      skin: 4
    }
  },
  methods: {
    changeDateToTime(date) {
      var newDate = new Date(date).toJSON();
      var index = newDate.indexOf("T");
      return newDate.slice(0, index)
    },
  },
  created() {
    this.skin = localStorage.getItem('skin')
    if (this.skin == 1) {
      this.changeSkin.activeClass = this.changeStyle.Money
      this.changeSkin.realValue = this.value
      this.changeSkin.realBgUrl = this.bgUrl.bg
    } else if (this.skin == 2) {
      this.changeSkin.activeClass = this.changeStyle.Moneycolor
      this.changeSkin.realValue = this.valueColor
      this.changeSkin.realBgUrl = this.bgUrl.bgColor
    } else if (this.skin == 3) {
      this.changeSkin.activeClass = this.changeStyle.Moneypink
      this.changeSkin.realValue = this.valuePink
      this.changeSkin.realBgUrl = this.bgUrl.bgPink
    } else if (this.skin == 4) {
      this.changeSkin.activeClass = this.changeStyle.Moneygolden
      this.changeSkin.realValue = this.valueGolden
      this.changeSkin.realBgUrl = this.bgUrl.bgGolden
    } else if (this.skin == 5) {
      this.changeSkin.activeClass = this.changeStyle.Moneyblue
      this.changeSkin.realValue = this.valueBlue
      this.changeSkin.realBgUrl = this.bgUrl.bgBlue
    } else {
      this.changeSkin.activeClass = this.changeStyle.Money
      this.changeSkin.realValue = this.value
      this.changeSkin.realBgUrl = this.bgUrl.bg
    }
  },
  watch: {
    activity: function (val) {
      this.data = val.returnPointsRankInfo;
      this.data.forEach(item => {
        item.createDate = this.changeDateToTime(item.createDate);
      })
      if (val.activityType != 2) {
        this.value.no = "04"
      }
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
        width 100%
        height rrem(130px)
        margin 0px
        padding 0px
        line-height rrem(130px)
        text-align center
  .Moneyblue
    background #fff
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
        width 100%
        height rrem(130px)
        margin 0px
        padding 0px
        line-height rrem(130px)
        text-align center    
  .Moneycolor
    background #fff
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
        width 100%
        height rrem(130px)
        margin 0px
        padding 0px
        line-height rrem(130px)
        text-align center 
  .Moneygolden
    background #fff
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
        width 100%
        height rrem(130px)
        margin 0px
        padding 0px
        line-height rrem(130px)
        text-align center     
  .Moneypink
    background #fff
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
        width 100%
        height rrem(130px)
        margin 0px
        padding 0px
        line-height rrem(130px)
        text-align center              
</style>
