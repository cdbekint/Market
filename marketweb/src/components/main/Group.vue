<template>
  <div class="groupUsers">
    <mainHead :val="value"></mainHead>
    <div class="group-title">
      <img src="/static/images/up.png" class = "upImg">
      <div class="group-title-left">
        团员姓名
      </div>
      <div class="group-title-right">
        参团时间
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="groupList">
      <ul>
        <div v-for="index in datas">
          <li>
            <div class="groupAvater">
              <img :src='index.headImg' :class="index.status">
            </div>
            <div class="groupName flex1">
              {{index.userName}}
            </div>
            <div class="attendDate flex1">
              {{index.joinDate}}
            </div>
          </li>
          <hr style="border:1px dashed #eee;">
        </div>
      </ul>
      <img src="/static/images/down.png" class="foot">
    </div>
  </div>
</template>

<script>
import mainHead from '../Utils/mainHead.vue'
export default {
  name: 'Group',
  props: ['activity'],
  components: {mainHead},
  watch: {
    activity: function (val) {
      this.value.name = val.companyName
      debugger
      if (val.groupInfo === null) return
      val.groupInfo.forEach(item=>{
        item.joinDate = this.changeDateToTime(item.joinDate);
        item.payStatus == 0 ? item.status = "gray":item.status = '';
      });
      this.datas=[]
      if (val.groupInfo.length >= 10) {
        this.datas = val.groupInfo.slice(0, 10)
      }
      else {
        this.datas = val.groupInfo
      }
    }
  },
  data () {
    return {
      value: {
        head: '已入团伙伴',
        name: null,
        no: 5
      },
      datas: []
    }
  },
  methods: {
    changeDateToTime(date){
      var newDate = new Date(date).toJSON();
      var index = newDate.indexOf("T");
      return newDate.slice(0,index)
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .gray {
    filter: grayscale(80%);
    filter: gray;
  }
  .groupUsers
    background:#fff
    .group-title
      width:94%
      margin auto
      background:#eee
      height:rrem(100px)
      position relative
      .upImg
        position absolute
        top rrem(-75px)
        left rrem(30px)
        width 100%
      .group-title-left,
      .group-title-right
        font-size:rrem(50px)
        font-weight bold
        width:50%
        float:left
        padding:0px 10px
        color:red
        line-height:30px
      .group-title-right
        text-align:right
    .groupList
      border 1px solid #eee
      border-bottom 0px
      padding-bottom -5px
      width:94%
      margin auto
      .foot
        width 100%
        margin-top rrem(-300px)
        margin-left rrem(-30px)
      ul
        min-height:150px
        div
          &:first-child
            .groupName
              &:before
                content: '[团长]'
                color:red
          li
            width:100%
            height:rrem(200px)
            line-height:rrem(200px)
            display:flex
            .groupAvater
              width:rrem(200px)
              padding rrem(30px) rrem(44px)
              img
                width:rrem(150px)
                height:rrem(150px)
                border-radius:50%
            .groupName,
            .attendDate
              font-size:rrem(46px)
              padding:0px rrem(30px)
            .attendDate
              text-align:right

</style>
