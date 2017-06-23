<template>
  <div class="goodsadd">
    <div class="content-title">
      <div class="titlename">
        <span>新增商品</span>
      </div>
      <div class="titellink">
      <router-link to="/goods" class="innerbtnlink">商品列表</router-link>
      </div>
  </div>
  <div class="">
    <Form ref="formValidate" :model="Goods" class="goodseditform" :rules="GoodsRule" :label-width="100">
       <Form-item label="商品名称" prop="goodsName">
            <Input v-model="Goods.goodsName" placeholder="请输入"></Input>
       </Form-item>
       <Form-item label="商品图片" class="text-left">
           <uploader :config="uploaderconfig"> </uploader>
           <input type="hidden" v-model="Goods.goodsImg">
       </Form-item>
       <Form-item label="图片预览">
         <a :href="murl + gg" target="_blank" v-if="Goods.goodsImg" v-for="gg in Goods.goodsImg.split(',')">
           <img :src="murl+gg" alt="" class="goodsimgthumb" style="width:250px;height:250px;">
         </a>
      </Form-item>
      <Form-item label="商品类型" prop="goodsType">
        <Select v-model="Goods.goodsType" style="width:100%" @on-change="setGoodsType">
          <Option value="1">现金</Option>
          <Option value="2">积分</Option>
          <Option value="3">现金加积分</Option>
        </Select>
      </Form-item>
      <Form-item label="商品价格" prop="goodsPrice" v-if="showPrice">
        <Input type="text" v-model="Goods.goodsPrice" number ></Input>
      </Form-item>
      <Form-item label="最大兑换积分" prop="maxPoints" v-if="showPoint">
        <Input type="text" v-model="Goods.maxPoints" number ></Input>
      </Form-item>
       
       <Form-item label="库存"  prop="storageNum">
            <Input type="text" v-model="Goods.storageNum" number></Input>
       </Form-item>
       <Form-item label="状态" class="text-left"  prop="goodsStatus">
             <Select v-model="Goods.goodsStatus" style="width:200px">
              <Option value="1">上架</Option>
              <Option value="2">下架</Option>
          </Select>
       </Form-item>
       <Form-item label="排序">
            <Input type="text" v-model="Goods.sort" number></Input>
       </Form-item>
       <Form-item label="商品介绍">
            <!-- <Input type="textarea" v-model="Goods.goodsDesc" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input> -->
          <div class="addcontent ueditor-wrapper">
            <ueditor :value="defaultMSg" :config="Ueditorconfig" @input="Ueditorinput" v-on:ready="Ueditorready"></ueditor>
        </div>
       </Form-item>
       <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" style="margin-left: 8px" @click="handleReset('formValidate')">取消</Button>
        </Form-item>
    </Form>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import uploader from '../Util/Uploader'
import ueditor from '../Ueditor'
export default {
  name: 'GoodsAdd',
  data () {
    return {
      showPrice:false,
      showPoint:false,
      Goods: {
        goodsName: '',
        goodsImg: '',
        goodsPrice: '',
        maxPoints: '',
        sort: 0,
        storageNum: '',
        goodsStatus: 1,
        goodsType: 1,
        goodsDesc: '',
        goodsDate: (new Date().getTime())
      },
      GoodsRule: {
        goodsName: [
          {required: true, message: '商品名称不能为空', trigger: 'blur'}
        ],
        goodsPrice: [
          {type: 'number', min: 0.01, message: '价格只能大于0', trigger: 'blur'}
        ],
        maxPoints: [
          {type: 'number', min: 0, message: '最大兑换积分只能大于0', trigger: 'blur'}
        ],
        storageNum: [
          {type: 'integer', min: 0, message: '库存量只能为正整数', trigger: 'blur'}
        ]
      },
      uploaderconfig: {
        maxSize: 51200,
        format: ['jpg', 'png', 'jpeg'],
        showUploadList: false,
        parent: 'Goods',
        child: 'goodsImg',
        multiple:true
      },
      defaultMSg: '',
      Ueditorconfig: {
        initialFrameWidth: null,
        initialFrameHeight: 320,
        info: {},
        imageUrl: 'http://up.qiniu.com/',
        imageActionName: 'uploadimage',
        imageFieldName: 'file',
        imageMaxSize: 2048000,
        imageAllowFiles: ['.jpg', '.png', '.jpeg'],
        imageCompressEnable: true,
        imageCompressBorder: 1600,
        imageInsertAlign: 'none',
        imageUrlPrefix: 'http://oolds3geo.bkt.clouddn.com/',
        imagePathFormat: 'upload/image/{yyyy}{mm}{dd}/{time}{rand:6}'
      }
    }
  },
  components: { uploader , ueditor },
  methods: {
    setGoodsType(val){
      this.showPrice = false;
      this.showPoint = false;
      switch(~~val){
        case 1:this.showPrice = true;break;
        case 2:this.showPoint = true;break;
        case 3:this.showPoint = true;this.showPrice=true;break;
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.Goods.id === '') {
            delete this.Goods.id
          }
          this.http.post('/api/goods', this.Goods).then(res => {
            if (res.error === false) {
              this.$Message.success('保存成功')
              this.router.push('/goods')
            }
          })
        } else {
          this.$Message.error('验证失败')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    Ueditorready (editor) {},
    Ueditorinput (obj) {
      console.log(obj)
      this.Goods.goodsDesc = obj.content
      this.Ueditorconfig.info = obj
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.goodseditform
  width:60%
  margin-top:30px
.goodsimgthumb
  width:100%
  height:auto
.ueditor-wrapper
  width:166%
</style>
