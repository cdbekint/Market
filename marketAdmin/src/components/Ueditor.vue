<template>
  <div ref="editor"></div>
</template>

<script  type="text/ecmascript-6">
/* eslint-disable */
import UEditorConfig from '../../static/js/ueditor/ueditor.config'
import UEditor from '../../static/js/ueditor/ueditor.all'
import '../../static/js/ueditor/lang/zh-cn/zh-cn'
import '../../static/js/ueditor/third-party/jquery-1.10.2.min'

export default {
  name: 'UEditor',
  data () {
    return { id: 'ueditorId'}
  },
  props: {
    value: {
      type: String,
      default: null
    },
    config: {
      type: Object,
      default: {}
    }
  },
  watch: {
    value: function value (val, oldVal) {
      this.editor = UE.getEditor(this.id, this.config)
      if (val !== null) {
        this.editor.setContent(val)
      }
    }
  },
  mounted () {
	  this.$nextTick(function f1() {
	    this.$refs.editor.id = this.id;
      this.editor = UE.getEditor(this.id, this.config)
      this.editor.ready(function f2() {
        this.editor.setContent(this.value)
        this.editor.addListener("contentChange", function () {
          const wordCount = this.editor.getContentLength(true);
          const content = this.editor.getContent();
          const plainTxt = this.editor.getPlainTxt();
          this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt });
        }.bind(this))
        this.$emit('ready', this.editor)
      }.bind(this))
    })
  },
  beforeDestroy () {
    const vm = this;
    try {
      vm.editor.destroy();
      vm.editor = null
    } catch (e) {
      vm.editor = null
    }
  }
}
</script>

<style  scoped lang='stylus' rel="stylesheet/stylus">
@import '../../static/js/ueditor/themes/default/css/ueditor.css'
@import '../../static/js/ueditor/themes/iframe.css'
</style>
