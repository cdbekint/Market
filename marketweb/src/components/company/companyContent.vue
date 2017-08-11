<template>
  <div class="companyContent">
  
    <div class="main_title">
      <div v-for="x,index in titleImgs" @click="changeTitle(index)">
        <img :src="x.static==1?x.on:x.off">
      </div>
    </div>
  
    <div class="main_class" v-if="currentPage==0 && notDetail && !showSystem">
      <div class="class_txt">
        <span v-for="x,index in category" :style="x.state==1?{color:x.on}:{color:x.off}" @click="changeTxt(index+1)" v-if="!x.system||(x.system&&ids.companyId==3)">{{x.txt}}</span>
      </div>
      <div class="class_goods" v-if="showGoods">
        <div class="goods_info" v-for="x in goods" @click="showDetail(x.id,2)" v-if="currentIndex!=4">
          <img :src="murl + x.img" class="info_img" @click="showDetail(x.id,2)">
          <div class="info_text">
            <span class="text_title">{{x.title}}</span>
            <span class="text_price">{{x.price}}</span>
  
          </div>
        </div>
        <!-- 判断是否是系统商品 currentIndex==4则为系统商品 -->
        <div class="goods_info" v-for="x in goods" v-if="currentIndex==4" @click="showSystemGood(x)">
          <img :src="murl + x.img" class="info_img">
          <div class="info_text">
            <span class="text_title">{{x.title}}</span>
            <span class="text_price">{{x.price+'分'}}</span>
          </div>
        </div>
      </div>
      <div class="info_isNull" v-if="!showGoods">
        <img src="/static/images/shop.png">
        <p>这里暂时没有商品喔</p>
      </div>
      <!--<div class="class_pull">-->
      <!--<img src="/static/images/company/pull.png" alt="">-->
      <!--</div>-->
      <div style="position:fixed;right:1em;bottom:6.5em;height:52px;width:52px;border-radius:50%;border:1px solid #FE54A8">
        <img src="/static/images/fuqian.png" @click.stop="isWithdraw=true" style="width:100%;height:100%">
      </div>
  
    </div>
  
    <div class="main_detail" v-if="currentPage==0 && !notDetail">
      <div class="main_detail_buy">
        <div class="detail_back" @click="returnGoodsList">
          <img src="/static/images/company/fanhui.png">
        </div>
        <div class="detail_bg">
          <div class="carouselitem">
            <img :src="murl+currentGoods.images[0]" alt="">
          </div>
        </div>
        <div class="detail_text">
          <div class="text_main">
            <span class="main_title">{{currentGoods.name}}</span>
            <div class="main_coll">
              <span>已售{{currentGoods.saleNum}}件</span>
              <span>库存{{currentGoods.storageNum}}件</span>
            </div>
            <div class="text_jifen">
              <img src="/static/images/company/jifenTwo.png">
              <span>{{currentGoods.price }}</span>
            </div>
          </div>
          <div class="detail_btn" @click="payGoods">
            <span v-if="!payState">{{ids.discount?ids.discount+'折':''}}立即购买</span>
            <span v-else>
              <Icon type="ios-checkmark-outline" size="23" style="margin-right:10px"></Icon>购买成功</span>
          </div>
        </div>
      </div>
  
      <div class="detail_html">
        <!-- <div class="bg"></div> -->
        <div class="txt good_details" v-html="currentGoods.desc"></div>
      </div>
      <div class="back_to_top" v-if="backToTop" @click="handleBackTop">
        <img src="/static/images/backTop.png">
      </div>
    </div>
    <div class="main_system" v-if="currentPage==0 && showSystem">
      <img src="/static/images/company/fanhui.png" @click="showSystem=false" class="detail_return">
      <div class="system_content">
        <div class="createMarket" v-if="currentRenew.renewType==2">
  
          <div class="markettitle" v-text="currentRenew.title">
  
          </div>
          <Form :label-width="70" class="marketform">
            <Form-item label="企业名称">
              <Input placeholder="请输入企业名称" v-model="createAccount.companyName"></Input>
            </Form-item>
            <Form-item label="登录账户">
              <Input placeholder="请输入登录账户名(字母+数字)" v-model="createAccount.username"></Input>
            </Form-item>
            <Form-item label="手机号码">
              <Input placeholder="请输入11位手机号码" v-model="createAccount.phone"></Input>
            </Form-item>
            <Form-item label="邮箱">
              <Input placeholder="请输入邮箱" v-model="createAccount.email"></Input>
            </Form-item>
            <Form-item label="">
              <Checkbox-group v-model="createAccount.protocol">
                <Checkbox label="true">已阅读并同意
                  <a href="javascript:;" @click="serviceprotocol=true">《裂变营销系统使用协议》</a>
                </Checkbox>
              </Checkbox-group>
            </Form-item>
            <div class="errorInfo text-left" v-text="createAccount.errormsg" v-if="createAccount.errormsg">
            </div>
            <div>
              <Button type="primary" v-text="'支付'+(currentRenew.price||0)+'积分并注册'" @click="createMarketAccount()"></Button>
            </div>
            <div class="mention">
              <ul>
                <li>1.默认密码为手机号后六位,注册成功请尽快修改</li>
                <li>2.请认证阅读使用协议</li>
                <li>3.后台登录地址：http://yx.cdbeki.com</li>
              </ul>
            </div>
          </Form>
        </div>
        <div class="renewMarket" v-if="currentRenew.renewType==1">
          <img :src="murl+currentRenew.img" alt="">
          <div class="renewMarketcontent">
            <div class="displayflexcolumn ">
              <div class="displayflex renewMarketitem">
                <div class="flex1" v-text="currentRenew.title" style="text-align: center;font-size:1.1em;font-weight: bolder;"></div>
  
              </div>
              <div class="displayflex renewMarketitem">
                <div class="flex1">公司名称</div>
                <div class="flex2" v-text="currentRenew.company.companyName"></div>
              </div>
              <div class="displayflex renewMarketitem">
                <div class="flex1">到期时间</div>
                <div class="flex2" v-text="currentRenew.company.expireDate"></div>
              </div>
              <div class="displayflex renewMarketitem">
                <div class="flex1">续费时长</div>
                <div class="flex2" v-text="currentRenew.month+'月'"></div>
              </div>
            </div>
            <div class="btn">
              <Button type="primary" v-text="'支付'+(currentRenew.price||0)+'积分续费'" @click="renewMarketAccount()"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- 优惠活动 -->
    <div class="main_discount" v-if="currentPage==1">
      <div class="discount_goods">
        <div class="goods_info" v-for="x in active" @click="goToActive(x.id)">
          <img :src="stateImgArr[x.state]" class="info_state">
          <img :src="murl + (x.phoneImg?x.phoneImg:x.img)" class="info_bg" @click="goToActive(x.id)">
          <div class="info_view">
            <div class="view_share">
              <img src="/static/images/company/return.png">
              <span>{{x.share}}</span>
            </div>
            <div class="view_num">
              <img src="/static/images/company/view.png">
              <span>{{x.view}}</span>
            </div>
          </div>
          <div class="info_txt">
            <div class="txt_title">
              <p>{{x.title}}</p>
            </div>
            <div class="txt_people">
              <img src="/static/images/company/pe.png">
              <span>{{x.people}}人</span>
            </div>
            <div class="txt_team">
              <img src="/static/images/company/team.png">
              <span>{{x.team}}团</span>
            </div>
          </div>
        </div>
        <!--<div class="discount_pull">-->
        <!--<img src="/static/images/company/pull.png" alt="">-->
        <!--</div>-->
      </div>
    </div>
  
    <!-- 会员排行 -->
    <div class="main_member" v-if="currentPage==2">
      <div class="member_hr">
        <div class="hr_1"></div>
        <div v-for="x,index in jifenCategory" :class="'hr_'+x.num" @click="changeJifen(index)" :style="x.state==1?{color:x.on}:{color:x.off}">{{x.txt}}</div>
      </div>
      <div class="member_list" v-if="showMember">
        <div class="member_content" v-for="x,index in member">
          <div class="list_sort" style="color:#ff017e;font-weight:bold;" v-if="index <= 2">NO.{{index+1}}</div>
          <div class="list_sort" style="color:#ff017e;font-weight:bold;" v-else>{{index+1}}</div>
          <div class="list_img">
            <img :src="x.img" alt="">
          </div>
          <div class="list_name">
            <span v-text="x.name"></span>
          </div>
          <div class="list_jifen">
            <img src="/static/images/company/jifen.png">
            <p>{{x.surplus}}分</p>
          </div>
          <div class="list_total">
            <img src="/static/images/company/total.png">
            <p>{{x.total}}分</p>
          </div>
          <div class="list_people">
            <img src="/static/images/company/people.png">
            <p>{{x.people}}人</p>
          </div>
        </div>
      </div>
      <div class="info_isNull" v-if="!showMember">
        <img src="/static/images/shop.png">
        <p>这里暂时没有数据喔</p>
      </div>
    </div>
  
    <div class="main_company" v-if="currentPage==3" v-html="showInfo">
      <div class="info_isNull" v-if="!showHtml">
        <img src="/static/images/shop.png">
        <p>这里暂时没有数据喔</p>
      </div>
    </div>
  
    <Modal v-model="isWithdraw" @on-ok="customerPay" @on-cancel="cancel" ok-text="付款" :closable="false" title="自助付款" style="position: relative;padding:0px 15%">
      <Row style="text-align:left;padding-left:40px;font-size:1.3em;color:#AEAEAE">
        <div>
          <span>请输入付款金额(元)</span>
          <br>
        </div>
      </Row>
      <Row style="text-align:center;padding-left:40px;">
        <Input v-model="payMoney" style="border-radius:0px;padding:3px;font-size:1.2em;color:#B5B5B5"></Input>
      </Row>
      <Row style="text-align:left;padding-left:40px;font-size:1.3em;color:#AEAEAE">
        <div>
          <span>商品名称</span>
          <br>
        </div>
      </Row>
      <Row style="text-align:center;padding-left:40px;">
        <Input v-model="payRemarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="商品名称与数量"></Input>
      </Row>
    </Modal>
    <Modal v-model="serviceprotocol" title="裂变营销系统使用协议" @on-ok="aggreProtocol" ok-text="我已阅读并同意" cancel-text="取消">
      解放拉萨飞
    </Modal>
    <Modal v-model="paySuccess" :closable="false" width="1000">
      <p class="modelTitle">
        <img src='/static/images/company/messages.png'>
      </p>
      <p class="modelPic">
        <img src="/static/images/company/success.png">
      </p>
      <p class="modelSuccess">支付成功</p>
      <p class="modelTishi">商家客户会尽快联系你，请保持手机畅通</p>
      <p slot="footer" class="modelBack" @click="paySuccess=false">返回当前页面</p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import swiper from 'vue-swiper'
