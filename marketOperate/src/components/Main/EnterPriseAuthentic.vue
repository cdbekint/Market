<template>
  <div class='header'>
    <div class='title' v-if='companyListsShow'>待办商家</div>
    <div class='title' v-if='companyInfoShow'>{{this.companyInfoMessage.companyName}}公司信息</div>
    <div class="content">
      <div class="companyLists" v-if='companyListsShow'>
        <Table border :columns="companyListsTitle" :data="companyLists"></Table>
        <Page :total="pageNum" :page-size="pageSize" :current="pageCurrent" @on-change='getwaitCompanys' class="changepage"></Page>
      </div>
      <div v-if='companyInfoShow' style="border:1px solid #eee;padding:20px;position:relative">
        <div class='close' @click='companyInfoShow=false;companyListsShow=true;getwaitCompanys(pageCurrent)'>
          <img src='../../../static/images/del.png'>
        </div>
        <Row>
          <Col span='12' style='margin-top:20px'>
          <Table stripe :columns="companyInfoTitle" :data="companyInfo" size="large"></Table>
          <!-- <Page simple :total="companNumTotal" @on-change="getCompanyInfo('next',companyIndex)" :data='companyIndex'></Page> -->
          <div class='page'>
            <button type="button" style='float:left' @click="getCompanyInfo('prev',companyIndex)" ref='prev'>上一个</button>
            <!-- <Button type="ghost" style='float:left' @click="getCompanyInfo('prev',companyIndex)" ref='prev'>上一个</Button>  -->
            <div style='float:left' class='pagenum'>
              <span>{{companyIndex+1}}</span>/
              <span>{{companyNumTotal}}</span>
            </div>
            <button type="button" style='float:left' @click="getCompanyInfo('next',companyIndex)" ref='next'>下一个</button>
            <!-- <Button type="ghost" style='float:left' @click="getCompanyInfo('next',companyIndex)" ref='next'>下一个</Button> -->
          </div>
          </Col>
          <Col span='10' offset='2'>
          <div>公司营业执照</div>
          <Carousel v-model="Carousel">
            <Carousel-item v-for='item in acthenticAuthenticPic'>
              <div class="pic">
                <a target='_blank' :href='murl+item'>
                  <img :src='murl+item' v-if='item'>
                </a>
              </div>
            </Carousel-item>
          </Carousel>
          <div style='height:30px;line-height:30px;font-size:15px'>
            <a :href='getUrl(this.companyInfoMessage.companyName)' target="_blank">查询该公司</a>
          </div>
          <div>
            <Input v-model="examineCompany.remarks" type="textarea" :rows="4" placeholder="请输入..." style='margin-bottom:10px'></Input>
            <Button type="success" @click='passExamine'>审核通过</Button>
            <Button type="error" @click='passFalseExamine'>不能通过</Button>
          </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script  type="text/ecmascript-6">
