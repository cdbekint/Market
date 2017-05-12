<template>
	<div class="musicadd">
		<div class="content-title">
      <div class="titlename">
      	<span>修改音乐</span>
      </div>
      <div class="titellink">
      <router-link to="/music" class="innerbtnlink">音乐库</router-link>
        <router-link to="/music/add" class="innerbtnlink">新增音乐</router-link>
      </div>
 	</div>
  <div class="content">
    <Form ref="formValidate" :model="music" class="musiceditform" :rules="musicRule" :label-width="100">
       <Form-item label="音乐名称" prop="goodsName">
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
  name: 'MusicAdd',
  data () {
    return {
      music: {
        id: '',
        name: '',
        url: ''
      },
      musicRule: {
        name: [
          {required: true, message: '音乐名称必须', trigger: 'blur'}
        ],
        url: [
          {required: 'true', message: '音乐地址'}
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
  created () {
    this.getMusicById();
  },
  components: { uploader },
  methods: {
    getMusicById () {
      var query = this.util.getQuery(location.hash);
      this.http.get('/api/music/' + query.id).then(res => {
        if (res.error === false) {
          this.music = res.result;
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.music.id === '') {
            delete this.music.id
          }
          this.http.put('/api/music', this.music).then(res => {
            if (res.error === false) {
              this.$Message.success('保存成功')
              this.router.push('/music')
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
.musiceditform
  width:60%
  margin-top:30px
  .musicpanel
    height:30px
.musicimgthumb
  width:100%
  height:auto

</style>
