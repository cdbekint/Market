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
          <Col span="12">
            <Form :model="authenticInfo" :label-width="100">
              <Form-item label="企业名称" class="text-left">
                <span v-text="authenticInfo.companyName"></span>
              </Form-item>
              <Form-item label="联系人" class="text-left">
                <span v-text="authenticInfo.linkman"></span>
              </Form-item>
              <Form-item label="邮箱" class="text-left">
                <span v-text="authenticInfo.email"></span>
              </Form-item>
              <Form-item label="认证材料" class="text-left">
                <span v-text="authenticInfo.authenticPic"></span>
              </Form-item>
              <Form-item label="认证补充" class="text-left">
                <span v-text="authenticInfo.authenticDesc"></span>
              </Form-item>
          </Form> 
          </Col>
          <Col span="12">
            <h4>申请企业认证</h4>
            <Form :model="inputauthentic" :label-width="100">
              <Form-item label="企业名称">
                <Input v-model="inputauthentic.companyName" placeholder="工商营业执照企业名称"></Input>
             </Form-item>
             <Form-item label="统一信用代码">
                <Input v-model="inputauthentic.creditCode" placeholder="工商营业执照统一社会信用编码"></Input>
             </Form-item>
             <Form-item label="联系人">
                <Input v-model="inputauthentic.linkman" placeholder="企业法人"></Input>
             </Form-item>
             <Form-item label="联系电话">
                <Input v-model="inputauthentic.phone" placeholder="企业法人联系电话"></Input>
             </Form-item>
             <Form-item label="电子邮箱">
                <Input v-model="inputauthentic.email" placeholder="请输入"></Input>
             </Form-item>
            <Form-item label="认证材料">
              <uploader :config="uploaderconfig"> </uploader>
            </Form-item>
             <Form-item label="认证描述">
                <Input v-model="inputauthentic.authenticDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
             </Form-item>
              <Form-item label="">
                <Button type="primary" @click="handleSubmit('formValidate')">提交认证</Button>
             </Form-item>

            </Form>
          </Col>
        </Row>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import uploader from '../Util/Uploader'
export default {
  name: 'Authentic',
  data () {
    return {
      uploaderconfig: {
        maxSize: 2048,
        format: ['jpg', 'png', 'jpeg'],
        showUploadList: false,
        parent: 'inputauthentic',
        child: 'authenticPic',
        multiple:true
      },
      authenticInfo:{},
      inputauthentic:{}
    }
  },
  components: { uploader },
  methods: {
  },
  watch:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel="stylesheet/stylus">

</style>
