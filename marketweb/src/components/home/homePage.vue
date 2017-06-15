<template>
  <div class="homePage">
    <headImg :data="datas" @head_company="getCompanyId"></headImg>
    <peopleMoney :data="datas"></peopleMoney>
    <infos :data="datas"></infos>
  </div>
</template>

<script type="text/ecmascript-6">
import headImg from './headImg.vue'
import peopleMoney from './peopleMoney.vue'
import infos from './infos.vue'
export default {
  name: 'homepage',
  components:{headImg,peopleMoney,infos},
  methods:{
    getCompanyId (id) {
      console.log(id)
    }
  },
  data () {
    return {
      datas:{
        name:"小浩学长巴德尔",
        img:"/static/images/expless.png",
        phone:'2212131234',
        company:['巴黎春天',"杨记珠宝","asd","asdw11"],
        menu:['参加活动','积分排名','邀请人数','消费记录']
      }
    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
  rrem(val){
    return (val/45px)rem
  }
  .homePage
    width 100%
    margin-bottom 20px
</style>
