<template>
<div class="uploader" ref="uploader" id="qiniu-container">
  
   <Upload action="http://up.qiniu.com/" encyte="multipart/form-data" ref="upload"
        :show-upload-list="config.showUploadList"
        :format="config.format"
        :max-size="config.maxSize"
        :data="{token: $store.state.qiniutoken}"
        :on-success="uploadSuccess"
        :on-progress="uploadProgress"
        :before-upload="uploadBefore"
        :on-error="uploadError"
        :on-exceeded-size="uploaderSize"
        >
        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
     <Progress v-if="item.showProgress" :percent="item.percentage"></Progress>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Uploader',
  props: [ 'config' ],
  data () {
    return {
      item: {
        showProgress: false,
        percentage: 0
      }
    }
  },
  mounted () {
  },
  created () {
    this.http.get('/api/pubInfo/qiniu').then(res => {
      if (res.error === false) {
        this.$store.state.qiniutoken = res.result.token
        this.util.setCookie('qiniutoken', res.result.token)
      }
    })
  },
  methods: {
    uploadBefore (file) {
      this.item.showProgress = true
    },
    uploadSuccess (res, file) {
      this.item.showProgress = false
      if (this.config.parent !== undefined && this.config.child !== undefined) {
        var _this = this
        for (var i = 0; i < 100; i++) {
          console.log(_this)
          if (_this[this.config.parent] === undefined) {
            _this = _this.$parent
          } else {
            _this[this.config.parent][this.config.child] = res.key
            break
          }
        }
      } else if (this.config.parent) {
        this.$parent[this.config.parent] = res.key
      }
    },
    uploadError (error, res, file) {
      this.item.showProgress = false
      console.log(error)
      this.$Notice.error('文件上传失败')
    },
    uploadProgress (event, file, fileList) {
      this.item.percentage = parseInt(event.percent)
    },
    uploaderSize (file, fileList) {
      this.$Notice.error('文件超出规定大小')
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
</style>