export default {
  name: 'companyContent',
  props: ["ids"],
  components: { swiper },
  methods: {
    handleScroll() {
      if (window.scrollY > 0) {
        this.backToTop = true
      } else if (window.scrollY == 0) {
        this.backToTop = false
      }
    },
    handleBackTop() {
      let timer = setInterval(() => {
        this.animation.totalNum += this.animation.speed
        document.documentElement.scrollTop = document.body.scrollTop = window.scrollY - this.animation.totalNum
        if (window.scrollY - this.animation.speed <= 0) {
          document.documentElement.scrollTop = document.body.scrollTop = 0;
          this.animation.totalNum = 0
          clearInterval(timer)
        }
      }, this.animation.time)
      this.backToTop = false
    },
    customerPay() {
      if (isNaN(this.payMoney)) {
        this.$Message.error("付款金额必须为数字");
        return
      }
      if (Number(this.payMoney) <= 0) {
        this.$Message.error("付款金额必须大于0");
        return
      }
      if (!this.payRemarks) {
        this.$Message.error("商品名称必填");
        return
      }
      debugger
      var param = {
        payAmount: this.payMoney,
        remarks: "自助购买" + this.payRemarks,
        companyId: this.ids.companyId,
        payType: 6
      }
      debugger
      //自助付款
      console.log("自助支付开始了")
      if (this.customerpaying) return;
      this.customerpaying = true
      this.http.post(this.$store.state.prefix + '/pay', param).then((res) => {
        if (res.error === false) {
          var row = res.result;
          var onBridgeReady = () => {
            var _this = this
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                'appId': row.appid,
                'timeStamp': row.timeStamp,
                'nonceStr': row.nonce_str,
                'package': row.prepay_id,
                'signType': row.sign_type,
                'paySign': row.sign
              },
              function (res) {
                _this.customerpaying = false
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  _this.$Message.success("自助付款成功");
                  _this.payMoney = 0;
                  _this.payRemarks = "";
                }
                else if (res.err_msg != 'get_brand_wcpay_request:cancel') {
                  _this.$Message.error("取消支付");
                } else {
                  _this.$Message.error("购买失败");
                }
              }
            )
          }
          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
            }
          } else {
            onBridgeReady()
          }
        } else {
          this.$Message.error(res.msg)
        }
      })


    },
    cancel() {
      this.isWithdraw = false;
    },
    returnGoodsList() {
      this.notDetail = true;
    },
    payGoods() {
      if (this.isloading) return
      this.isloading = true
      this.http.post(this.$store.state.prefix + '/pay', this.params).then((res) => {
        if (res.error === false) {
          var row = res.result;
          if (this.currentGoods.goodsType === 2) {
            this.payState = true
            this.$Message.success("购买成功");
          } else {
            var onBridgeReady = () => {
              var _this = this
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  'appId': row.appid,
                  'timeStamp': row.timeStamp,
                  'nonceStr': row.nonce_str,
                  'package': row.prepay_id,
                  'signType': row.sign_type,
                  'paySign': row.sign
                },
                function (res) {
                  this.isloading = false
                  if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    _this.payState = true
                    // _this.$Message.success("购买成功");
                    _this.paySuccess = true
                  }
                  else if (res.err_msg != 'get_brand_wcpay_request:cancel') {
                    _this.$Message.error("取消支付");
                  } else {
                    _this.$Message.error("购买失败");
                  }
                }
              )
            }
            if (typeof WeixinJSBridge === 'undefined') {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
              }
            } else {
              onBridgeReady()
            }
          }
        }
      })
    },
    showSystemGood(renew) {
      if (renew.renewType == 1) {
        this.showSystem = true
        renew.company = {}
        this.currentRenew = renew
        this.http.get(this.$store.state.prefix + '/pubInfo/getCompanyExpireInfo').then(res => {
          if (!res.error) {
            if (JSON.stringify(res.result) != "{}") {
              var currentrenew = JSON.parse(JSON.stringify(this.currentRenew))
              currentrenew.company = res.result
              currentrenew.company.expireDate = this.util.getFormatDate(currentrenew.company.expireDate)
              this.currentRenew = currentrenew
            } else {
              this.$Message.error("该账户未与微信绑定,请购买开户产品!")
            }
          }

        })
      } else {
        this.showSystem = true
        this.currentRenew = renew;
      }
    },
    showDetail(id, state) {
      this.http.get(this.$store.state.prefix + '/goods/' + id).then((res) => {
        if (res.error == false) {
          var row = res.result;
          this.currentGoods = {
            saleNum: row.saleNum,
            storageNum: row.storageNum,
            name: row.goodsName,
            price: row.goodsPrice,
            img: row.goodsImg,
            images: row.goodsImg.split(","),
            desc: this.util.escapeToHtml(row.goodsDesc),
            goodsType: row.goodsType
          }
          console.log(this.currentGoods)
          if (this.ids.discount) {
            console.log(this.ids.discount)
            console.log(this.currentGoods.price)

            this.currentGoods.price = Number(this.currentGoods.price) * Number(this.ids.discount) / 10

            console.log(this.currentGoods.price)
          }
          if (state == 1) {
            //判断是否是从活动中带过来支付
            this.params = {
              businessId: this.ids.activeId,
              payType: 2,
              payAmount: 0,
              companyId: row.companyId,
              goodsId: row.id
            }
          }
          else {
            this.params = {
              businessId: 0,
              payType: 2,
              payAmount: 0,
              companyId: row.companyId,
              goodsId: row.id
            }
          }

          if (row.goodsType == 1) {
            this.currentGoods.price = this.currentGoods.price + "元"
          }
          else if (row.goodsType == 2) {
            this.currentGoods.price = row.maxPoints + "积分"
          }
          else if (row.goodsType == 3) {
            this.currentGoods.price = this.currentGoods.price + "元 + " + row.maxPoints + "积分"
          }

          this.notDetail = false;
        }
      });
    },
    goToActive(id) {
      var oldUrl = location.href;
      var index = oldUrl.indexOf("?");
      var state = this.util.getURLParam('state').split(",")

      var preUrl = oldUrl.slice(0, index + 1);
      var state = "state=" + id + "," + window.localStorage["ownId"];

      var url = preUrl + state;
      location.href = url;
    },
    changeTitle(index) {
      this.currentPage = index;
      this.titleImgs.forEach((item, i) => {
        item.static = 0;
        if (index == i) {
          item.static = 1;
        }
      })
    },
    changeJifen(index) {
      this.jifenCategory.forEach((item, i) => {
        item.state = 0;
        if (index == i) {
          item.state = 1;
        }
      });

      var url = this.url == '' ? "?orderType=" + (index + 1) : this.url + "&orderType=" + (index + 1)
      this.http.get(this.$store.state.prefix + "/shop/getMemsInfo" + url).then(res => {
        if (res.error == false) {
          this.member = [];
          var row = res.result;
          row.forEach(item => {
            var obj = {
              name: item.realName || item.nickName,
              img: item.headImg,
              surplus: item.points,
              total: item.allPoints,
              people: item.invitedMems
            }
            if (obj.name.length > 2) {
              obj.name = obj.name.substring(0, 1) + "*" + obj.name.substr(obj.name.length - 1, 1)
            } else if (obj.name.length == 2) {
              obj.name = obj.name.substring(0, 1) + "*"
            }
            this.member.push(obj)
          })
          if (this.member.length == 0)
            this.showMember = false;
          else
            this.showMember = true;
        }
      })
    },
    changeTxt(index) {
      this.currentIndex = index
      this.category.forEach((item, i) => {
        item.state = 0;
        if ((index - 1) == i) {
          item.state = 1;
        }
      });
      this.goods = [];
      if (index < 4) {
        this.getGoodsByType(index);
      } else {
        this.getSystemGoods();
      }

    },
    getSystemGoods() {
      this.http.post(this.$store.state.prefix + "/pubInfo/getSystemRenewInfo", { chargeType: 2 }).then(res => {
        if (res.error == false) {
          res.result.forEach(item => {
            var obj = null;
            obj = {
              id: item.id,
              img: item.renewPic,
              title: item.renewName,
              price: item.points,
              chargeType: item.chargeType,
              renewType: item.renewType,
              month: item.month
            }

            this.goods.push(obj)
          })

          if (this.goods.length == 0)
            this.showGoods = false;
          else
            this.showGoods = true;
        }
      })
    },
    getGoodsByType(id) {
      this.http.get(this.$store.state.prefix + "/shop/getGoodsInfo/" + id + this.url).then(res => {
        if (res.error == false) {
          res.result.forEach(item => {
            var obj = null;
            if (id == 1) {
              obj = {
                id: item.id,
                img: item.goodsImg.split(",")[0],
                title: item.goodsName,
                price: item.goodsPrice + "元"
              }
            }
            else if (id == 2) {
              obj = {
                id: item.id,
                img: item.goodsImg.split(",")[0],
                title: item.goodsName,
                price: item.maxPoints + "积分"
              }
            }
            else if (id == 3) {
              obj = {
                id: item.id,
                img: item.goodsImg.split(",")[0],
                title: item.goodsName,
                price: item.goodsPrice + "元 + " + item.maxPoints + "积分"
              }
            }

            this.goods.push(obj)
          })
          if (this.goods.length == 0)
            this.showGoods = false;
          else
            this.showGoods = true;
        }
      })
    },
    aggreProtocol() {
      this.createAccount.protocol = ["true"]
    },
    onSlideChangeStart(currentPage) {
      console.log('onSlideChangeStart', currentPage);
    },
    onSlideChangeEnd(currentPage) {
      console.log('onSlideChangeEnd', currentPage);
    },
    createMarketAccount() {
      var param = JSON.parse(JSON.stringify(this.createAccount))
      if (!/(\w*[\u4e00-\u9fa5]+)+/.test(param.companyName)) {
        this.createAccount.errormsg = "企业名称不能为空,且必须包含中文"
        return
      } else {
        this.createAccount.errormsg = ""
      }
      if (!/^[a-zA-z]\w{3,15}$/.test(param.username)) {
        this.createAccount.errormsg = "登录账户名只能为数字加字母（4-16位）"
        return
      } else {
        this.createAccount.errormsg = ""
      }
      if (!/^1[34578]\d{9}$/.test(param.phone)) {
        this.createAccount.errormsg = "手机号码不正确"
        return
      } else {
        this.createAccount.errormsg = ""
      }
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(param.email)) {
        this.createAccount.errormsg = "邮箱格式不正确"
        return
      } else {
        this.createAccount.errormsg = ""
      }
      if (param.protocol.length == 0) {
        this.createAccount.errormsg = "请仔细阅读裂变营销系统使用协议"
        return
      } else if (param.protocol[0] == "true") {
        this.createAccount.errormsg = ""
      }
      this.http.get(this.$store.state.prefix + '/pubInfo/judgeCreateCompany').then(res => {
        if (!res.error) {
          if (!res.result.companyFlag) {
            var renewinfo = JSON.parse(JSON.stringify(this.currentRenew))
            if (!res.result.payFlag) {
              //获取到当前进行的续费或则充值商品信息
              this.http.post(this.$store.state.prefix + "/pay", { businessId: renewinfo.id, payType: 8, payAmount: renewinfo.points, companyId: this.ids.companyId, remarks: '用户' + this.util.getCookie("ownId") + renewinfo.title }).then(res => {
                if (res.error == false) {
                  this.createAccount.errormsg = ""
                  param.renewId = renewinfo.id
                  delete param.protocol
                  delete param.errormsg
                  this.http.post(this.$store.state.prefix + '/pubInfo/createCompany', param).then(res => {
                    if (res.error == false) {
                      this.createAccount.errormsg = ""
                      this.createAccount.companyName = ""
                      this.createAccount.username = ""
                      this.createAccount.phone = this.$store.state.account.phone || ""
                      this.createAccount.email = this.$store.state.account.email || ""
                      this.createAccount.protocol = []
                      this.createAccount.errormsg = ""
                      this.$Message.success("注册成功")
                      this.showSystem = false
                    } else {
                      this.createAccount.errormsg = res.msg
                    }
                  })
                } else {
                  this.createAccount.errormsg = res.msg
                }
              })
            } else {
              param.renewId = renewinfo.id
              delete param.protocol
              delete param.errormsg
              this.http.post(this.$store.state.prefix + '/pubInfo/createCompany', param).then(res => {
                if (res.error == false) {
                  this.createAccount.errormsg = ""
                  this.createAccount.companyName = ""
                  this.createAccount.username = ""
                  this.createAccount.phone = this.$store.state.account.phone || ""
                  this.createAccount.email = this.$store.state.account.email || ""
                  this.createAccount.protocol = []
                  this.createAccount.errormsg = ""
                  this.$Message.success("注册成功")
                  this.showSystem = false
                } else {
                  this.createAccount.errormsg = res.msg
                }
              })
            }
          }
        }
      })
    },
    renewMarketAccount() {
      var param = JSON.parse(JSON.stringify(this.currentRenew))
      this.http.post(this.$store.state.prefix + "/pay", { businessId: param.id, payType: 8, payAmount: param.price, companyId: this.ids.companyId, remarks: '用户' + this.util.getCookie("ownId") + param.title }).then(res => {
        if (res.error == false) {
          this.$Message.success("续费成功")
          this.showSystem = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  created() {
    if (this.ids.id != void 0) {
      this.showDetail(this.ids.id, 1);
    };

    if (this.ids.companyId != void 0) {
      this.url = '?companyId=' + this.ids.companyId
    }

    this.getGoodsByType(1);
    this.http.get(this.$store.state.prefix + "/shop/getActivities" + this.url).then(res => {
      if (res.error == false) {
        var row = res.result;
        row.forEach(item => {
          var obj = {
            id: item.id,
            img: item.activityImg,
            phoneImg: item.phoneImg,
            title: item.activityName,
            view: item.viewNum,
            share: item.shareNum,
            people: item.joinNum,
            team: item.groupNum,
            state: 0,
          }
          var date = Date.now();
          if (date >= item.startDate && date <= item.endDate)
            obj.state = 1;
          else if (date <= item.startDate)
            obj.state = 0;
          else if (date >= item.endDate)
            obj.state = 2;

          this.active.push(obj)
        })
      }
    })


    this.http.get(this.$store.state.prefix + "/shop/getMemsInfo" + this.url).then(res => {
      if (res.error == false) {
        var row = res.result;
        row.forEach(item => {
          var obj = {
            name: item.realName || item.nickName,
            img: item.headImg,
            surplus: item.points,
            total: item.allPoints,
            people: item.invitedMems
          }
          if (obj.name.length > 2) {
            obj.name = obj.name.substring(0, 1) + "*" + obj.name.substr(obj.name.length - 1, 1)
          } else if (obj.name.length == 2) {
            obj.name = obj.name.substring(0, 1) + "*"
          }
          this.member.push(obj)
        })
        if (this.member.length == 0)
          this.showMember = false;
        else
          this.showMember = true;
      }
    })

    this.http.get(this.$store.state.prefix + "/shop/getCompanyShow" + this.url).then(res => {
      console.log(res.result)
      if (res.error == false) {
        this.showInfo = this.util.escapeToHtml(res.result.show);
        if (this.showInfo == void 0 || this.showInfo == '')
          this.showHtml = false;
        else
          this.showHtml = true;
      }
    })



  },
  data() {
    return {
      currentIndex: 1,
      payMoney: 0,
      payRemarks: "",
      isWithdraw: false,
      showGoods: true,
      showHtml: true,
      showMember: true,
      showSystem: false,//显示系统页面
      serviceprotocol: false,//服务协议modal,
      judgecompany: true,
      currentRenew: {
        company: {
          companyName: '',
          expireDate: ''
        },
        img: "",
        title: 1,
        price: '0积分',
        chargeType: 1,
        renewType: 2,
        month: 1
      },
      createAccount: {
        companyName: '',
        username: '',
        phone: this.$store.state.account.phone || "",
        accountId: this.util.getCookie("ownId"),
        email: this.$store.state.account.email || "",
        companyFlag: 0,
        protocol: [],
        errormsg: ''
      },
      url: '',
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
      },
      currentGoods: {
        saleNum: 0,
        storageNum: 0,
        images: []
      },
      selectGoodsId: 0,
      params: {
        businessId: 0,
        payType: 2,
        payAmount: 0,
        companyId: 0,
        goodsId: 0
      },
      notDetail: true,
      currentPage: 0,
      showInfo: '',
      stateImgArr: [
        "/static/images/company/start.png",
        "/static/images/company/ing.png",
        "/static/images/company/end.png"
      ],
      active: [],
      member: [],
      goods: [],
      titleImgs: [
        {
          on: "/static/images/company/titleOn/1.png",
          off: "/static/images/company/titleOff/1.png",
          static: 1
        },
        {
          on: "/static/images/company/titleOn/2.png",
          off: "/static/images/company/titleOff/2.png",
          static: 0
        },
        {
          on: "/static/images/company/titleOn/3.png",
          off: "/static/images/company/titleOff/3.png",
          static: 0
        },
        {
          on: "/static/images/company/titleOn/4.png",
          off: "/static/images/company/titleOff/4.png",
          static: 0
        }
      ],
      payState: false,
      jifenCategory: [
        {
          txt: "剩余积分",
          state: 1,
          num: 2,
          on: '#ff017e',
          off: '#434343'
        },
        {
          txt: "累计积分",
          state: 0,
          num: 3,
          on: '#ff017e',
          off: '#434343'
        },
        {
          txt: "邀请人数",
          state: 0,
          num: 4,
          on: '#ff017e',
          off: '#434343'
        }
      ],
      category: [
        {
          txt: "现金商品",
          state: 1,
          on: '#ff017e',
          off: '#434343',
          system: false
        },
        {
          txt: "积分商品",
          state: 0,
          on: '#ff017e',
          off: '#434343',
          system: false
        },
        {
          txt: "现金+积分",
          state: 0,
          on: '#ff017e',
          off: '#434343',
          system: false
        },
        {
          txt: "系统商品",
          state: 0,
          on: '#ff017e',
          off: '#434343',
          system: true
        }
      ],
      isloading: false,
      customerpaying: false,
      paySuccess: false
    }
  }
}
</script>
<style  lang='stylus' rel="stylesheet/stylus">
  .ivu-modal-footer
    border-top none 
  rrem(val){
    return (val/108px)rem
  }
  .ivu-modal-body
    padding 0  
    padding-top rrem(132px)
  .modelTitle
     width rrem(436px)
     height rrem(140px)
     position absolute
     left rrem(295px) 
     top rrem(-70px)
     img
      width 100%
  .modelPic
    width rrem(110px)
    height rrem(110px)
    margin 0 auto
    // margin-top rrem(132px)
    img
      width 100%
  .modelSuccess
    height rrem(101px)
    line-height rrem(101px)
    font-size rrem(44px)
    color #ff017e
    font-weight 600
    text-align center
  .modelTishi
    height rrem(94px)
    line-height rrem(94px)
    color #999999
    font-size rrem(28px)
    text-align center 
  .modelBack
    width rrem(920px)
    height rrem(125px)
    line-height rrem(125px)
    background #ff017e
    text-align center  
    color #fff
    font-size rrem(50px)
    font-weight 600
    margin-bottom rrem(29px)
  .companyContent
    position relative
    top rrem(50px)
    width 92.6%
    margin auto
    // margin-bottom rrem(100px)
    // height rrem(1640px)
    .info_isNull
      width rrem(1000px)
      height rrem(1300px)
      background #fff
      text-align center
      img
        width rrem(237px)
        height rrem(196px)
        margin-top rrem(55px)
      p
        margin-top rrem(25px)
        font-size rrem(28px)
    .main_title
      height rrem(88px)
      display flex
      width 100%
      font-size rrem(38px)
      color #434343
      font-weight 600
      div
        flex 1
        height rrem(80px)
        img
          width 100%
          height 100%
    .main_class
      width 100%
      background #fff
      box-shadow 0 2px 20px 0px rgba(0,0,0,.2)
      margin-top rrem(8px)
      height rrem(80px)
      .class_txt
        max-width 68%
        min-width 56%
        margin auto
        display flex
        span
          display block
          height rrem(80px)
          text-align center
          line-height rrem(80px)
          color #000
          flex 1
      .class_goods
        width 100%
        height auto
        display flex
        flex-wrap wrap
        justify-content space-between
        .goods_info
          width rrem(480px)
          height rrem(640px)
          margin-top rrem(40px)
          box-shadow 0 2px 20px 0px rgba(0,0,0,.2)
          position relative
          img
            width 100%
            // height rrem(525px)
            height 100%
          .info_text
            background rgba(0,0,0,.33)
            height rrem(110px)
            width 100%
            position absolute
            left 0
            bottom 0
            span
              width 100%
              display block
              position absolute
              color #eee
            img
              position absolute
              width rrem(90px)
              height rrem(90px)
              right rrem(20px)
              top rrem(20px)
            .text_title
              font-size rrem(35px)
              color #fff
              left rrem(20px)
              top rrem(35px)
            .text_price
              left rrem(20px)
              top rrem(80px)
              color #fff
              font-size rrem(32px)
      .class_pull
        width 100%
        height rrem(120px)
        text-align center
        img
          margin-top rrem(30px)
          height rrem(66px)
          width rrem(222px)


    .main_discount
      width 100%
      .goods_info:first-of-type
        margin-top 0
      .goods_info
        width 100%
        height rrem(440px)
        margin-top rrem(40px)
        position relative
        box-shadow 0 2px 20px 0px rgba(0,0,0,.2)
        .info_state
          position absolute
          width rrem(170px)
          height rrem(170px)
        .info_bg
          height rrem(340px)
          width 100%
        .info_txt
          width 100%
          background #fff
          height rrem(100px)
          display flex
          position relative
          img
            margin-top rrem(25px)
            margin-right rrem(15px)
            width rrem(55px)
            height rrem(55px)
          span
            position absolute
            top rrem(57px)
          .txt_title
            flex 5
            p
              margin-left rrem(30px)
              height 100%
              line-height 300%
              font-size rrem(36px)
              font-weight bold
              color #ff017e
          .txt_people
            flex 1
          .txt_team
            flex 1
        .info_view
          position absolute
          width rrem(310px)
          height rrem(55px)
          background #000
          opacity 0.35
          border-bottom-left-radius 15px
          border-top-left-radius 15px
          right 0px;
          top rrem(30px)
          display flex
          color #fff
          img
            margin-top rrem(10px)
            margin-left rrem(20px)
            width rrem(35px)
            height rrem(35px)
          span
            position absolute
            left rrem(64px)
            top rrem(30px)
          .view_share
            flex 1
            position relative
          .view_num
            flex 1
            position relative

      .discount_pull
        text-align center
        width 100%
        height rrem(120px)
        img
          margin-top rrem(30px)
          width rrem(222px)
          height rrem(66px)

    .main_member
      width 100%
      // margin-top rrem(16px)
      margin-bottom rrem(60px)
      box-shadow 0 2px 20px 0px rgba(0,0,0,.2)
      .member_hr
        height rrem(100px)
        display flex
        background #fff
        justify-content:center
        padding 0 rrem(200px)
        div
          height rrem(100px)
          font-weight bold
          font-size rrem(26px)
          line-height rrem(100px)
          text-align center
        .hr_2
          flex 3
        .hr_3
          flex 3
        .hr_4
          flex 3
      .member_list
        width 100%
        min-height rrem(1640px)
        background:#fff2f2
        .member_content
          display flex
          height rrem(140px)
          &:nth-child(odd)
            background #ffe9eb
          &:nth-child(even)
            background #fff2f2
          div
            text-align center
            height rrem(140px)
            line-height rrem(140px)
            img
              width rrem(50px)
              height rrem(50px)
              position absolute
              top rrem(25px)
              left rrem(90px)
            p
              height 100%
              line-height 700%
          .list_sort
            flex 2
            font-size:rrem(24px);
          .list_name
            flex:2
          .list_img
            flex 2
            position relative
            img
              position absolute
              border-radius 100%
              top rrem(24px)
              left rrem(20px)
              width rrem(95px)
              height rrem(95px)

          .list_jifen
            flex 3
            position relative
            font-size rrem(30px)
          .list_total
            flex 3
            position relative
            font-size rrem(30px)
          .list_people
            flex 3
            position relative
            font-size rrem(30px)

    .main_company
      width 100%
      padding: rrem(40px) 0px
      min-height rrem(1500px)
      margin-bottom rrem(60px)
      background #fff
      text-align center
      display:block
      p
        width 100%
        img
          width:100%
    .main_system
      width:100%
      height rrem(1470px)
      background#fff
      position relative
      .detail_return
        position absolute
        top rrem(35px)
        left rrem(35px)
        width rrem(100px)
        height rrem(100px)
        z-index:2
      .system_content
        width 100%
        overflow-x:hidden
        text-align center
        min-height rrem(1440px)
        height:auto
        position relative
        .renewMarket
          width 100%
          background #fff
          height rrem(1400px)
          position:relative
          img
            width:100%
          .renewMarketcontent
            top rrem(100px)
            width 100%
            margin-top rrem(20px)
            /*background:rgba(0,0,0,0.2)*/
            padding rrem(100px)
            .renewMarketitem
              height rrem(88px)
              line-height rrem(88px)
              font-size rrem(36px)
              text-align left
              padding-left rrem(85px)
              span:nth-of-type(1)
                width rrem(150px)
                display block
                float left
            .btn
              width rrem(315px)
              height rrem(85px)    
              margin 0 auto
              margin-top rrem(82px)
        .createMarket
          padding-top rrem(100px)
          .marketbanner
            width 100%
            height rrem(369px)
            img
              width 100%
          .markettitle
            height rrem(80px)
            line-height rrem(80px)
            font-size rrem(40px)
            font-weight:bolder
          .marketform
            width:90%
            margin:0 auto
            .errorInfo
              text-align:center
              display:block
              padding-left:rrem(80px)
              color:red
              margin-bottom:rrem(80px)
            .help
              font-size:0.9em
            .mention
              width:100%
              border-top:1px solid #ccc
              padding-top rrem(40px)
              margin-top rrem(40px)
              color:rgba(0,0,0,0.6)
              ul
                padding:0px
                li
                  width:100%
                  height rrem(60px)
                  display:block
                  text-align:left
    .main_detail
      width 100%
      // height rrem(970px)
      // background #fff;
      position relative
      .main_detail_buy
        padding-bottom rrem(20px)
        margin-bottom rrem(20px)
        background #fff
        box-shadow 0 2px 20px 0px rgba(0,0,0,.2)
        .detail_bg
          // height rrem(600px)
          width 100%
          .carouselitem
            width:100%
            height rrem(1333px)
            overflow-y:hidden
            border 1px solid #ccc
            img
              width:100%
              height 100%
        .detail_back
          position absolute
          top rrem(35px)
          left rrem(35px)
          width rrem(110px)
          height rrem(110px)
          box-shadow 0 2px 20px 0px rgba(0,0,0,.2)  
          z-index:2
          border-radius 50%
          img
            width 100%
        .detail_text
          width 93%
          margin rrem(40px) auto
          .text_main
            position relative
            .main_title_other
              color #000
              font-weight 400
            span
              font-size rrem(40px)
              color #434343
              height rrem(50px)
              line-height rrem(50px)
              margin-right rrem(30px)
            .main_coll
              width 100%
              height rrem(50px)
              span
                font-size rrem(30px)
                color #aeaeae
          .text_jifen
            border 2px solid #ff007e
            height rrem(80px)
            // margin-top rrem(10px)
            // width rrem(335px)
            border-radius 20px
            display flex
            justify-content center
            align-items center
            position absolute
            right 0
            top 0
            img
              width rrem(55px)
              height rrem(55px)
              margin-right rrem(10px)
            span
              color #ff007e
              font-weight bold
              font-size rrem(36px)
              line-height rrem(72px)
              height rrem(72px)
        .detail_btn
          width rrem(920px)
          height rrem(125px)
          line-height rrem(125px)
          text-align center
          font-weight bold
          color #fff
          margin auto
          margin-top rrem(20px)
          font-size rrem(54px)
          background #ff007e
      .detail_html
        color #fff
        width 100%
        overflow-x:hidden
        text-align center
        // min-height rrem(640px)
        height:auto
        padding rrem(40px)
        position relative
        background #fff
        box-shadow 0 2px 20px 0px rgba(0,0,0,.2)
        .bg
          z-index -1
          width 100%
          position absolute
          top 0px
          height:auto
          min-height rrem(640px)
          opacity 0.5
          background #000
        .txt
          width 100%
          // padding:5px
          text-align:left
          // min-height rrem(640px)
          // padding-left rrem(20px)
          // padding-top rrem(20px)
          background:#fff
          p
            color:#000
            line-height:2em
            img
              width:100%
              margin-top rrem(20px)
      .back_to_top
        width rrem(110px)
        height rrem(110px)
        position fixed
        border-radius 50%
        left 46%
        bottom rrem(45px)     
        box-shadow 0 2px 20px 0px rgba(0,0,0,.2)   
        img 
          width 100%
</style>