export default {
  name: "EnterPriseAuthentic",
  data() {
    return {
      pageNum: 1, //页面总数
      pageSize: 12, //单个页面的数据个数
      pageCurrent: 0,//当前页面数
      companyNumTotal: 0, //公司列表总数
      lastCompanNum: '',//最后一页公司数
      acthenticAuthenticPic: [],
      Carousel: 0, //轮播
      companyListsShow: true,
      companyInfoShow: false,
      companyIndex: '', //该公司的索引
      examineCompany: { //准备审核的公司
        companyId: '',//该公司ID
        authenticStatus: '',//审核状态值
        remarks: '' //备注
      },
      companyListsTitle: [
        {
          title: '公司名',
          key: 'companyName'
        },
        {
          title: '持法人',
          key: 'acthenticContacts',
        },
        {
          title: '公司代码',
          key: 'acthenticCreditCode',
        },
        {
          title: '查看公司信息',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(params.row)
                    this.companyInfoMessage = params.row
                    this.examineCompany.companyId = this.companyInfoMessage.companyId
                    this.companyIndex = this.companyInfoMessage._index
                    this.getCompanyInfo('查看', this.companyIndex)
                    this.companyListsShow = false
                    this.companyInfoShow = true
                  }
                }
              }, '查看')
            ]);
          }
        }
      ],
      //所有公司
      companyLists: [],
      companyInfoTitle: [
        {
          title: '名称',
          key: 'name',
          height: 400
        },
        {
          title: '内容',
          key: 'content',
          height: 400
        },
      ],
      //该公司信息
      companyInfo: [
        {
          name: "企业名称",
          content: ''
        },
        {
          name: "统一信用代码",
          content: ''
        },
        {
          name: "联系人",
          content: ''
        },
        {
          name: "联系电话",
          content: ''
        },
        {
          name: "电子邮箱",
          content: ''
        },
        {
          name: "认证补充",
          content: ''
        }
      ]
    }
  },
  methods: {
    getwaitCompanys(pageNum) {
      if (!isNaN(pageNum)) {
        this.pageCurrent = pageNum
      } else {
        this.pageCurrent = 1
      }
      this.http.get(this.$store.state.prefix + '/operate/getAuthenticCompanyInfo/' + this.pageCurrent + '?authenticStatus=2').then(res => {
        console.log(res)
        if (!res.error) {
          if (res.result) {
            this.pageCurrent = res.result.current
            this.pageSize = res.result.size
            this.companyNumTotal = res.result.total
            this.companyLists = res.result.records
            if (this.companyNumTotal) {
              if (this.companyNumTotal > 12) {
                this.pageNum = Math.ceil(this.companyNumTotal / this.pageSize)
              } else {
                this.pageNum = 1
              }
            }
          }
        }
      })
    },
    //得到某公司信息
    getCompanyInfo(type, index) {
      switch (type) {
        case '查看':
          index = index
          break;
        case 'next':
          index++
          if (index >= this.companyNumTotal - 1) {
            index = this.companyNumTotal - 1
            this.$refs.next.disable = 'disable'
            this.$refs.next.style.cursor = 'not-allowed'
            this.$refs.prev.style.disable = ''
          }
          break;
        case 'prev':
          index--
          if (index <= 0) {
            index = 0
            this.$refs.next.style.disable = ''
            this.$refs.prev.style.disable = 'disable'
            this.$refs.prev.style.cursor = 'not-allowed'
            this.$refs.prev.style.display = 'block'
          }
          break;
      }
      this.companyIndex = index
      this.companyInfoMessage = this.companyLists[index]
      this.acthenticAuthenticPic = this.companyInfoMessage.acthenticAuthenticPic.split(',')
      this.companyInfo[0].content = this.companyInfoMessage.companyName
      this.companyInfo[1].content = this.companyInfoMessage.acthenticCreditCode
      this.companyInfo[2].content = this.companyInfoMessage.acthenticContacts
      this.companyInfo[3].content = this.companyInfoMessage.acthenticPhone
      this.companyInfo[4].content = this.companyInfoMessage.acthenticEmail
      this.companyInfo[5].content = this.companyInfoMessage.acthenticAuthenticDesc
    },
    //通过审核
    passExamine() {
      this.examineCompany.authenticStatus = 1
      this.http.post(this.$store.state.prefix + '/operate/authenticCompany', this.examineCompany).then(res => {
        console.log(res)
        if (!res.error) {
          this.examineCompany.remarks = ''
          this.getCompanyInfo('next', this.companyIndex)
          // if (this.companyIndex == this.companyNumTotal - 1) {
          //   this.companyInfoShow = false;
          //   this.companyListsShow = true;
          //   this.getwaitCompanys(1)
          // }
        }
      })
    },
    //没能通过审核
    passFalseExamine() {
      this.examineCompany.authenticStatus = 3
      this.http.post(this.$store.state.prefix + '/operate/authenticCompany', this.examineCompany).then(res => {
        if (!res.error) {
          this.examineCompany.remarks = ''
          this.getCompanyInfo('next', this.companyIndex)
          if (this.companyIndex == this.companyNumTotal - 1) {
            this.companyInfoShow = false;
            this.companyListsShow = true;
            this.getwaitCompanys(1)
          }
        }
      })

    },
    //天眼跳转
    getUrl(data) {
      return "https://www.tianyancha.com/search?key=" + data + "&checkFrom=searchBox"
    }
  },
  created() {
    if (!this.companyNumTotal) {
      this.pageCurrent = 1
      this.pageNum = 1
    }
    if (this.$store.state.operatetoken) {
      this.getwaitCompanys(1)
    }
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
.header
  margin 10px 0
.ivu-table-row
  height 50px
  line-height 50px
.title
  height:30px
  line-height :30px
  font-size :20px
.changepage
  float:right
  margin-top 10px
.pic
  width :100%
  height:217px
  font-size :0
  img
    width:100%
    height:100%
.close
  width:25px
  height:25px
  position:absolute
  right:5px
  top:5px
  font-size 0
  text-align center
  cursor pointer
  z-index 100
  border-radius 50%
  img
    width 100%
    cursor pointer
.page
  width 200px
  height 40px
  margin-left 30%
  margin-top 20px 
  button
    width 68px
    height 32px
    line-height 32px
    text-align center
    border 1px solid #eee
    border-radius 4px
    cursor pointer
  .pagenum
    margin 0 5px
    span
      width 32px
      height 32px
      line-height 32px
      text-align center
      font-size 20px  
</style>
