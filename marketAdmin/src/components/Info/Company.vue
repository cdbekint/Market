<template>
<div class='comapanyinfo'>
<div class='content-title'>
      <!-- 页面的标题 -->

      <div class='titlename'>
        <span>修改信息</span>
      </div>
      <div class='titellink'>
      <router-link to='/company' class='innerbtnlink'>返回</router-link>
      </div>
 </div>
 <div class='content'>


<ul>
  <li class='companyitem'>
    <div class='itemname'>
      企业名称
    </div>
    <div class='itemcontent'>
      <input type='text' readonly='readonly' v-model='company.companyName'>
    </div>
    <div class='itemhepler'>
      公司名字不可修改
    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      企业介绍
    </div>
    <div class='itemcontent'>
      <textarea v-model='company.companyDesc'>
      </textarea>
    </div>
    <div class='itemhepler'>
    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      企业logo
    </div>
    <div class='itemcontent'>
      <uploader :config='uploaderconfig'> </uploader>
      <input type='hidden' v-model='company.companyLogo'>
    </div>
    <div class='itemhepler'>
      <span>图片建议上传300*300以上的正方形png图片，大小500kb以内</span>
    </div>
  </li>
    <li class='companyitem'>
    <div class='itemname'>
      logo预览
    </div>
    <div class='itemcontent'>
      <img v-if='company.companyLogo' :src='murl+company.companyLogo' alt='' class='companylogothumb'>
    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      公司区域
    </div>
    <div class='itemcontent'>
      <!--<input type='text' v-model='company.companyAddr'>-->
        <Select v-model="areaOne.id" style="width:32%;" placeholder="请选择所在地" @on-change="change($event,1)" :label-in-value=true>
          <Option v-for = "area in areasOne" :value="area.region_id" :key = "area" >{{area.region_name}}</Option>
        </Select>
        <Select v-model="areaTwo.id" style="width:32%;" placeholder="请选择所在地" :disabled="!areaOne.id" @on-change="change($event,2)" :label-in-value=true>
          <Option v-for = "area in areasTwo" :value="area.region_id" :key = "area">{{area.region_name}}</Option>
        </Select>
        <Select v-model="company.areaId" style="width:32%;" placeholder="请选择所在地" :disabled="!areaTwo.id" @on-change="change($event,3)" :label-in-value=true>
          <Option v-for = "area in areasThree" :value="area.region_id" :key = "area">{{area.region_name}}</Option>
        </Select>
    </div>
    <div class='itemhepler'>

    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      具体地区
    </div>
    <div class='itemcontent'>
      <input type='text' v-model='company.companyAddr'>
    </div>
    <div class='itemhepler'>

    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      联系电话
    </div>
    <div class='itemcontent'>
      <input type='text' v-model='company.companyTel'>
    </div>
    <div class='itemhepler'>

    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      短信接收号码
    </div>
    <div class='itemcontent'>
      <input type='text' v-model='company.smsTel'>
    </div>
    <div class='itemhepler'>

    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      积分折现金比
    </div>
    <div class='itemcontent'>
      <Input type='text' v-model='company.toCashRate'>
      <span slot="append" style="display: block;width:35px;">%</span>
      </Input>
    </div>
    <div class='itemhepler'>
      积分对应的兑换成现金的比例。
    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      员工提成比
    </div>
    <div class='itemcontent' >
      <Row v-for='(group,index) in Group' :key='group' :label='"项目" + (index + 1)' style='margin:7px;'>
        <Col span='8'>
          <Input type='text' v-model='group.mans' placeholder='总金额'>
           <span slot="append" style="display: block;width:35px;">元</span>
        </Input>
        </Col>
        <Col span='8' offset='2'>
          <Input type='text' v-model='group.discount' placeholder='提成比率'>
            <span slot="append" style="display: block;width:35px;">%</span>
          </Input>
        </Col>
        <Col span='3' class='groupitemaction' v-if='Group.length!==1'>
        <Button type='dashed' @click='minusGroup(index)' icon='minus-round'></Button>
        </Col>
        <Col span='3' class='groupitemaction' v-if='index==Group.length-1'>
          <Button type='dashed' @click='addGroup(index)' icon='plus-round'></Button>
        </Col>
      </Row>
    </div>
    <div class='itemhepler'>

    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      分享赠送积分
    </div>
    <div class='itemcontent'>
      <input type='number' v-model='company.sharePoints'>
    </div>
    <div class='itemhepler'>
      用户分享到朋友圈后可获得积分数量
    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      分享朋友圈次数
    </div>
    <div class='itemcontent'>
      <input type='number' v-model='company.shareMax'>
    </div>
    <div class='itemhepler'>
      用户每个活动分享到朋友圈每天可获得积分的次数
    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      注册金额
    </div>
    <div class='itemcontent'>
      <input type='number' v-model='company.registerMoney'>
    </div>
    <div class='itemhepler'>
      用户注册成为会员，需缴纳此金额
    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>
      注册返还积分
    </div>
    <div class='itemcontent'>
      <input type='number' v-model='company.registerPoints'>
    </div>
    <div class='itemhepler'>
      用户注册成为会员，返还积分数量
    </div>
  </li>
   <li class='companyitem'>
    <div class='itemname'>
      邀请注册返积分
    </div>
    <div class='itemcontent'>
      <input type='number' v-model='company.invitedPoints'>
    </div>
    <div class='itemhepler'>
      每邀请一个注册用户，返还积分
    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>自己消费返还积分比率</div>
    <div class='itemcontent'>
      <Input type='number' v-model='company.selfReturn'>
      <span slot="append" style="display: block;width:35px;">%</span>
      </Input>
    </div>
    <div class='itemhepler'>

    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>一级邀请人返还积分比率</div>
    <div class='itemcontent'>
      <Input type='number' v-model='company.oneReturn'>
      <span slot="append" style="display: block;width:35px;">%</span>
      </Input>
    </div>
    <div class='itemhepler'>

    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>二级邀请人返还积分比率</div>
    <div class='itemcontent'>
      <Input type='number' v-model='company.secondReturn'>
      <span slot="append" style="display: block;width:35px;">%</span>
      </Input>
    </div>
    <div class='itemhepler'>

    </div>
  </li>
  <li class='companyitem'>
    <div class='itemname'>公司宣传页面</div>
    <div class='itemcontent ueditor-wrapper'>
     <ueditor :value="defaultMSg" :config="Ueditorconfig" @input="Ueditorinput" v-on:ready="Ueditorready"></ueditor>
    </div>
    <div class='itemhepler'>

    </div>
  </li>
 

  <li class='companyitem'>
    <div class='itemcontent'>
      <input type='button' value='保存' class='savebtns' @click='editCompany()'>
    </div>
  </li>

