<template>
	<div class='preview' ref="preview">
		<div class="title">
			<h2>{{activityInfo.activityName || '白起网络'}}</h2>
		</div>
		<div class="activtyTop">
			<img :src='murl+activityInfo.activityImg' v-if="activityInfo.activityImg">
			<img src='/static/images/preview/top.jpg' v-else>
			<div class="activtyTopBg">
				<img src='/static/images/preview/music.png'>
			</div>
		</div>
		<div class='discount'>
			<img src='/static/images/preview/discount.png'>
		</div>
		<div class="activty">
			<div class='activties' v-for="(item,index) in activty">
				<div class="activtyTitle">
					<div class="activtyInfoNum">
						0{{index+1}}
					</div>
					<div class="activtyName">
						<div class="activtyNameTop">
							PARTNER
						</div>
						<div class="activtyNameBot">
							{{item.title}}
						</div>
					</div>
				</div>
				<div class="activtyInfo">
					<img :src='item.activtyInfo' v-if="item.activtyInfo && !item.content">
					<div v-if='item.content' v-html="item.content"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['activity', 'anchor'],
	data() {
		return {
			activty: [
				{
					title: '已参与伙伴',
					titleImg: require('../../../static/images/preview/title.png'),
					activtyInfo: require('../../../static/images/preview/1.png')
				},
				{
					title: '赠送礼品',
					titleImg: require('../../../static/images/preview/title.png'),
					activtyInfo: require('../../../static/images/preview/2.png')
				},
				{
					title: '已入团伙伴',
					titleImg: require('../../../static/images/preview/title.png'),
					activtyInfo: require('../../../static/images/preview/3.png')
				},
				{
					title: '优惠方案',
					titleImg: require('../../../static/images/preview/title.png'),
					activtyInfo: require('../../../static/images/preview/4.png'),
					content: ''
				},
				{
					title: '积分返还榜',
					titleImg: require('../../../static/images/preview/title.png'),
					activtyInfo: require('../../../static/images/preview/5.png')
				}
			],
			activityInfo: {}
		}
	},
	watch: {
		activity: {
			handler(val, oldVal) {
				this.activityInfo = val
				this.activty[3].content = this.activityInfo.content
				if (this.activityInfo.shareGift == 0) {
					this.activty.splice(1, 1)
				} else if (this.activityInfo.shareGift == 1) {
					this.activty.splice(1, 0, {
						title: '赠送礼品',
						titleImg: require('../../../static/images/preview/title.png'),
						activtyInfo: require('../../../static/images/preview/2.png')
					})
					if (this.activty.length >= 6) {
						this.activty.splice(2, 1)
					}
				}
			},
			deep: true
		},
		anchor: {
			handler(val) {
				if (val == 'name') {
					this.$refs.preview.scrollTop = 0
				} else if (val == 'uploader') {	
					this.$refs.preview.scrollTop = 70
				}
			},
			deep: true
		}
	}
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
	.title	
		width 100%
		color #fff
		height 67px
		line-height 90px
		text-align center
		background url('../../../static/images/preview/top.png') no-repeat center top 
		background-size 100% 100%
		font-size 18px
		position relative
		.titleTop
			position absolute
			left 0
			top -70px
			width 381px
			height 70px
			background blue
			cursor pointer
			.close
				width 50px
				height 50px
				background red
				position absolute
				right 0
				top 0
				z-index 4000
	.activtyTop
		width 100%
		position relative
		img 
			width 100%
		.activtyTopBg
			width 100%
			position absolute
			left 0 
			top 0
	.discount
		width 100%
		height 384px
		img
			width 100%	
	.activty
		width 100%
		background url('../../../static/images/preview/bg.png') center top	
		.activtyTitle
			width	190px
			height 76px
			margin 0 auto			
			background url('../../../static/images/preview/title.png') no-repeat center top
			background-size 100%
			.activtyInfoNum
				color #fff
				font-weight 700
				font-size 35px
				margin-left 31px
				margin-top 15px
				float left
			.activtyName
				float left
				margin-top 27px
				color #fff
				.activtyNameTop
					font-size 13px
					line-height 9px
				.activtyNameBot
					font-size 17px	
</style>


