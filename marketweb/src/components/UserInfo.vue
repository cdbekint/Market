<template>
<div class="UserInfo">
  <div class="userInfo">
  <Row>
    <Col span="7">
      <div class="userAvater">
      <img class="avaters" src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
    </div>
    </Col>
    <Col span="17">
      <div class="userDetail">
      <ul>
        <li>王某人<爱哭的毛毛虫></li>
        <li>13888888888</li>
        <li>余额:399</li>
        <li>积分:13340</li>
      </ul>
    </div>
    </Col>
  </Row>
  </div>
  <div class="tabWrapper">
    <Tabs value="activity">
      <Tab-pane label="参加的活动" name="activity">
        <ul class="attendActivity">
          <li>
            <div class="activityImg">
              <img src="https://m.market.cdbeki.com/FsQbJ3uQMu7OWOSPacBTeZYAcNVI" alt="">
            </div>
            <div class="activityName">
              活动名称，请参与这注意一下了哦开发
            </div>
            <div class="activityInfo">
              <div class="scanUsers">
                <Icon type="ios-eye-outline"></Icon>1000
              </div>
              <div class="attendUsers">
                <Icon type="person"></Icon>300
              </div>
            </div>
            <div class="income">
              999.0
            </div>
          </li>
          <li>
            <div class="activityImg">
              <img src="https://m.market.cdbeki.com/FsQbJ3uQMu7OWOSPacBTeZYAcNVI" alt="">
            </div>
            <div class="activityName">
              活动名称，请参与这注意一下了哦开发
            </div>
            <div class="activityInfo">
              <div class="scanUsers">
                <Icon type="ios-eye-outline"></Icon>1000
              </div>
              <div class="attendUsers">
                <Icon type="person"></Icon>300
              </div>
            </div>
            <div class="income">
              999.0
            </div>
          </li>
        </ul>
      </Tab-pane>
      <Tab-pane label="订单记录" name="orders">
          <Collapse v-model="collapse">
            <Panel name="1">
                <span>13424234324</span>    <span style="margin-left:50px">商品名字等等 </span>
                <div class="orderscontent" slot="content">
                  <p>史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                </div>
                
            </Panel>
            <Panel name="2">
                斯蒂夫·盖瑞·沃兹尼亚克
                <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
            </Panel>
            <Panel name="3">
                乔纳森·伊夫
                <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
            </Panel>
        </Collapse>
      </Tab-pane>
      <Tab-pane label="已邀请的人" name="inviter">
          <Row class="inviterList">
            <Col span="4">
              <div class="inviteravater">
                <div class="avaterWrapper">
                  <img src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
                </div> 
                <div class="invitername">
                  啦啦啦的勇气
                </div>
                
              </div>
            </Col>
            <Col span="4">
              <div class="inviteravater">
                <div class="avaterWrapper">
                  <img src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
                </div> 
                <div class="invitername">
                  啦啦啦的勇气
                </div>
                
              </div>
            </Col>
            <Col span="4">
              <div class="inviteravater">
                <div class="avaterWrapper">
                  <img src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
                </div> 
                <div class="invitername">
                  啦啦啦的勇气
                </div>
                
              </div>
            </Col>

            <Col span="4">
              <div class="inviteravater">
                <div class="avaterWrapper">
                  <img src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
                </div> 
                <div class="invitername">
                  啦啦啦的勇气
                </div>
                
              </div>
            </Col>
            <Col span="4">
              <div class="inviteravater">
                <div class="avaterWrapper">
                  <img src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
                </div> 
                <div class="invitername">
                  啦啦啦的勇气
                </div>
                
              </div>
            </Col>
            <Col span="4">
              <div class="inviteravater">
                <div class="avaterWrapper">
                  <img src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
                </div>               
                 <div class="invitername">
                  啦啦啦的勇气
                </div>
                
              </div>
            </Col>

          </Row>
      </Tab-pane>
    </Tabs>
  </div>
  <div class="restoration">
    <Table height="200px" border size="small" :columns="restorationlistColumns" :data="restorationlistData" class="restorationlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="restorationpager.total" size="small" :current="restorationpager.current" @on-change="changePage"></Page>
        </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'UserInfo',
  data () {
    return {
      collapse: 1,
      restorationlistColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '活动',
          key: 'restorationName'
        },
        {
          title: '姓名',
          key: 'restorationImg'
        },
        {
          title: '金额',
          key: 'restorationImg'
        },
        {
          title: '时间',
          key: 'restorationDesc'
        }
      ],
      restorationlistData: [],
      restorationpager: {
        total: 1,
        current: 1
      }
    }
  },
  created () {
    // this.getRestorationList(1)
  },
  methods: {
    getRestorationList (pageNo) {
      this.http.get('/api/restoration/page/' + (pageNo || 1)).then(res => {
        if (res.error === false) {
          this.restorationpager = res.result
          this.restorationlistData = res.result.records
        }
      })
    },
    changePage () {
      this.getRestorationList(this.restorationpager.current)
    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
.UserInfo
  .userInfo
    width:100%
    height:100px
    padding-top:10px
    .userAvater
      width:100%
      text-align:center
      .avaters
        width:70px
        height:auto
        max-height:70px
        border-radius:50%
        margin:0px auto
    .userDetail
      ul
        li
          width:100%
          height:20px
          line-height:20px
          text-align:left
  .tabWrapper
    min-height:250px
    .attendActivity
      li
        width:100%
        list-style:none
        height:50px
        border-bottom:1px dashed #ccc
        text-align:center
        display:flex
        margin-bottom:5px
        .activityImg
          width:50px
          float:left
          img
            height:45px
            width:auto
            max-width:45px
            margin:0px auto
        .activityName
          flex:2
          text-align:left
          overflow-y:hidden
        .activityInfo
          flex:1
        .income
          flex:1
          line-height:50px
    .inviterList
      .inviteravater
        text-align:center
        .avaterWrapper
          padding:5px 5px 0px
          img
            width:calc(100% - 10px)
            height:auto
            max-height:50px
            border-radius:5px
        .invitername
          width:100%
          font-size:0.8em
          overflow-y:hidden
          height:18px
          line-height:18px
</style>
