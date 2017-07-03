<template>
<div class="musiccenter" ref="musiccenter">
  <Table border :columns="musiclistColumns" :data="musiclistData" class="musiclistable" @on-selection-change="selectMusic" @on-select-all="selectAllMusic"></Table>
  <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
          <Page :total="musicpager.total" :current="musicpager.current" @on-change="changePage"></Page>
      </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Music',
  props: [ 'callback' ],
  data () {
    return {
      musiclistColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '音乐名称',
          key: 'name'
        },
        {
          title: '试听',
          key: 'url',
          render (row) {
            return '<a :href="murl+row.url" target="_blank" v-text="row.url"></a>'
          }
        },
        {
          title: '创建时间',
          key: 'createDate'
        }
      ],
      musiclistData: [],
      musicpager: {
        total: 1,
        current: 1
      }
    }
  },
  mounted () {
  },
  created () {
    this.getMusicList(1)
  },
  methods: {
    getMusicList (pageNo) {
      this.http.get(this.$store.state.prefix + '/music/page/' + (pageNo || 1)).then(res => {
        if (res.error === false) {
          this.musicpager = res.result
          this.musiclistData = res.result.records
        }
      })
    },
    changePage () {
      this.getMusicList(this.musicpager.current)
    },
    selectMusic (selection) {
      if (selection) {
        const config = this.callback.split('.')
        var _this = this
        for (var i = 0; i < 100; i++) {
          if (_this[config[0]] === undefined) {
            _this = _this.$parent
          } else {
            _this[config[0]][this.config[1]] = selection.url
            break
          }
        }
      }
    },
    selectAllMusic (selection) {
      return selection
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
</style>
