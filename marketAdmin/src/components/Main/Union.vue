<template>
  <div class="union">
  <div class="content-title">
    <div class="titlename">
        <span>商家联盟</span>
      </div>
      <div class="titellink">
      </div>
      </div>
      <div class="content">
       <Row>
          <Col span="20" class="unionitems">
            <div class="union-title">
              联盟会员引导增长(今日/累计)
            </div>
            <div class="union-content">
              <div class="union-register">
                <div class="uregitem">
                  <div class="upper">
                    商家
                  </div>
                  <div class="middle">
                    引出注册
                  </div>
                  <div class="down">
                    导入注册
                  </div>

                </div>
                <div class="uregitem">
                  <div class="upper">
                    成都白起网络科技有限公司
                  </div>
                  <div class="middle">
                  20/99
                  </div>
                  <div class="down">
                    10/900
                  </div>

                </div>
              </div>
            </div>
          </Col>
        </Row>
      <Row>
          <Col span="20" class="unionitems">
            <div class="union-title" style="position:relative">
              已联盟商家(移动端商家底部展示)
              <Input style="width:200px;position:absolute;right:0px" placeholder="查找商家（名称）"></Input>
            </div>
            <div class="union-content">
              <Col span="4" class="recommanditem">
                <div class="companyLogo"><img src="https://m.market.cdbeki.com/FpEsQAJXA60fwlSDXbzc2C_SvdA5" alt=""></div>
                <div class="companyName" title="射洪巴黎春天婚纱摄影">
                  射洪巴黎春天婚纱摄影
                </div>
              </Col>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="20" class="unionitems">
            <div class="union-title">
              相关商家推荐
            </div>
            <div class="union-content">
              <Col span="4" class="recommanditem">
                <div class="companyLogo"><img src="https://m.market.cdbeki.com/FpEsQAJXA60fwlSDXbzc2C_SvdA5" alt=""></div>
                <div class="companyName" title="射洪巴黎春天婚纱摄影">
                  射洪巴黎春天婚纱摄影
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Union',
  data () {
    return {
    }
  },
  methods: {
  },
  watch:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel="stylesheet/stylus">
.unionitems
  border-radius:5px
  min-height:125px
  border:1px solid #ccc
  margin:10px 0px
  border-top:none
  .union-title
    height:35px
    background:#44b549
    color:#fff
    line-height:35px
    text-align:left
    font-size:1.2em
    font-weight:bolder
    padding:0px 10px
  .union-content
    padding:10px 0px
    .recommanditem
      height:70px
      cursor:pointer
      .companyLogo
        height:50px
        width:50px
        margin:0 auto
        img
          width:100%
          height:auto
          max-height:50px
      .companyName
        width:100%
        height:20px
        overflow:hidden
    .union-register
      width:auto
      height:90px
      .uregitem
        height:90px
        width:auto
        float:left
        border:1px solid #ccc
        border-left:none
        .upper
          height:30px
          line-height:30px
          padding:0px 10px
          border-bottom:1px solid #ccc
        .middle
          height:30px
          line-height:30px
          padding:0px 10px
          border-bottom:1px solid #ccc
        .down
          height:30px
          line-height:30px
          padding:0px 10px
</style>
