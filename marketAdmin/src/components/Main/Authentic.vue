<template>
  <div class="authentic">
    <div class="content-title">
      <div class="titlename">
        <span>企业认证</span>
      </div>
      <div class="titellink">
      </div>
    </div>
    <div class="content">
      <Row>
        <Col span="12" v-if='$store.state.authentic== 1 || $store.state.authentic== 2 || $store.state.authentic== 3' >
        <Form :model="authenticInfo" :label-width="100">
          <Form-item label="企业名称" class="text-left">
            <span v-text="authenticInfo.companyName"></span>
          </Form-item>
          <Form-item label="统一信用代码" class="text-left">
            <span v-text="authenticInfo.creditCode"></span>
          </Form-item>
          <Form-item label="联系人" class="text-left">
            <span v-text="authenticInfo.contacts"></span>
          </Form-item>
          <Form-item label="联系电话" class="text-left">
            <span v-text="authenticInfo.phone"></span>
          </Form-item>
          <Form-item label="电子邮箱" class="text-left">
            <span v-text="authenticInfo.email"></span>
          </Form-item>
          <Form-item label="认证材料" class="text-left">
            <div class="authenticpic" v-for="ap in authenticInfo.authenticPic.split(',')">
            <a :href="murl+ap" target="_blank" v-if="ap">
              <img :src="murl+ap" alt=""></a>
            </div>
          </Form-item>
          <Form-item label="认证补充" class="text-left">
            <span v-text="authenticInfo.authenticDesc"></span>
          </Form-item>
          <Form-item label="认证状态" class="text-left" v-if="$store.state.authentic==1">
           <Icon type="ios-checkmark" color="#44b549" size="20"></Icon> <span>审核通过</span>
          </Form-item>
          <Form-item label="申请时间" class="text-left" v-if="$store.state.authentic>=2">
            <span v-text="authenticInfo.createDate"></span>
          </Form-item>
          <Form-item label="拒绝理由" class="text-left" v-if="$store.state.authentic==3">
            <span v-text="authenticInfo.remarks"></span>
          </Form-item>
        </Form>
        <div class='wait' v-if="$store.state.authentic==2">
             <img src="/static/images/wait.png"> 
        </div> 
        <div class="wait" v-if="$store.state.authentic==3">
            <img src="/static/images/passfalse.png"/>
          </div>
        </Col>
  
        <Col span="12" v-if='$store.state.authentic==3 || $store.state.authentic==0' :data="$store.state.authentic">
  
        <Form ref="inputauthentic" :model="inputauthentic" :rules="ruleValidate" :label-width="100">
          <Form-item>
            <h2>申请企业认证</h2>
          </Form-item>
          <Form-item label="企业名称" prop="companyName">
            <Input v-model="inputauthentic.companyName" placeholder="工商营业执照企业名称"></Input>
          </Form-item>
          <Form-item label="统一信用代码" prop="creditCode">
            <Input v-model="inputauthentic.creditCode" placeholder="工商营业执照统一社会信用编码"></Input>
          </Form-item>
          <Form-item label="联系人" prop="contacts">
            <Input v-model="inputauthentic.contacts" placeholder="企业法人"></Input>
          </Form-item>
          <Form-item label="联系电话" prop="phone">
            <Input v-model="inputauthentic.phone" placeholder="企业法人联系电话"></Input>
          </Form-item>
          <Form-item label="电子邮箱" prop="email">
            <Input v-model="inputauthentic.email" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="认证材料" prop="authenticPic">
            <uploader :config="uploaderconfig"> </uploader>
            <span style="color:red">工商营业执照副本（组织机构代码，税务登记证）</span>
            <div>
              <img :src="murl+img" v-for="(img,index) in inputauthentic.authenticPic.split(',')" v-if="img" style="width:100px;height:100px;margin-right:10px;" />
            </div>
          </Form-item>
          <Form-item label="认证补充" prop="authenticDesc">
            <Input v-model="inputauthentic.authenticDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="">
            
            <Button type="primary" disabled v-if="$store.state.companyFlag==0">正式会员方可提交认证</Button>
            <Button type="primary" @click="handleSubmit('inputauthentic')" v-if="$store.state.companyFlag==1">提交认证</Button>
          </Form-item>
        </Form>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import uploader from '../Util/Uploader'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Authentic',
  data() {
    return {
      uploaderconfig: {
        maxSize: 2048,
        format: ['jpg', 'png', 'jpeg'],
        showUploadList: false,
        parent: 'inputauthentic',
        child: 'authenticPic',
        multiple: true
      },
      authenticInfo: {
        companyName: '',
        creditCode: '',
        contacts: '',
        phone: '',
        email: '',
        authenticPic: '',
        authenticDesc: ''
      },
      // inputauthentic: {},
      inputauthentic: {
        companyId: this.$store.state.companyId,
        companyName: '',
        creditCode: '',
        contacts: '',
        phone: '',
        email: '',
        authenticPic: '',
        authenticDesc: ''
      },
      ruleValidate: {
        companyName: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: '统一信用代码不能为空', trigger: 'blur' },
          { type:'string', patten: /^[A-Za-z0-9]+$/,message:'只能为15或18为数字字母组成',trigger:'blur'},
          { type:'string', max:18,message:'长度不能超出18位',trigger:'blur'},
          { type:'string', min:10,message:'长度不能小于10位',trigger:'blur'}
        ],
        contacts: [
          { required: true, message: '联系人不能为空', trigger: 'blur' },
          { type: 'string', pattern: /[\u4e00-\u9fa5]/gm, message: '请输入准确的联系人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        authenticPic: [
          { required: true, message: '请上传认证材料', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        authenticDesc: [
          { required: true, message: '叙述不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  components: { uploader },
  methods: {
    ...mapMutations([
      'upDataAuthentic'
    ]),
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.http.post(this.$store.state.prefix + '/company/saveOrUpdateAuthentic', this.inputauthentic).then(res => {
            console.log(res)
            if (res.error == false) {
              this.$Notice.success({title:'认证资料提交成功!'});
              this.getAuthenticStatus()
            } else {
              this.$Message.error(res.msg)
            }
          })
        } else {
          this.$Message.error('表单验证失败!');
        }
      })
    },
    changeDataAuthentic (data) {
      this.upDataAuthentic(data)
    },
    getAuthenticStatus(){
      this.http.get(this.$store.state.prefix + '/company/getAuthentic?companyId='+this.$store.state.companyId).then(res => {
        if(!res.error){
          if(res.result){
            res.result.createDate=this.util.getFormatDate(res.result.createDate)
            this.authenticInfo = res.result
            console.log(res.result)
            if(res.result.authenticStatus==3){
              this.inputauthentic=res.result
            }
            //同时更新本地存储的状态
            this.$store.state.authentic=res.result.authenticStatus
            this.util.setCookie("authentic",res.result.authenticStatus)
          }
        }
      })
    }
  },
  created() {
    this.getAuthenticStatus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel="stylesheet/stylus">
  .wait
    position :absolute
    right:30%
    top:40%
    width :100px
    height:100px
    font-size :0
    z-index:100
    img
      width:100%
      height:100%
h2
  font-size:1.5em
  font-weight:bolder
.authenticpic
  width:100px
  height:auto
  float:left
  max-height:200px
  margin-right:10px
  img
    width:100%
    height:auto
</style>
