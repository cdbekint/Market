<template>
  <div class = "gift">
    <mainHead :val="value"></mainHead>
    <div class="section_gift">
      <img src="/static/images/up.png" class = "upImg">

      <div class="giftNote">
        累积分享{{activity.shareTimes}}天到朋友圈，即可到店领取如下礼品之一
      </div>
      <div v-for="gf in giftlist" class="giftlistwrapper">
        <div class="gifttitle" v-text="gf.giftName">
          
        </div>
          
        <div class = "gift_img">
          <img :src='murl + gf.giftImg' class = "main_img" v-if="gf.giftImg">
        </div>
        <div class="gift_desc" v-text="gf.giftDesc">
          
        </div>
      </div>
      
      <img src="/static/images/down.png" class="foot">
    </div>
  </div>
</template>

<script>
  import mainHead from '../Utils/mainHead.vue'
  export default {
    name: 'joinPeople',
    props: ['activity'],
    components: {mainHead},
    watch: {
      activity: function (val, oldVal) {
        this.value.name = val.companyName
        this.http.get(this.$store.state.prefix + '/gift/getByIds/' + val.giftIds).then(res => {
          if(res.error === false){
              this.giftlist = res.result
          }
        })
      }
    },
    data () {
      return {
        value: {
          head: '赠送礼品',
          name: null,
          no: 4
        },
        giftlist:[]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .gift
    width:100%
    height auto
    position relative
    background #fff
    .section_gift
      width:96%
      margin auto
      position relative
      .giftNote
        width:100%
        height auto
        padding:10px 0px
        display:inline-block
        text-align:center
        font-weight:bolder
      .giftlistwrapper
        width:80%
        padding:10px
        margin:0 auto
        border:1px solid #ccc
        margin-bottom:10px
        .gifttitle
          height:1.2em
          line-height:1.2em
          width:100%
          text-align:center
          font-weight:bolder
          color:red
        .gift_img
          width:80%
          margin:0 auto
          img
            width:100%
            max-height rrem(1200px)
        .gift_desc
          line-height rrem(72px)
          text-align:center
      .upImg
        position absolute
        top rrem(-75px)
        left rrem(20px)
        width 100%
      .foot
        width 100%
        margin-top rrem(-320px)
        margin-left rrem(-30px)
      .gift_img
        width 97%
        margin auto
        img
          width 100%
          display block
          margin auto
</style>
