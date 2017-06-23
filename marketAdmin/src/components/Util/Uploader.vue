<template>
<div class="uploader" ref="uploader" id="qiniu-container">

   <Upload action="http://up.qiniu.com/" encyte="multipart/form-data" ref="upload"
        :show-upload-list="config.showUploadList"
        :format="config.format"
        :max-size="config.maxSize"
        :multiple="config.multiple"
        :data="{token: $store.state.qiniutoken}"
        :on-success="uploadSuccess"
        :on-progress="uploadProgress"
        :before-upload="uploadBefore"
        :on-error="uploadError"
        :on-exceeded-size="uploaderSize"
        >
        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        <p>文件格式:{{config.format.join(",")}};文件大小限制:{{parseInt(config.maxSize/1024)}}M</p>
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
      var fileNameArr = file.name.split('.');
      var fileFix = fileNameArr[fileNameArr.length-1];
      if(this.config.format){
        var success = false;
        for(var item of this.config.format){
          if(item == fileFix)
            success = true
        }

        if(!success){
          this.$Notice.error({
            title:'文件格式错误',
            desc:"请上传正确的文件格式."
          })
        }
      }

      this.item.showProgress = true
    },
    uploadSuccess (res, file) {
      this.item.showProgress = false
      if (this.config.parent !== undefined && this.config.child !== undefined) {
        var _this = this
        for (var i = 0; i < 100; i++) {
          if (_this[this.config.parent] === undefined) {
            _this = _this.$parent
          } else {
            if (this.config.multiple === true) {
              if (_this[this.config.parent][this.config.child]) {
                _this[this.config.parent][this.config.child] +=","
              }
              _this[this.config.parent][this.config.child] += res.key
            } else {
              _this[this.config.parent][this.config.child] = res.key
            }
            
            break
          }
        }
      } else if (this.config.parent) {
        if (this.config.multiple === true) {
          if (this.$parent[this.config.parent]) {
            this.$parent[this.config.parent] +=","
          }
          this.$parent[this.config.parent] += res.key
        } else {
          this.$parent[this.config.parent] = res.key
        }
        
      }
    },
    uploadError (error, res, file) {
      this.item.showProgress = false
      this.$Notice.error({
        title:'文件上传失败',
        desc:error
      })
    },
    uploadProgress (event, file, fileList) {
      this.item.percentage = parseInt(event.percent)
    },
    uploaderSize (file, fileList) {
      this.$Notice.error({
        title:'文件大小错误',
        desc:"文件超出规定大小."
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
</style>
