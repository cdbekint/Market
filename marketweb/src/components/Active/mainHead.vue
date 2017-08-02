<template>
  <div class="main_head">
    <img :src="'/static/images/active/'+ val.no +'.png'" class="head_img">
    <div :class="[changeStyle.color ? 'head_text head_text_golden' : 'head_text']">
      <span class="text_en">{{val.name}}</span>
      <span class="text_ch">{{val.head}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['val'],
  data() {
    return {
      changeStyle: {
        headTextGolden: 'head_text_golden',
        headText: 'head_text',
        color:false
      }
    }
  },
  created() {
    if (this.val.no == 'd01' || 'd02' || 'd03' || 'd04' || 'd05'){
      this.changeStyle.color = true
    }else {
      this.changeStyle.color = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import '../../../static/css/mainHead'
</style>
