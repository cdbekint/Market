<template>
 
<div class="emploeyelist">
<div class="content-title">
      <!-- 页面的标题 -->
      
      <div class="titlename">
      	<span>员工列表</span>
      </div>
      <div class="titellink">
      <router-link to="/employee/add" class="innerbtnlink">添加员工</router-link>
      </div>
 </div>
<div class="content">
	 <Table border :columns="employeelistColumns" :data="employeelistData"></Table>
   <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="employeepager.total" :page-size="employeepager.size" :current="employeepager.current" @on-change="changePage"></Page>
        </div>
    </div>

</div>
 </div>

</template>

<script  type="text/ecmascript-6">
export default {
  name: 'Employee',
  data () {
    return {
      employeelistColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '头像',
          key: 'cphoto',
          render (row) {
            return '<img class="employeeavater" :src="murl+row.cphoto"/>'
          }
        },
        {
          title: '姓名',
          key: 'employeeName'
        },
        {
          title: '电话',
          key: 'employeeTel'
        },
        {
          title: '客户数',
          key: 'customerNum'
        },
        {
          title: '操作',
          key: 'action',
          render () {
            return '<i-button type="text" size="small">修改</i-button><i-button type="text" size="small">删除</i-button>'
          }
        }

      ],
      employeelistData: [],
      employeepager: {
        total: 1,
        size:1,
        current: 1
      }
    }
  },
  created () {
    this.getEmployeeList(1)
  },
  methods: {
    getEmployeeList (pageNo) {
      this.http.get(this.$store.state.prefix + '/employee/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.employeepager = res.result
          this.employeelistData = res.result.records
        }
      })
    },
    changePage (e) {
      this.getEmployeeList(e)
    }
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
.employeelisttable
  tr
  	td
  	  vertical-align:middle
  	  font-size:0.9em
  	  text-align:center


.ivu-table
  td,th
    text-align:center
    .employeeavater
      display:inline-block
      width:40px
      height:40px
      border:1px solid #eee
      border-radius:3px
</style>
