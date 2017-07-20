<template>
  <div class ="company">
  <Form ref="formValidate" :model="company" :rules="ruleValidate" :label-width="100">
    <Form-item label="公司名称" prop="companyName">
      <Input v-model="company.companyName"></Input>
    </Form-item>

    <Form-item label="账户到期日期" prop="expireDate">
      <Date-picker type="datetime" :value="company.expireDate" placeholder="选择到期日期" :editable="false" @on-change="changeDate($event)"></Date-picker>
    </Form-item>
    <Form-item label="是否可用" prop="useable">
      <Select v-model="company.useable" placeholder="请选择是否可用">
        <Option value="0">不可用</Option>
        <Option value="1">可用</Option>
      </Select>
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
          id:'',
          companyName:'',
          expireDate:'',
          useable:"0"
        },
        ruleValidate: {
          useable:[
            { required: true, message: '请选择是否可用', trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: '公司名称不能为空', trigger: 'blur' }
          ],
          expireDate: [
            { required: true, message: '账户到账日期不能为空', trigger: 'blur' }
          ],
        },
      }
    },
    created () {
      var query = this.util.getQuery(location.hash);
      this.http.get(this.$store.state.prefix + "/company/"+query.id).then(res => {
        if (res.error === false) {
          this.company = res.result;
          this.company.expireDate = this.util.getFormatDate(this.company.expireDate)
          this.company.useable=String(this.company.useable)
        }
      })
    },
    methods: {
      changeDate(e){
        this.company.expireDate = e;
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            var url = '/operate/updateCompanyInfo/'+this.company.id+'?companyName='+this.company.companyName+
                      "&useable="+this.company.useable + "&expireDate="+ this.company.expireDate;
            this.http.put(this.$store.state.prefix + url).then(res => {
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
