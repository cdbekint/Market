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
  <div class="content">
    <Form ref="formValidate" :model="Goods" class="goodseditform" :rules="GoodsRule" :label-width="100">
       <Form-item label="商品名称" prop="goodsName">
            <Input v-model="Goods.goodsName" placeholder="请输入"></Input>
       </Form-item>
       <Form-item label="商品图片" class="text-left">
           <uploader :config="uploaderconfig"> </uploader>
           <input type="hidden" v-model="Goods.goodsImg">
       </Form-item>
       <Form-item label="图片预览">
         <a :href="murl + Goods.goodsImg" target="_blank" v-if="Goods.goodsImg">
           <img :src="murl+Goods.goodsImg" alt="" class="goodsimgthumb">
         </a>
      </Form-item>
       <Form-item label="商品介绍">
            <Input type="textarea" v-model="Goods.goodsDesc" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
       </Form-item>
       <Form-item label="商品价格" prop="goodsPrice">
            <Input type="text" v-model="Goods.goodsPrice" number></Input>
       </Form-item>
       <Form-item label="最大兑换积分" prop="maxPoints">
            <Input type="text" v-model="Goods.maxPoints" number></Input>
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
  name: 'GoodsAdd',
  data () {
    return {
      Goods: {
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
      uploaderconfig: {
        maxSize: 5120,
        format: ['jpg', 'png', 'jpeg'],
        showUploadList: false,
        parent: 'Goods',
        child: 'goodsImg'
      }
    }
  },
  components: { uploader },
  methods: {
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
</style>
