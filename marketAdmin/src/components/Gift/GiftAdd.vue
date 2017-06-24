<template>
	<div class="giftadd">
		<div class="content-title">
      <div class="titlename">
      	<span>新增礼品</span>
      </div>
      <div class="titellink">
      <router-link to="/gift" class="innerbtnlink">礼品列表</router-link>
      </div>
 	</div>
  <div class="content">
    <Form ref="GiftRule" :model="Gift" class="gifteditform" :rules="GiftRule" :label-width="100">
       <Form-item label="礼品名称" prop="giftName">
            <Input v-model="Gift.giftName" placeholder="请输入"></Input>
       </Form-item>
       <Form-item label="礼品图片" class="text-left">
           <uploader :config="uploaderconfig"> </uploader>
           <input type="hidden" v-model="Gift.giftImg">
       </Form-item>
       <Form-item label="图片预览">
         <a :href="murl + Gift.giftImg" target="_blank" v-if="Gift.giftImg">
           <img :src="murl+Gift.giftImg" alt="" class="giftimgthumb" style="width:200px;height:200px;">
         </a>
      </Form-item>
       <Form-item label="礼品介绍">
            <Input type="textarea" v-model="Gift.giftDesc" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
       </Form-item>
       <Form-item>
            <Button type="primary" @click="handleSubmit('GiftRule')">提交</Button>
            <Button type="ghost" style="margin-left: 8px" @click="handleReset('GiftRule')">重置</Button>
        </Form-item>
    </Form>
  </div>
	</div>
</template>

<script type="text/ecmascript-6">
import uploader from '../Util/Uploader'
export default {
  name: 'GiftAdd',
  data () {
    return {
      Gift: {
        id: '',
        giftName: '',
        giftImg: '',
        giftDesc: ''
      },
      GiftRule: {
        giftName: [
          {required: true, message: '礼物名称不能为空', trigger: 'blur'}
        ],
        giftImg: [
          {required: 'true', message: '图片必须上传'}
        ]
      },
      uploaderconfig: {
        maxSize: 5120,
        format: ['jpg', 'png', 'jpeg'],
        showUploadList: false,
        parent: 'Gift',
        child: 'giftImg'
      }
    }
  },
  components: { uploader },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.Gift.id === '') {
            delete this.Gift.id
          }
          this.http.post(this.$store.state.prefix + '/gift', this.Gift).then(res => {
            if (res.error === false) {
              this.$Message.success('保存成功')
              this.router.push('/gift')
            }
          })
        } else {
          this.$Message.error('验证失败')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.gifteditform
  width:60%
  margin-top:30px
.giftimgthumb
  width:100%
  height:auto
</style>
