<template>
<div class="employeeadd">
	<div class="content-title">
      <div class="titlename">
      	<span>添加员工</span>
      </div>
      <div class="titellink">
      	<router-link to="/employee" class="innerbtnlink">员工列表</router-link>
      </div>
 	</div>
 	<div class="content">
    <Form ref="formValidate" :model="employs" class="goodseditform"  :label-width="100">
      <Form-item label="姓名" prop="employeeName">
        <Input v-model="employs.employeeName" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="头像" class="text-left">
        <uploader :config="uploaderconfig"> </uploader>
        <input type="hidden" v-model="employs.headImg">
      </Form-item>
      <Form-item label="图片预览">
        <a :href="murl + employs.headImg" target="_blank" v-if="employs.headImg">
          <img :src="murl+employs.headImg" alt="" class="goodsImgThumb">
        </a>
      </Form-item>
      <Form-item label="电话" prop="phone">
        <Input type="text" v-model="employs.phone" number></Input>
      </Form-item>
      <Form-item label="客户数" prop="customerNum">
        <Input type="text" v-model="employs.customerNum" number></Input>
      </Form-item>
      <Form-item label="排序">
        <Input type="text" v-model="employs.sort" number></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="handleReset('formValidate')">取消</Button>
      </Form-item>
    </Form>
  </div>
</div>
</template>

<script  type="text/ecmascript-6">
import uploader from './Util/Uploader'
export default {
  name: 'EmployeeAdd',
  data () {
    return {
      employs: {
        goodsName: '',
        goodsImg: '',
        goodsPrice: '',
        maxPoints: '',
        sort: 0,
        storageNum: '',
        goodsStatus: 1,
        goodsDesc: '',
        goodsDate: (new Date().getTime())
      },
      uploaderconfig: {
        maxSize: 5120,
        format: ['jpg', 'png', 'jpeg'],
        showUploadList: false,
        parent: 'employs',
        child: 'goodsImg'
      }
    }
  },
  components: { uploader },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.employs.id === '') {
            delete this.employs.id
          }
          this.http.post('/api/goods', this.employs).then(res => {
            if (res.error === false) {
              this.$Message.success('保存成功')
              this.router.push('/goods')
            }
          })
        } else {
          this.$Message.error('验证失败')
        }
      })
    }
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
</style>
