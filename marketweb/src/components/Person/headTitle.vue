<template>
  <div class="companyHead">
    <div class="head_img">
      <img :src="murl+info.logo" alt="" v-if="info.logo">
    </div>
    <div class="head_txt">
      <p>{{info.name}}</p>
      <span>客户：{{info.customerNum}}</span>
      <span>浏览：{{info.allViewNum}}</span>
      <span>分享：{{info.allShareNum}}</span>
    </div>
    <img src="/static/images/person/icon.png" class="head_change" @click="changeCompany">
    <div class="companyList" v-if="listshow">
      <ul>
        <li v-for="cp in companyInfo" v-text="cp.name" @click="setHeadCompany(cp.id)"></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'companyHead',
  props: ["companyId", "companyInfo"],
  created() {
    var query = this.util.getQuery(location.hash)||{};
    var url = this.companyId == void 0 ? '' : '?companyId=' + query.companyId;
    console.log("url:"+url)
    this.http.get(this.$store.state.prefix + "/shop" + url).then(res => {
      if (res.error == false) {
        console.log(res.result)
        this.info.name = res.result.companyName;
        this.info.logo = res.result.companyLogo;
        this.info.customerNum = res.result.customerNum
        this.info.allViewNum = res.result.allViewNum
        this.info.allShareNum = res.result.allShareNum
      }
    })
  },
  data() {
    return {
      info: {
        name: '',
        logo: '',
        customerNum: '',
        allViewNum: '',
        allShareNum: ''
      },
      listshow: false
    }
  },
  methods: {
    changeCompany() {
      this.listshow = !this.listshow
    },
    setHeadCompany(id) {
      this.listshow = false
      this.$emit('headCompany', id)
    }
  },
  watch: {
    companyId: {
      handler(val) {
        var url = this.companyId == void 0 ? '' : '?companyId=' + this.companyId;
        this.http.get(this.$store.state.prefix + "/shop" + url).then(res => {
          if (res.error == false) {
            this.info.name = res.result.companyName;
            this.info.logo = res.result.companyLogo;
            this.info.customerNum = res.result.customerNum
            this.info.allViewNum = res.result.allViewNum
            this.info.allShareNum = res.result.allShareNum
          }
        })
      },
      deep: true
    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .companyHead
    width 100%
    height rrem(125px)
    background #343539
    position relative
    top 0px
    .head_img
      width rrem(150px)
      height rrem(125px)
      display table-cell
      vertical-align middle
      text-align center
      img
        width rrem(100px)
        height rrem(100px)
        border-radius 100%
        vertical-align middle
    .head_txt
      position absolute
      top 0px
      width 100%
      text-align center
      height rrem(125px)
      span
        color #aeaeae
        font-size rrem(24px)
        display inline-block
        margin-right rrem(25px)
      p
        text-align center
        height rrem(95px)
        line-height rrem(100px)
        font-size rrem(50px)
        font-weight bold
        color #fff
        position relative
    .head_change
      width rrem(124px)
      height rrem(124px)
      top 0px
      right 0px
      position absolute
    .companyList
      position absolute
      top rrem(124px)
      right:0px
      background:#fff
      height rrem(100px)
      width rrem(540px)
      z-index:100
      ul
        padding:0px
        li
          list-style:none
          height rrem(100px)
          line-height rrem(100px)
          width:100%
          border-left:1px solid #aeaeae
          border-bottom:1px solid #aeaeae
          text-align:center
          color:#aeaeae
          font-size rrem(34px)
          letter-spacing rrem(3px)
          background:#fff

</style>
