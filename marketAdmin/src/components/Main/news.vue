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
        width:1240px
        height :580px
        margin:0 auto
        background-color :#fff
        ul
            padding-top :140px
            li
                float:left
                width :320px
                margin-right:140px
                .pic
                    width 166px
                    height :140px
                    font-size :0
                    margin:0 auto
                .content
                    margin-top:48px
                    font-family :"微软雅黑"
                    h2
                        color :#434343
                        font-size 26px
                        font-weight :bolder
                    p
                        line-height :30px
                        font-size :20px
                        color:#434343
                        padding-top :10px    
            li:last-of-type
                margin-right:0       
</style>
