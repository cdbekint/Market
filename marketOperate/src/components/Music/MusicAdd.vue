<template>
  <div class="musicadd">
    <div class="content-title">
      <div class="titlename">
        <span>新增音乐</span>
      </div>
      <div class="titellink">
        <router-link to="/music" class="innerbtnlink">音乐库</router-link>
      </div>
    </div>
    <div class="content">
      <Form ref="musicRule" :model="music" class="musiceditform" :rules="musicRule" :label-width="100">
        <Form-item label="音乐名称" prop="name">
          <Input v-model="music.name" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="上传音乐" class="text-left">
          <uploader :config="uploaderconfig"> </uploader>
          <input type="hidden" v-model="music.url">
        </Form-item>
        <Form-item label="音乐预览">
          <audio :src="murl+music.url" v-if="music.url" class="musicpanel" autoplay="true" controls="true" />
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit('musicRule')">提交</Button>
          <Button type="ghost" style="margin-left: 8px" @click="handleReset('musicRule')">取消</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import uploader from '../Util/Uploader'
  export default {
    name: 'MusicAdd',
    data () {
      return {
        music: {
          name: '',
          url: ''
        },
        musicRule: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '音乐地址'}
          ]
        },
        uploaderconfig: {
          maxSize: 5120,
          format: ['mp3', 'ogg'],
          showUploadList: false,
          parent: 'music',
          child: 'url'
        }
      }
    },
    components: { uploader },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.http.post(this.$store.state.prefix + '/music', this.music).then(res => {
              if (res.error === false) {
                this.$Message.success('保存成功')
                this.router.push('/music')
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
  .musiceditform
    width:60%
    margin-top:30px
    .musicpanel
      height:30px
  .musicimgthumb
    width:100%
    height:auto

</style>
