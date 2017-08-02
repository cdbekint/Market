<template>
<div style='width:100%'>
    <div class='news' v-if="lists">
        <ul>
            <li v-for="item in lists">
                <div class='pic'>
                     <img :src='item.imgUrl'>
                </div>
                <div class="content">
                    <h2>{{item.title}}</h2>
                    <p>{{item.text}}</p>
                </div>
            </li>
        </ul>
        <div class="clearfix"></div>
    </div>
    <div class='news' v-else style='background:#f8f8f8'>
        <ul>
            <li v-for="item in listsTwo">
                <div class='pic'>
                     <img :src='item.imgUrl'>
                </div>
                <div class="content">
                    <h2>{{item.title}}</h2>
                    <p>{{item.text}}</p>
                </div>
            </li>
        </ul>
        <div class="clearfix"></div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    props:['lists','listsTwo'],
    data () {
        return {

        }
    }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.news
  width:100%
  padding:0px 10%
  height:auto
  margin:0 auto
  background-color :#fff
  display:block
  padding-bottom:10px
  ul
    min-width:1000px
    max-width:1420px
    padding-top :40px
    li
      float:left
      width :30%
      margin-right:3%
      .pic
        width 40%
        height auto
        font-size :0
        margin:0 auto
        img
          width:100%
      .content
        margin-top:48px
        font-family :"微软雅黑"
        h2
          color :#434343
          font-size 20px
          font-weight :bolder
        p
          line-height :30px
          font-size :16px
          color:#434343
          padding-top :10px
    li:last-of-type
        margin-right:0
</style>