</ul>
 </div>
</div>


</template>

<script  type='text/ecmascript-6'>
import uploader from '../Util/Uploader'
import ueditor from '../Ueditor'
export default {
  name: 'company',
  data () {
    return {
      title: '公司信息设置',
      company: {
        id: '',
        companyName: '',
        companyDesc: '',
        companyAddr:'',
        companyTel: '',
        companyLogo: '',
        smsTel:'',
        toCashRate: 0,
        employeeRate: '',
        sharePoints:'',
        shareMax: '',
        registerMoney:'',
        registerPoints:'',
        selfReturn:'',
        oneReturn:'',
        secondReturn:''
      },
      Group: [
        {
          mans: '',
          discount: ''
        }
      ],
      areaOne: {
        id: null,
        name: ''
      },
      areaTwo: {
        id: null,
        name: ''
      },
      areaThree: {
        id: null,
        name: ''
      },
      areasOne: [],
      areasTwo: [],
      areasThree: [],
      uploaderconfig: {
        maxSize: 1024,
        format: ['jpg', 'png', 'jpeg'],
        showUploadList: false,
        parent: 'company',
        child: 'companyLogo'
      },
      defaultMSg: '',
      Ueditorconfig: {
        initialFrameWidth: null,
        initialFrameHeight: 320,
        info: {},
        imageUrl: 'http://up.qiniu.com/',
        imageActionName: 'uploadimage',
        imageFieldName: 'file',
        imageMaxSize: 5120,
        imageAllowFiles: ['.jpg', '.png', '.jpeg'],
        imageCompressEnable: true,
        imageCompressBorder: 1600,
        imageInsertAlign: 'none',
        imageUrlPrefix: 'http://oolds3geo.bkt.clouddn.com/',
        imagePathFormat: 'upload/image/{yyyy}{mm}{dd}/{time}{rand:6}'
      }
    }
  },
  components: { uploader ,ueditor},
  methods: {
    change (e, val) {
      if (val === 1) {
        this.areaOne.name = e.label;
        this.http.get(this.$store.state.prefix + '/company/getRegionInfo?parentId=' + e.value).then((res) => {
          if (res.error === false) {
            this.areasTwo = res.result;
          }
        });
      } else if (val === 2) {
        this.areaTwo.name = e.label;
        this.http.get(this.$store.state.prefix + '/company/getRegionInfo?parentId=' + e.value).then((res) => {
          if (res.error === false) {
            this.areasThree = res.result;
          }
        });
      } else {
        this.areaThree.name = e.label;
      }
    },
    minusGroup (index) {
      this.Group.splice(index, 1)
    },
    addGroup (index) {
      if (this.Group[index].mans && this.Group[index].discount) {
        this.Group.push({mans: '', discount: ''})
      } else {
        this.$Notice.warning({title: '请先完善当前项内容'})
      }
    },
    editCompany () {
      var addr = '';
      if(this.areaThree.name != '' && this.areaThree.name != void 0){
        addr = this.areaThree.name + '-';
      }
      this.company.companyAddr = this.areaOne.name + '-' + this.areaTwo.name + '-' + addr + this.company.companyAddr;
      if(!this._setGroupDiscount())return;
      if (!this._checkParamAndExecute()) return;
    },
    _checkParamAndExecute () {
      var ai = JSON.parse(JSON.stringify(this.company))
      console.log(ai)
      if (!ai.companyDesc) {
        this.$Notice.info({title: '请完善信息', desc: '请填写企业描述'})
        return false
      }
      if (!ai.companyAddr) {
        this.$Notice.info({title: '请完善信息', desc: '请填写公司地址'})
        return false
      }
      if (!ai.companyTel) {
        this.$Notice.info({title: '请完善信息', desc: '请填写联系方式'})
        return false
      }
      if (!ai.smsTel) {
        this.$Notice.info({title: '请完善信息', desc: '请填写短信接受号码'})
        return false
      }
      if (!ai.companyLogo) {
        this.$Notice.info({title: '请完善信息', desc: '请上传公司logo'})
        return false
      }
      if (!ai.toCashRate) {
        this.$Notice.info({title: '请完善信息', desc: '请填写积分抵现金比例'})
        return false
      }
      if (!ai.employeeRate) {
        this.$Notice.info({title: '请完善信息', desc: '请填写员工提成比率'})
        return false
      }
      if (!ai.sharePoints) {
        this.$Notice.info({title: '请完善信息', desc: '请填写转发积分'})
        return false
      }
      if (!ai.shareMax) {
        this.$Notice.info({title: '请完善信息', desc: '请填写最多转发次数'})
        return false
      }
      if (!ai.registerMoney) {
        this.$Notice.info({title: '请完善信息', desc: '请填写注册金额'})
        return false
      }
      if (this.util.isNull(ai.registerPoints)) {
        this.$Notice.info({title: '请完善信息', desc: '请填写注册返还积分'})
        return false
      }
      if (!ai.selfReturn) {
        this.$Notice.info({title: '请完善信息', desc: '请填写自己消费返还积分比率'})
        return false
      }
      if (this.util.isNull(ai.oneReturn)) {
        this.$Notice.info({title: '请完善信息', desc: '请填写一级邀请人返还积分比率'})
        return false
      }
      if (!ai.secondReturn) {
        this.$Notice.info({title: '请完善信息', desc: '请填写二级邀请人返还积分比率'})
        return false
      }
      this.http.put(this.$store.state.prefix + '/company', this.company).then(res => {
        if (res.error === false) {
          this.$Message.success('修改成功')
          this.router.push('/company')
        }
      })
      return true;
    },
    _setGroupDiscount(){
      var discountLevel = '[';
      var me = this;
      var isSuccess = true;
      this.Group.forEach(function (item, index) {
        if (index === 0) {
          if (me.util.isNull(item.mans) || me.util.isNull(item.discount)) {
            me.$Notice.info({title: '请完善信息', desc: '请填写员工提成比，比率为百分比',duration:0})
            isSuccess = false
          }
        }
        if (item.discount > 100 || item.discount < 0) {
          me.$Notice.error({title: '员工提成比错误', desc: '第' + (parseInt(index) + 1) + '项折扣信息需在0-100之间',duration:0})
          isSuccess = false
        }
        if (index > 0) {
          if (~~(item.mans) <= ~~(me.Group[index - 1].mans)) {
            me.$Notice.error({title: '员工提成比错误', desc: '第' + (parseInt(index) + 1) + '项人数需大于上一项',duration:0})
            isSuccess = false
          }
          discountLevel += ','
        }
        discountLevel += '{"mans":'+item.mans + ',"discount":' + item.discount +'}'
      });
      this.company.employeeRate = discountLevel+']';
      if(isSuccess)
        return true;
      else
        return false;
    },
    Ueditorready (editor) {},
    Ueditorinput (obj) {
      this.company.show = obj.content
      this.Ueditorconfig.info = obj
    }
  },
  created () {
    if (this.$store.state.companyId) {
      this.http.get(this.$store.state.prefix + '/company/' + this.$store.state.companyId).then(res => {
        if (res.error === false) {
          this.company.id = this.$store.state.companyId
          if (res.result !== null) {
            this.company = res.result
            this.Group = JSON.parse(this.company.employeeRate.replace(/&quot;/g,'"'));
          }
        }
      })
    }
    this.http.get(this.$store.state.prefix + '/company/getRegionInfo').then((res) => {
      if (res.error === false) {
        this.areasOne = res.result
      }
    });
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
$content_height=70px


.comapanyinfo
  display:block
  font-family:'微软雅黑',Arial sans-serif
  font-size:14px
  ul
    padding:0px
    li.companyitem
      padding 17px 0px
      list-style:none
      width:100%
      border-bottom:1px dashed #eee
      position relative
      top 0px
      .itemcontent
        position relative
      .itemcontent.ueditor-wrapper
        width:60%
      .itemname
        position absolute
        top 0px
        left 0px
        width 25%
        text-align:center
        height 100%
        font-size 14px;
        line-height 450%
        &:after
          content:'*'
          color red
      .itemcontent
        left 25%
        width 40%
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
        position absolute
        top 20px
        text-align:center
        color:#b2b2b2
        right 0px;
        max-width:400px
        padding:0px 10px
        vertical-align:middle
        overflow:hidden
        font-size:0.9em

.companylogothumb
  height:70px
  width:auto


</style>
