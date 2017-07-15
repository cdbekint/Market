<template>
    <div class="banner">
        <a href='javascript:;' class='free' @click="handleClick('register',true)">免费体验</a>
        <div class='tishi'>
            <img :src='imgurl'>免费体验期限为30天，到期后可续费成为正式商家
        </div>
    </div> 
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            imgurl:require('../../../static/images/icon.png')
        }  
    },
    methods :{
        handleClick (type,onOff) {
            this.$emit('register',type,onOff)
        }
    }
    
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
    .banner
        width:100%
        background :url(../../../static/images/free.png) no-repeat top
        height:460px
        padding-top :190px
        .free
            width:450px
            height:86px
            line-height :86px
            font-size 30px
            color :#fff
            font-family :"微软雅黑"
            margin :0 auto
            display:block
            background-color :#ff017e
        .tishi
            width:450px
            margin :0 auto
            height:19px
            line-height :19px
            font-size :16px
            opacity :0.8
            color:#fff
            text-align:center
            margin-top:12px
            img
                width :19px
                height:19px
                vertical-align:bottom
                margin-right:4px
  
</style>
