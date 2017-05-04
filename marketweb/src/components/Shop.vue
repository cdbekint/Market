<template>
  <div class="shopPage">
    <div class="shopinfo">
      <div class="shopLogo"><img src="https://m.market.cdbeki.com/Fj2oB32SOWtByh_eGK03ABm0Yzc8" alt=""></div>
      <div class="shopDesc">
        成都白起网络科技公司成立于2016年2月，立足于为传统企业提供互联网服务，真正的打通传统行业与互联网行业的跨界。
      </div>
    </div>
    <Tabs value="goods" class="shopContent">
        <Tab-pane label="优质商品" name="goods">
            <Row>
              <Col span="12" class="goodsItems">
                <div class="goodsImg">
                    <img src="https://img12.360buyimg.com/n7/jfs/t3196/295/4684591179/191025/4c57e3ca/5853a6d7N1c1d8ad7.jpg" alt="">
                </div>
                <div class="goodsInfo">
                  <div class="goodsName">
                    荣耀Magic 4GB+64GB 玄金黑 全网通手机 双卡双待双通
                  </div>
                  <div class="goodsPrice">
                    ￥3699.00
                  </div>
                  <div class="goodTags">
                    满赠
                  </div>
                </div>
              </Col>
              <Col span="12" class="goodsItems">
                <div class="goodsImg">
                    <img src="https://img12.360buyimg.com/n7/jfs/t3196/295/4684591179/191025/4c57e3ca/5853a6d7N1c1d8ad7.jpg" alt="">
                </div>
                <div class="goodsInfo">
                  <div class="goodsName">
                    荣耀Magic 4GB+64GB 玄金黑 全网通手机 双卡双待双通
                  </div>
                  <div class="goodsPrice">
                    ￥3699.00
                  </div>
                  <div class="goodTags">
                    满赠
                  </div>
                </div>
              </Col>
            </Row>
        </Tab-pane>
        <Tab-pane label="活动列表" name="activity">标签二的内容</Tab-pane>
        <Tab-pane label="其他内容" name="customer">标签三的内容</Tab-pane>
    </Tabs>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Shop',
  data () {
    return {
    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
.shopPage
  .shopinfo
    width:100%
    .shopLogo
      width:30%
      margin:0px auto
      overflow-y:hidden
      img
        width:100%
        height:auto
    .shopDesc
      width:70%
      margin:0px auto
      text-align:left
      color:rgba(0,0,0,0.6)
      text-indent:2em
.shopContent
  .goodsItems
    padding:0px 10px
    .goodsImg
      img
        width:100%
</style>
