<template>
<div class="comapanyinfo">
<div class="content-title">
      <!-- 页面的标题 -->

      <div class="titlename">
        <span>修改信息</span>
      </div>
      <div class="titellink">
      <router-link to="/company" class="innerbtnlink">返回</router-link>
      </div>
 </div>
 <div class="content">


<ul>
  <li class="companyitem">
    <div class="itemname">
      企业名称
    </div>
    <div class="itemcontent">
      <input type="text" readonly="readonly" v-model="company.companyName">
    </div>
    <div class="itemhepler">
      公司名字不可修改
    </div>
  </li>
  <li class="companyitem">
    <div class="itemname">
      企业介绍
    </div>
    <div class="itemcontent">
      <textarea v-model="company.companyDesc">
      </textarea>
    </div>
    <div class="itemhepler">
    </div>
  </li>
  <li class="companyitem">
    <div class="itemname">
      企业logo
    </div>
    <div class="itemcontent">
      <uploader :config="uploaderconfig"> </uploader>
      <input type="hidden" v-model="company.companyLogo">
    </div>
    <div class="itemhepler">
      <span>图片建议上传300*300以上的正方形png图片，大小500kb以内</span>
    </div>
  </li>
    <li class="companyitem">
    <div class="itemname">
      logo预览
    </div>
    <div class="itemcontent">
      <img v-if="company.companyLogo" :src="murl+company.companyLogo" alt="" class="companylogothumb">
    </div>
  </li>
  <li class="companyitem">
    <div class="itemname">
      联系电话
    </div>
    <div class="itemcontent">
      <input type="text" v-model="company.companyTel">
    </div>
    <div class="itemhepler">

    </div>
  </li>
  <li class="companyitem">
    <div class="itemname">
      短信接收号码
    </div>
    <div class="itemcontent">
      <input type="text" v-model="company.smsTel">
    </div>
    <div class="itemhepler">

    </div>
  </li>
  <li class="companyitem">
    <div class="itemname">
    消费金额折积分
    </div>
    <div class="itemcontent">
      <input type="text" v-model="company.topointRate">
    </div>
    <div class="itemhepler">
      直接设置小数，比如0.01即为1%
    </div>
  </li>
  <li class="companyitem">
    <div class="itemname">
      积分折现金比
    </div>
    <div class="itemcontent">
      <input type="text" v-model="company.tocashRate">
    </div>
    <div class="itemhepler">
      直接设置小数，比如0.1即为10%
    </div>
  </li>
  <li class="companyitem">
    <div class="itemname">
      员工提成比
    </div>
    <div class="itemcontent">
      <input type="text" v-model="company.employeeRate">
    </div>
    <div class="itemhepler">
      直接设置小数，比如0.05即为5%
    </div>
  </li>
  <li class="companyitem">
    <div class="itemname">
      分享赠送积分
    </div>
    <div class="itemcontent">
      <input type="text" v-model="company.sharePoints">
    </div>
    <div class="itemhepler">

    </div>
  </li>
  <li class="companyitem">
    <div class="itemname">
      最大分享次数
    </div>
    <div class="itemcontent">
      <input type="text" v-model="company.shareMax">
    </div>
    <div class="itemhepler">

    </div>
  </li>

  <li class="companyitem">
    <div class="itemname">

    </div>
    <div class="itemcontent">
      <input type="button" value='保存' class="savebtns" @click="editCompany()">
    </div>
    <div class="itemhepler">

    </div>
  </li>

</ul>
 </div>
</div>


</template>

<script  type="text/ecmascript-6">
import uploader from './Util/Uploader'
export default {
  name: 'company',
  data () {
    return {
      title: '公司信息设置',
      company: {
        id: '',
        companyName: '',
        companyDesc: '',
        companyTel: '',
        companyLogo: '',
        companyBalance: 0,
        topointRate: 0,
        tocashRate: 0,
        employeeRate: 0,
        smsNum: 0,
        sharePoints: 0,
        shareMax: 1,
        overDate: ''
      },
      uploaderconfig: {
        maxSize: 5120,
        format: ['jpg', 'png', 'jpeg'],
        showUploadList: false,
        parent: 'company',
        child: 'companyLogo'
      }
    }
  },
  components: { uploader },
  methods: {
    editCompany () {
//      delete this.company.companyName
      this.http.put('api/company', this.company).then(res => {
        if (res.error === false) {
          this.$Message.success('修改成功')
          this.router.push('/company')
        }
      })
    }
  },
  created () {
    if (this.$store.state.companyId) {
      this.http.get('api/company/' + this.$store.state.companyId).then(res => {
        if (res.error === false) {
          this.company.id = this.$store.state.companyId
          if (res.result !== null) {
            this.company = res.result
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
$content_height=70px


.comapanyinfo
  display:block
  font-family:"微软雅黑",Arial sans-serif
  font-size:14px
  ul
    padding:0px
    li.companyitem
      list-style:none
      width:100%
      border-bottom:1px dashed #eee
      height:$content_height
      .itemname,
      .itemcontent
        height:$content_height
        line-height:$content_height
        float:left
      .itemname
        width:160px
        text-align:center
        &:after
          content:":"
      .itemcontent
        text-align:left
        input
        ,textarea
          border:1px solid #CCCCCC
          padding:3px 5px
          height:30px
          line-height:@height
          border-radius:3px
        textarea
          height:50px
          width:350px
          line-height:18px
          margin-top:10px
        .savebtns
          background:#44B549
          color:#fff
          border-radius:3px
          height:30px
          line-height:30px
          width:100px
          padding:0px 15px
          cursor:pointer
          &:hover
            background:#2F9833
      .itemhepler
        text-align:center
        height:$content_height
        line-height:$content_height
        color:#b2b2b2
        float:right
        max-width:400px
        padding:0px 10px
        vertical-align:middle
        overflow:hidden
        font-size:0.9em

.companylogothumb
  height:70px
  width:auto


</style>
