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
        <Col span="12" v-if='$store.state.authentic=== 1 || $store.state.authentic=== 2' :data =' $store.state.authentic'>
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
            <span v-text="authenticInfo.authenticPic"></span>
          </Form-item>
          <Form-item label="认证补充" class="text-left">
            <span v-text="authenticInfo.authenticDesc"></span>
          </Form-item>
        </Form>
         <div class='wait' v-if='$store.state.authentic === 2'>
               <img src="../../../static/images/wait.png"> 
          </div>  
          <div class='wait' v-if='$store.state.authentic === 1'>
               <img src="../../../static/images/passfalse.png"> 
          </div> 
        </Col>
  
        <Col span="12" v-if='$store.state.authentic===3 || $store.state.authentic===0' :data="$store.state.authentic">
  
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
            <uploader :config="uploaderconfig" @getImg='getImgs'> </uploader>
            <span style="color:red">工商营业执照副本（组织机构代码，税务登记证）</span>
            <div>
              <img :src="murl+img" v-for="(img,index) in inputauthentic.authenticPic.split(',')" v-if="img" style="width:100px;height:100px;margin-right:10px;" />
            </div>
          </Form-item>
          <Form-item label="认证补充" prop="authenticDesc">
            <Input v-model="inputauthentic.authenticDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="">
            <Button type="primary" @click="handleSubmit('inputauthentic')">提交认证</Button>
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
              this.$Message.success('提交成功!');
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
    }
    // delImg(index) {
    //   this.inputauthentic.authenticPic.splice(index,1)
    // },
    // getImgs(data){
    //   this.inputauthentic.authenticPic.push(data)
    // }
  },
  created() {
      this.http.get(this.$store.state.prefix + '/company/getAuthentic?companyId=' + this.$store.state.companyId).then(res => {
      if (!res.error) {
        this.authenticInfo = res.result
        this.util.setCookie('authentic', this.authenticInfo.authenticStatus)
        this.changeDataAuthentic(this.authenticInfo.authenticStatus)
      }
    })
},
watch: {
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel="stylesheet/stylus">
  .wait
    position :absolute
    left:0
    top:76px
    width :200px
    height:200px
    font-size :0
</style>
