<template>
	<div class="ratingsWrap" ref="ratings">
		<div class="ratings">
			<div class="overView">
				<div class="overViewLeft">
					<h1 class="score">{{seller.score}}</h1>
					<p class="title">综合评分</p>
					<p class="rankRate">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="overViewRight">
					<div class="scoreWrap">
						<span class="title">服务态度</span><stars :score="seller.serviceScore" :size="36"></stars><span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="scoreWrap">
						<span class="title">商品评价</span><stars :score="seller.foodScore" :size="36"></stars><span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delInfoWrap">
						<span class="title">送达时间</span><span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="ratingSelectWrap">
				<ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" v-on:selectTypeChange="selectTypeChange" v-on:contentToggle="contentToggle"></ratingselect>
			</div>
			<div class="ratingDetail">
				<ul v-if="ratings.length">
					<li class="ratingItem" v-for="item in ratings" v-show="ratingShow(item.rateType,item.text)">
						<div class="avatar"><img :src="item.avatar" width="28" height="28"></div>
						<div class="detail">
							<p class="userName">{{item.username}}</p>
							<p class="rateTime">{{item.rateTime | formateDate}}</p>
							<p class="score">
								<stars :score="item.score" :size="24"></stars><span class="deliveryTime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
							</p>
							<p class="text">{{item.text}}</p>
							<p class="others">
								<span class="rateType" :class="{'icon-thumb_up':item.rateType==0,'icon-thumb_down':item.rateType>0}"></span><span class="recommend" v-for="rmdItem in item.recommend">{{rmdItem}}</span>
							</p>
						</div>
					</li>
				</ul>
				<div class="noRatings" v-else>
					本商店暂无评论~
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const ERR_OK = 0;
	const ALL = 2;
	const POSITIVE = 0;
	const NEGATIVE = 1;
	import stars from '../../components/stars/stars.vue';
	import ratingselect from '../../components/ratingselect/ratingselect.vue';
	import {formatDate} from '../../common/js/formatDate.js';
	import btScroll from 'better-scroll';
	export default {
		props: {
			seller: {
				type: Object,
				default: {}
			}
		},
		data: function(){
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: false,
				desc: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			}
		},
		components: {
			stars: stars,
			ratingselect: ratingselect
		},
		created: function(){
			this.$http.get('/api/ratings').then(function(response){
				response = response.body;
				if (response.errno === ERR_OK) {
					this.ratings = response.data;
					// console.log(this.$refs.ratings);
					this.$nextTick(function(){
						this.scroll = new btScroll(this.$refs.ratings,{
							click: true
						});
					});
				}
			});
		},
		filters: {
			formateDate: function(time){
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		methods: {
			selectTypeChange: function(type){
				this.selectType = type;
				this.$nextTick(function(){
					this.scroll.refresh();
				});
			},
			contentToggle: function(){
				this.onlyContent = !this.onlyContent;
				this.$nextTick(function(){
					this.scroll.refresh();
				});
			},
			ratingShow: function(type,text){
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				}else if (this.selectType === type) {
					return true;
				}else{
					return false;
				}
			}
		}
	}
</script>

<style>
	.ratingsWrap{
		position: absolute;
		top: 177px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		background-color: #f3f5f7;
	}
	.ratings .overView{
		display: flex;
		padding: 18px 0;
		background-color: #fff;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.ratings .overViewLeft{
		flex: 0 0 137px;
		position: relative;
		width: 137px;
		text-align: center;		
	}
	@media only screen and (max-width: 320px){
		.ratings .overViewLeft{
			flex: 0 0 120px;
			width: 120px;
		}
	}
	.ratings .overViewLeft::after{
		content: '';
		display: block;
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 1px;
		background-color: rgba(7,17,27,0.1);
		transform: scaleX(0.5);
		-webkit-transform: scaleX(0.5);
	}
	.ratings .overViewRight{
		flex: 1;
		padding-left: 24px;
	}
	@media only screen and (max-width: 320px) {
		.ratings .overViewRight{
			padding-left: 6px;
		}
	}
	.ratings .overViewLeft .score{
		margin-bottom: 6px;
		line-height: 28px;
		font-size: 24px;
		color: rgb(255,153,0);
	}
	.ratings .overViewLeft .title{
		margin-bottom: 8px;
		line-height: 12px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	.ratings .overViewLeft .rankRate{
		margin-bottom: 6px;
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.ratings .overViewRight .scoreWrap{
		margin-bottom: 8px;
	}
	.ratings .overViewRight .title{
		margin-right: 12px;
		line-height: 18px;
		font-size: 12px;
		color: rgb(7,17,27);
		vertical-align: top;
	}
	.ratings .overViewRight .stars{
		display: inline-block;
		vertical-align: middle;
	}
	.ratings .overViewRight .score{
		margin-left: 12px;
		line-height: 18px;
		font-size: 12px;
		color: rgb(255,153,0);
	}
	.ratings .overViewRight .deliveryTime{
		line-height: 18px;
		font-size: 12px;
		color: rgb(147,153,159);
	}
	.ratings .ratingSelectWrap{
		margin-top: 18px;
		padding-top: 18px;
		background-color: #fff;
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.ratings .ratingDetail{
		background-color: #fff;
	}
	.ratings .ratingDetail .noRatings{
		height: 100px;
		text-align: center;
		line-height: 100px;
		font-size: 12px;
		color: rgb(147,153,159);
	}
	.ratings .ratingDetail ul{
		padding: 0 18px;
	}
	.ratings .ratingDetail .ratingItem{
		position: relative;
		display: flex;
		padding: 18px 0;
	}
	.ratings .ratingDetail .ratingItem::after{
		content: '';
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1px;
		width: 100%;
		background-color: rgba(7,17,27,0.1);
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	.ratings .ratingDetail .avatar{
		flex: 0 0 28px;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		overflow: hidden;
	}
	.ratings .ratingDetail .detail{
		position: relative;
		flex: 1;
		margin-left: 12px;
	}
	.ratings .ratingDetail .userName{
		margin-bottom: 4px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(7,17,27);
	}
	.ratings .ratingDetail .rateTime{
		position: absolute;
		right: 0;
		top: 0;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.ratings .ratingDetail .score{
		margin-bottom: 6px;
	}
	.ratings .ratingDetail .stars{
		display: inline-block;
	}
	.ratings .ratingDetail .deliveryTime{
		margin-left: 6px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.ratings .ratingDetail .text{
		margin-bottom: 8px;
		line-height: 18px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	.ratings .ratingDetail .rateType{
		line-height: 16px;
		font-size: 12px;
		vertical-align: middle;
	}
	.ratings .ratingDetail .icon-thumb_up{
		color: rgb(0,160,220);
	}
	.ratings .ratingDetail .icon-thumb_down{
		color: rgb(183,187,191);
	}
	.ratings .ratingDetail .recommend{
		margin-left: 8px;
		padding: 0 6px;
		display: inline-block;
		line-height: 16px;
		font-size: 9px;
		color: rgb(147,153,159);
		background-color: #fff;
		border: 1px solid rgba(7,17,27,0.1);
		border-radius: 2px;
		vertical-align: middle;
	}
</style>