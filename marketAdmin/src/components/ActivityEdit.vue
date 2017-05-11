<template>
<div class="activityadd">
  <div class="content-title">
      <!-- 页面的标题 -->

      <div class="titlename">
        <span>修改活动</span>
      </div>
      <div class="titellink">
      <router-link to="/activity" class="innerbtnlink">活动列表</router-link>
        <router-link to="/activity/add" class="innerbtnlink">新增活动</router-link>
      </div>
  </div>
  <div class="content">
    <ul class="addactivitycontent">
      <li>
        <div class="addname">
          活动名称*
        </div>
        <div class="addcontent">
          <input type="text" v-model="activity.activityName">
        </div>
        <div class="addnote">
          这是备注信息
        </div>
      </li>
      <li>
        <div class="addname">
          分享描述*
        </div>
        <div class="addcontent">
          <textarea cols="50" rows="3" v-model="activity.shareDes"></textarea>
        </div>
        <div class="addnote">
        50字以内
        </div>
      </li>
      <li>
        <div class="addname">
          分享缩略图
        </div>
        <div class="addcontent">
          <uploader :config="uploaderconfig"></uploader>
          <input type="hidden" v-model="activity.shareImg">
        </div>
        <div class="addnote">
          (建议尺寸：300像素 * 300像素)
        </div>
      </li>
      <li v-if="activity.shareImg">
        <div class="addname">
          预览缩略图
        </div>
        <div class="addcontent">
          <img :src="murl+activity.shareImg"  class="thumbpreview" alt="">
        </div>
        <div class="addnote">

        </div>
      </li>
      <li>
        <div class="addname">
          顶部大图*
        </div>
        <div class="addcontent">
        <uploader :config="Mainuploaderconfig"></uploader>
          <input type="hidden" v-model="activity.activityImg">
        </div>
        <div class="addnote">
          (建议尺寸：600像素*800像素)
        </div>
      </li>
      <li v-if="activity.activityImg">
        <div class="addname">
          大图缩略图
        </div>
        <div class="addcontent">
          <img :src="murl+activity.activityImg"  class="thumbpreview" alt="">
        </div>
        <div class="addnote">

        </div>
      </li>
      <li>
        <div class="addname">
          起止时间*
        </div>
        <div class="addcontent">
          <Date-picker  v-model="activity.startDate" type="datetime" placeholder="选择开始日期和时间" style="width: 45%;float:left;margin-top:15px" :editable="false"></Date-picker>
          <Date-picker v-model="activity.endDate" type="datetime" placeholder="选择结束日期和时间" style="width: 45%;float:left;margin-top:15px;margin-left:3%" :editable="false"></Date-picker>
        </div>
        <div class="addnote">
        </div>
      </li>

      <li>
        <div class="addname">
          背景音乐
        </div>
        <div class="addcontent">
          <input type="text" v-model="activity.backMusic" readonly="readonly"><input class="contentbtns" type="button" value="选择" @click="musicModel = true">
        </div>
        <div class="addnote">
          音乐库选取，不选则无背景音乐
        </div>
      </li>
      <li>
        <div class="addname">
          分享有礼
        </div>
        <div class="addcontent">
          <Radio-group v-model="activity.shareGift">
              <Radio label="1">
                  <span>打开</span>
              </Radio>
               <Radio label="0">
                  <span>关闭</span>
              </Radio>
          </Radio-group>
        </div>
        <div class="addnote"></div>
      </li>
      <li v-if="activity.shareGift == 1">
        <div class="addname">
          指定礼品
        </div>
        <div class="addcontent">
          <ul class="giftlist">
            <li v-for="(gl,index) in GiftList" @click="setGift(gl)"> <img :src="'/static/images/'+ (gl.selected?'':'un')+ 'selected.png'" alt=""><span v-text="gl.giftName"></span></li>
          </ul>
        </div>
        <div class="addnote">

        </div>
      </li>
      <li>
        <div class="addname">
          组团形式*
        </div>
        <div class="addcontent">
        <Radio-group v-model="activity.activityType">
          <Radio label="1">
              <span>自由模式</span>
          </Radio>
           <Radio label="2">
              <span>组团模式</span>
          </Radio>
      </Radio-group>
        </div>
        <div class="addnote">
        <div class="thin">
          自由模式可直接参加，组团模式只能加团或者自己建团;不同模式设置团购优惠对象不一样
        </div>

        </div>
      </li>
      <li>
        <div class="addname">
          团购优惠*
        </div>
        <div class="addcontent">
        <Row v-for="(group,index) in Group" :key="group" :label="'项目' + (index + 1)">
          <Col span="8">
             <Input type="text" v-model="group.nums" placeholder="团购人数"></Input>
          </Col>
          <Col span="8" offset="2">
             <Input type="text" v-model="group.discount" placeholder="折扣等级"></Input>
          </Col>
          <Col span="3" class="groupitemaction" v-if="Group.length!==1">
            <Button type="dashed" @click="minusGroup(index)" icon="minus-round"></Button>
          </Col>
          <Col span="3" class="groupitemaction" v-if="index==Group.length-1">
              <Button type="dashed" @click="addGroup(index)" icon="plus-round"></Button>
          </Col>
        </Row>

        </div>
        <div class="addnote">
        <div class="thin">
          人数从低到高设置,折扣根据具体情况设置;如（人数：100，折扣：7  代表人数达到100后按7折优惠）
        </div>

        </div>
      </li>
      <li>
        <div class="addname">
          订金金额*
        </div>
        <div class="addcontent">
          <input type="number" min="0" step="0.01" v-model="activity.activityMoney">
        </div>
        <div class="addnote">

        </div>
      </li>
      <li>
        <div class="addname">
          直接邀请人返现*
        </div>
        <div class="addcontent">
          <input type="number" min="0" step="0.01" v-model="activity.customerAmount">
        </div>
        <div class="addnote">
        <div class="thin">
          如不返现请设置为0,每邀请一位人参与活动，邀请人获得对应返现
        </div>

        </div>
      </li>
      <li>
        <div class="addname">
          二级邀请人返现*
        </div>
        <div class="addcontent">
          <input type="number" min="0" step="0.01" v-model="activity.customerAmount">
        </div>
        <div class="addnote">
        <div class="thin">
          如不返现请设置为0,所邀请的人每邀请一位人参与活动，二级邀请人获得对应返现
        </div>

        </div>
      </li>
      <li>
        <div class="addname">
          活动详情
        </div>
        <div class="addcontent ueditor-wrapper">
            <ueditor :value="defaultMSg" :config="Ueditorconfig" v-on:input="Ueditorinput" v-on:ready="Ueditorready"></ueditor>
        </div>

      </li>
      <li>
        <div class="addname lastaddname">

        </div>
        <div class="addcontent">
          <a href="javascript:;" class="commonbtn" @click="saveActivity()">保存</a>
        </div>
      </li>
    </ul>
  </div>
   <Modal
        v-model="musicModel"
        title="音乐库"
        @on-ok="musicOk"
        @on-cancel="musicCancel">
        <music :callback='activity.backMusic'></music>
    </Modal>
