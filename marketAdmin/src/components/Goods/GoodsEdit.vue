<template>
  <div class="goodsadd">
    <div class="content-title">
      <div class="titlename">
        <span>修改商品</span>
      </div>
      <div class="titellink">
      <router-link to="/goods" class="innerbtnlink">商品列表</router-link>
        <router-link to="/goods/add" class="innerbtnlink">添加商品</router-link>
      </div>
  </div>
  <div class="content">
    <Form ref="formValidate" :model="goods" class="goodsEditForm" :rules="GoodsRule" :label-width="100">
       <Form-item label="商品名称" prop="goodsName">
            <Input v-model="goods.goodsName" placeholder="请输入"></Input>
       </Form-item>
       <Form-item label="商品图片" class="text-left">
           <uploader :config="uploaderConfig"> </uploader>
           <input type="hidden" v-model="goods.goodsImg">
       </Form-item>
       <Form-item label="图片预览">
         <a :href="murl + goods.goodsImg" target="_blank" v-if="goods.goodsImg">
           <img :src="murl+goods.goodsImg" alt="" class="goodsImgThumb">
         </a>
      </Form-item>
       <Form-item label="商品介绍">
            <Input type="textarea" v-model="goods.goodsDesc" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
       </Form-item>
       <Form-item label="商品价格" prop="goodsPrice">
            <Input type="text" v-model="goods.goodsPrice" number></Input>
       </Form-item>
       <Form-item label="最大兑换积分" prop="maxPoints">
            <Input type="text" v-model="goods.maxPoints" number></Input>
       </Form-item>
       <Form-item label="库存"  prop="storageNum">
            <Input type="text" v-model="goods.storageNum" number></Input>
       </Form-item>
       <Form-item label="状态" class="text-left"  prop="goodsStatus">
             <Select v-model="goods.goodsStatus" style="width:200px">
              <Option value="1">上架</Option>
              <Option value="2">下架</Option>
          </Select>
       </Form-item>
       <Form-item label="排序">
            <Input type="text" v-model="goods.sort" number></Input>
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
export default {
  name: 'GoodsEdit',
  data () {
    return {
      goods: {
        id: '',
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
      uploaderConfig: {
        maxSize: 5120,
        format: ['jpg', 'png', 'jpeg'],
        showUploadList: false,
        parent: 'goods',
        child: 'goodsImg'
      }
    }
  },
  created () {
    this.getGoodsById()
  },
  components: { uploader },
  methods: {
    getGoodsById () {
      var query = this.util.getQuery(location.hash);
      this.http.get('/api/goods/' + query.id).then(res => {
        if (res.error === false) {
          this.goods = res.result;
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.goods.id === '') {
            delete this.goods.id
          }
          this.http.put('/api/goods', this.goods).then(res => {
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

<style scoped lang='stylus' rel="stylesheet/stylus">
.goodsEditForm
  width:60%
  margin-top:30px
.goodsImgThumb
  width:100%
  height:auto
</style>
