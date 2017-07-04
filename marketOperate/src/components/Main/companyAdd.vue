<template>
  <div class ="company">
  <Form ref="formValidate" :model="company" :rules="ruleValidate" :label-width="100">
    <Form-item label="用户名" prop="username">
      <Input v-model="company.username" placeholder="请输入姓名"></Input>
    </Form-item>
    <Form-item label="密码" prop="password">
      <Input v-model="company.password"></Input>
    </Form-item>
    <Form-item label="公司名称" prop="companyName">
      <Input v-model="company.companyName"></Input>
    </Form-item>
    <Form-item label="真实姓名" prop="realName">
      <Input v-model="company.realName"></Input>
    </Form-item>
    <Form-item label="联系方式" prop="phone">
      <Input v-model="company.phone"></Input>
    </Form-item>
    <Form-item label="邮箱地址" prop="email">
      <Input v-model="company.email"></Input>
    </Form-item>
    <Form-item label="账户到期日期" prop="expireDate">
      <Date-picker type="datetime" placeholder="选择到期日期" :editable="false" @on-change="changeDate($event)"></Date-picker>
    </Form-item>
    <Form-item>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </Form-item>
  </Form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        company: {
          username: '',
          password: '',
          companyName:'',
          realName:'',
          phone:'',
          email:'',
          expireDate:''
        },
        ruleValidate: {
          realName: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: '公司名称不能为空', trigger: 'blur' }
          ],
          expireDate: [
            { required: true, message: '账户到账日期不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '联系方式不能为空', trigger: 'blur' },
          ],
          username: [
            { required: true, message: '输入管理员用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '输入管理员密码', trigger: 'blur' }
          ],
        },
      }
    },
    created () {
    },
    methods: {
      changeDate(e){
        this.company.expireDate = e;
      },
      handleSubmit (name) {
        var ai = JSON.parse(JSON.stringify(this.company))
        if(!(/^1[34578]\d{9}$/.test(ai.phone))){
          this.$Message.error('手机格式不正确!');
          return false;
        }
        this.$refs[name].validate((valid) => {
          if (valid) {

            this.http.post(this.$store.state.prefix + '/operate/register' ,this.company).then(res => {
              if (res.error === false) {
                this.$Message.success('提交成功!');
                this.$router.push("/companylist")
              }
              else {
                this.$Message.error(res.msg);
              }
            })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .company
    margin-top 20px
    width 70%
</style>