</div>

</template>

<script type="text/ecmascript-6">
import ueditor from './Ueditor'
import uploader from './Util/Uploader'
import music from './Util/Music'
export default {
  components: { ueditor, uploader, music },
  name: 'ActivityEdit',
  data () {
    return {
      defaultMSg: '修改活动内容',
      Ueditorconfig: {
        initialFrameWidth: null,
        initialFrameHeight: 320,
        info: {},
        imageUrl: 'http://up.qiniu.com/',
        imageActionName: 'uploadimage',
        imageFieldName: 'file',
        imageMaxSize: 2048000,
        imageAllowFiles: ['.jpg', '.png', '.jpeg'],
        imageCompressEnable: true,
        imageCompressBorder: 1600,
        imageInsertAlign: 'none',
        imageUrlPrefix: 'http://oolds3geo.bkt.clouddn.com/',
        imagePathFormat: 'upload/image/{yyyy}{mm}{dd}/{time}{rand:6}'
      },
      activity: {
        id: '',
        content: '',
        activityName: '',
        shareDes: '',
        shareImg: '',
        activityImg: '',
        activityNum: '',
        viewNum: '',
        startDate: '',
        endDate: '',
        backMusic: '',
        giftIds: '',
        shareGift: '',
        shareTimes: '',
        activityMoney: '',
        activityType: '',
        customerAmount: '',
        auditStatus: '',
        auditRemarks: '',
        totalMan: '',
        discount: '',
        activityLevel: [
          {
            nums: 0,
            level: 10
          }
        ]
      },
      Mainuploaderconfig: {
        maxSize: 5120,
        format: ['png', 'jpg', 'jpeg'],
        showUploadList: false,
        parent: 'activity',
        child: 'activityImg'
      },
      uploaderconfig: {
        maxSize: 1024,
        format: ['png', 'jpg', 'jpeg'],
        showUploadList: false,
        parent: 'activity',
        child: 'shareImg'
      },
      musicModel: false,
      GiftList: [],
      Group: [
        {
          nums: '',
          discount: ''
        }
      ]
    }
  },
  created () {
    this.getGiftList()
  },
  methods: {
    Ueditorready (editor) {},
    Ueditorinput (obj) {
      this.activity.content = obj.content
      this.Ueditorconfig.info = obj
    },
    saveActivity () {
      var activityLevel = ''
      for (var i in this.Group) {
        if (this.Group[i].discount > 10 || this.Group[i].discount < 0) {
          this.$Notice.error({title: '团购优惠错误', desc: '第' + (parseInt(i) + 1) + '项折扣信息需在0-10之间'})
        }
        if (i > 0) {
          if (parseInt(this.Group[i].nums) <= parseInt(this.Group[i - 1].nums)) {
            this.$Notice.error({title: '团购优惠错误', desc: '第' + (parseInt(i) + 1) + '项人数需大于上一项'})
            return false
          }
          activityLevel += ';'
        }
        activityLevel += this.Group[i].nums + ',' + this.Group[i].discount
      }
      this.activity.activityLevel = activityLevel
      var giftList = []
      for (var j in this.GiftList) {
        if (this.GiftList[j].selected === true) {
          giftList.push(this.GiftList[j].id)
        }
      }
      this.activity.giftIds = giftList.join(',')
      var ai = JSON.parse(JSON.stringify(this.activity))
      console.log(ai)
      if (!ai.activityName) {
        this.$Notice.info({title: '请完善信息', desc: '请填写活动名称'})
        return false
      }
      if (!ai.shareDes) {
        this.$Notice.info({title: '请完善信息', desc: '请填写活动分享介绍'})
        return false
      }
      if (!ai.shareImg) {
        this.$Notice.info({title: '请完善信息', desc: '请上传分享缩略图'})
        return false
      }
      if (!ai.activityImg) {
        this.$Notice.info({title: '请完善信息', desc: '请上传活动大图'})
        return false
      }
      if (!ai.startDate) {
        this.$Notice.info({title: '请完善信息', desc: '请选择活动开始时间'})
        return false
      }
      if (!ai.endDate) {
        this.$Notice.info({title: '请完善信息', desc: '请选择活动结束时间'})
        return false
      }
      if (!ai.shareGift) {
        this.$Notice.info({title: '请完善信息', desc: '请选择是否打开分享得礼'})
        return false
      }
      if (ai.shareGift === 1) {
        if (!ai.giftIds) {
          this.$Notice.info({title: '请完善信息', desc: '请选择分享礼品'})
        }
      }
      if (!ai.activityLevel) {
        this.$Notice.info({title: '请完善信息', desc: '请设置团购优惠'})
        return false
      }
      if (!ai.activityMoney) {
        this.$Notice.info({title: '请完善信息', desc: '请输入活动定金'})
        return false
      }
      if (!ai.customerAmount) {
        this.$Notice.info({title: '请完善信息', desc: '请输入直接返现金额'})
        return false
      }
      if (!ai.content) {
        this.$Notice.info({title: '请完善信息', desc: '请编辑活动内容详情'})
        return false
      }
      this.http.post('/api/activity', ai).then(res => {
        if (res.error === false) {
          this.$Notice.info({title: '添加成功', desc: '活动添加成功'})
        }
      })
    },
    musicOk () {},
    musicCancel () {
      this.musicModel = false
    },
    minusGroup (index) {
      this.Group.splice(index, 1)
    },
    addGroup (index) {
      if (this.Group[index].nums && this.Group[index].discount) {
        this.Group.push({nums: '', discount: ''})
      } else {
        this.$Notice.warning({title: '请先完善当前项内容'})
      }
    },
    getGiftList () {
      this.http.get('/api/gift/page/1').then(res => {
        if (res.error === false) {
          for (var i in res.result.records) {
            res.result.records[i].selected = false
          }
          this.GiftList = res.result.records
        }
      })
    },
    setGift (gift) {
      gift.selected = !gift.selected
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
$addcontent_height=70px
$half_height=30px

.addactivitycontent
  padding:0px
  font-size:0.9em
  li
    width:100%
    border-bottom:1px dotted #ccc
    min-height:$addcontent_height
    display:flex
    .addname
      width:150px
      text-align:center
      line-height:$addcontent_height
      &:after
        content:":"
    .lastaddname
      &:after
        content:""
    .addcontent
      line-height:$addcontent_height
      text-align:left
      flex:1
      input,
      textarea
        border:1px solid #A3A3A3
        border-radius:3px
      input
        height:$half_height
        line-height:$half_height
        width:80%
      input.contentbtns
        width:15%
        margin:0px 2%
        background:#2F9833
        color:#fff
      textarea
        margin-top:10px
        line-height:20px
      .thumbpreview
        margin-top:10px
        width:100px
        height:auto
      .privilege
        padding:5px 0px
        li
          border-bottom:0px
          height:$half_height
          line-height:$half_height
          min-height:$half_height
          input
            height:25px !important
            line-height:25px
          a
            color:#2F9833
    .addcontent.ueditor-wrapper
      line-height:20px
      padding:10px 0px
    .addnote
      color:#b2b2b2
      font-size:0.8em
      flex:1
      text-align:right
      vertical-align:middle
      line-height:$addcontent_height
      .thin
        line-height:25px
        margin-top:10px
        text-align:left

.giftlist
  padding:10px 0px
  width:100%
  li
    width:100%
    height:25px !important
    border-bottom:0px
    line-height:25px
    min-height:25px
    list-style:none
    img
      width:22px
      height:22px
      cursor:pointer
.groupitemaction
  text-align:center

</style>
