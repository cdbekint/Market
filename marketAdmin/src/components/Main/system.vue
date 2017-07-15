<template>
    <div class='content'>
        <div class='inner'>
            <h2>他们正在使用的裂变营销系统</h2>
            <div class='point'>
                <img :src='pointUrl'>
            </div>
            <ul>
                <li v-for="item in lists">
                    <div class='pic'>
                        <!-- <img :src=''>                        -->
                    </div>
                    <p>{{item.title}}</p>
                </li>
            </ul>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
           pointUrl:require('../../../static/images/point.png'),
           lists:[
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               },
               {
                    title:'天猫'
               }
           ]
        }
    }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
    .content
        width :100%
        background-color:#fff
        height:712px
        padding-top:67px
        .inner
            width:1240px
            margin:0 auto
            h2
                height:79px
                line-height :79px
                text-align :center
                font-size:26px
                color:#434343
                font-family :"微软雅黑"
                font-weight :bold
            .point
                width:28px
                height:10px
                margin:0 auto
                font-size:0
            ul
                margin-top:12px
            
                li
                    float:left
                    margin-right :56px
                    margin-bottom:82px
                    .pic
                        width :160px
                        height:160px
                    p
                        font-size :20px
                        color:#434343
                        text-align :center
                li:last-of-type
                    margin-right :0
                li:nth-of-type(6)
                    margin-right :0    
</style>
