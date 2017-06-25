<template>
  <div class="teamList" v-if="haveGroup">
    <div class="groupList">
      <ul>
        <div>
          <img src="/static/images/up.png" class = "upImg">
          <li>
            <div class="head">
              <img :src="curGroup.img" alt="">
              <span>{{curGroup.name}}</span>
            </div>
            <div class = "content">
              <p>{{curGroup.name}}正在邀请你参加本次活动，</p>
              <p>现在已经有{{curGroup.peopleNum}}人参加。</p>
            </div>
            <div class = "btn" @click="joinTeam">
              <img src="/static/images/min.png">
              <span>加入TA的团</span>
            </div>
          </li>
          <img src="/static/images/down.png" class="foot">
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teamList',
  props: ['activity'],
  methods:{
    joinTeam(){
      if(this.isloading)return
      this.isloading=true
      this.http.post(this.$store.state.prefix + '/activity/addGroup',{
        groupId:this.curGroup.id,
        activityId:this.curGroup.activeId
      }).then(res => {
        this.isloading=false
        if(res.error == false){
          this.$Message.success("恭喜你加入该团。");
          location.reload();
        }else{
          this.$Message.error(res.msg)
        }
      });
    }
  },
  watch: {
    activity:{
      handler(val){
        var len = val.groupInfo.length;
        if(len == 0){
          this.haveGroup = false;
          return;
        }
        var info = val.groupInfo[0];
        this.curGroup = {
          activeId:val.id,
          id:info.groupId,
          img:info.headImg,
          name:this.util.sliceStr(info.userName,4),
          peopleNum:len
        }
      },
      deep:true
    }
  },
  data () {
    return {
      haveGroup:true,
      curGroup:{
        activeId:0,
        id:'',
        img:'',
        name:'',
        peopleNum:0
      },
      isloading: false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .teamList
    background:#fff
    margin-top rrem(40px)
    padding-bottom rrem(200px)
    .groupList
      width:96%
      margin auto
      .foot
        width 100%
        margin-top rrem(-337px)
        margin-left rrem(-30px)
        z-index -1
      ul
        div
          margin-bottom rrem(20px)
          position relative
          .upImg
            position absolute
            top rrem(-75px)
            left rrem(20px)
            width 100%
          li
            width:100%
            height:rrem(255px)
            position relative
            .head
              width:rrem(200px)
              padding-left rrem(30px)
              span
                display inline-block
                font-size rrem(30px)
                width rrem(200px)
                height rrem(100px)
                line-height rrem(100px)
                text-align center
              img
                width:rrem(150px)
                height:rrem(150px)
                border-radius:50%
                display block
                margin auto
            .content
              position absolute
              top rrem(20px)
              left rrem(310px)
              width rrem(830px)
              height rrem(130px)
              font-size rrem(50px)
              text-align center
              line-height rrem(75px)
            .btn
              position absolute
              left rrem(874px)
              top rrem(165px)
              width rrem(500px)
              height rrem(100px)
              img
                width rrem(500px)
                height rrem(100px)
              span
                color #fff
                position absolute
                top rrem(6px)
                left rrem(70px)
                font-size rrem(50px)
                display inline-block
                width rrem(350px)
                height rrem(100px)
                line-height rrem(100px)
                text-align center
                position absolute


</style>
