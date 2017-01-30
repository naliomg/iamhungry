<template>
	<div class="seller" ref="seller">
		<div class="sellerContent">
			<div class="overView">
				<div class="brefInfo">
					<h1 class="sellerName">{{seller.name}}</h1>
					<stars :score="seller.score" :size="36"></stars>
					<span class="ratingCount">({{seller.ratingCount}})</span>
					<span class="sellCount">月售{{seller.sellCount}}单</span>
				</div>
				<div class="delivInfo">
					<div class="delivItem">
						<span class="delivInfoText">起送价</span>
						<p class="delivInfoCon"><span class="detailNum">{{seller.minPrice}}</span>元</p>
					</div>
					<div class="delivItem">
						<span class="delivInfoText">商家配送</span>
						<p class="delivInfoCon"><span class="detailNum">{{seller.deliveryPrice}}</span>元</p>
					</div>
					<div class="delivItem">
						<span class="delivInfoText">平均配送时间</span>
						<p class="delivInfoCon"><span class="detailNum">{{seller.deliveryTime}}</span>分钟</p>
					</div>
				</div>
				<div class="collect" @click="toggleFavorite">
					<div class="icon-favorite" :class="{active: favorite}"></div>
					<span class="weishoucang" v-if="!favorite">收藏</span>
					<span class="yishoucang" v-else="favorite">已收藏</span>
				</div>
			</div>
			<div class="bAndS">
				<h1 class="title">公告与活动</h1>
				<p class="bulletin">{{seller.bulletin}}</p>
				<ul class="supports">
					<li class="supportsItem" v-for="item in seller.supports">
						<span class="brand" :class="supportsType[item.type]"></span><span class="supportDetail">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="picWrap" ref="picWrap">
					<ul class="clearF" ref="picsList">
						<li class="picItem" v-for="item in seller.pics">
							<img :src="item" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<div class="infos">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="infosItem" v-for="item in seller.infos">{{item}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	const ERR_OK = 0;
	import btScroll from 'better-scroll';
	import stars from '../../components/stars/stars.vue';
	import {saveLocal,loadLocal} from '../../common/js/localstorage.js';
	export default {
		props: {
			seller: {
				type: Object,
				default: {}
			}
		},
		data: function(){
			return {
				supportsType: ['decrease','discount','special','invoice','guarantee'],
				favorite: loadLocal(this.seller.id,'favorite',false)
			}
		},
		components: {
			stars: stars
		},
		methods: {
			_initScroll: function(){
				this.$nextTick(function(){
					if (!this.scroll) {
						this.scroll = new btScroll(this.$refs.seller,{
							click: true
						});
					}else{
						this.scroll.refresh();
					}					
				});
			},
			_initPicScroll: function(){
				if (this.seller.pics) {
					var picWidth = 120;
					var margin = 6;
					var width = (picWidth + margin) * this.seller.pics.length;
					this.$refs.picsList.style.width = width+'px';
					this.$nextTick(function(){
						this.picScroll = new btScroll(this.$refs.picWrap,{
							scrollX: true,
							eventPassthrough: 'vertical'
						});
					});
				}
			},
			toggleFavorite: function(event){
				if (!event._constructed) {
					return;
				}
				this.favorite = !this.favorite;
				saveLocal(this.seller.id,'favorite',this.favorite);
			}
		},
		watch: {
			seller: function(){
				this._initScroll();
				this._initPicScroll();
			}
		},
		mounted: function(){
			this._initScroll();
			this._initPicScroll();
		}
	};
</script>

<style>
	.seller{
		position: absolute;
		left: 0;
		top: 177px;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		background-color: #f3f5f7;
	}
	.sellerContent{
		position: relative;
	}
	.sellerContent .overView{
		margin-bottom: 16px;
		position: relative;
		padding: 18px;
		background-color: #fff;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.sellerContent .overView .brefInfo{
		position: relative;
		padding-bottom: 18px;
		font-size: 0;
	}
	.sellerContent .overView .brefInfo::after{
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
	.sellerContent .overView .sellerName{
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
		margin-bottom: 8px;
	}
	.sellerContent .overView .stars{
		display: inline-block;
		padding-top: 1px;
		height: 18px;
	}
	.sellerContent .overView .ratingCount,.sellerContent .overView .sellCount{
		margin-left: 8px;
		line-height: 18px;
		font-size: 10px;
		color: rgb(77,85,93);
		vertical-align: top;
	}
	.sellerContent .overView .sellCount{
		margin-left: 12px;
	}
	.sellerContent .overView .delivInfo{
		display: flex;
		margin-top: 18px;
	}
	.sellerContent .overView .delivItem{
		flex: 1;
		position: relative;
		text-align: center;
	}
	.sellerContent .overView .delivItem::after{
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 1px;
		background-color: rgba(7,17,27,0.1);
		-webkit-transform: scaleX(0.5);
		transform: scaleX(0.5);
	}
	.sellerContent .overView .delivItem:last-child::after{
		display: none;
	}
	.sellerContent .overView .delivInfoText{
		display: inline-block;
		margin-bottom: 4px;
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.sellerContent .overView .delivInfoCon{
		line-height: 24px;
		font-size: 10px;
		color: rgb(7,17,27);
	}
	.sellerContent .overView .detailNum{
		font-size: 24px;
	}
	.sellerContent .overView .collect{
		position: absolute;
		top: 18px;
		right: 18px;
		width: 36px;
		color: #d4d6d9;
		text-align: center;
	}
	.sellerContent .overView .icon-favorite{
		margin-bottom: 4px;
		line-height: 24px;
		font-size: 24px;
	}
	.sellerContent .overView div.active{
		color: rgb(240,20,20);
	}
	.sellerContent .overView .weishoucang,.sellerContent .overView .yishoucang{
		line-height: 10px;
		font-size: 10px;
		color: #d4d6d9;
	}
	.sellerContent .overView .yishoucang{
		color: rgb(77,85,93);
	}

	.decrease {
	    background-image: url(decrease_4@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .decrease {
	        background-image: url(decrease_4@3x.png);
	    }
	}

	.discount {
	    background-image: url(discount_4@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .discount {
	        background-image: url(discount_4@3x.png);
	    }
	}

	.guarantee {
	    background-image: url(guarantee_4@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .guarantee {
	        background-image: url(guarantee_4@3x.png);
	    }
	}

	.invoice {
	    background-image: url(invoice_4@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .invoice {
	        background-image: url(invoice_4@3x.png);
	    }
	}

	.special {
	    background-image: url(special_4@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .special {
	        background-image: url(special_4@3x.png);
	    }
	}
	.sellerContent .bAndS{
		margin-bottom: 16px;
		padding: 18px 18px 0;
		background-color: #fff;
	}
	.sellerContent .bAndS .title{
		margin-bottom: 8px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.sellerContent .bAndS .bulletin{
		padding-bottom: 16px;
		line-height: 24px;
		font-size: 12px;
		color: rgb(240,20,20);
	}
	.sellerContent .bAndS .supportsItem{
		position: relative;
		padding: 16px 12px;
		line-height: 16px;
	}
	.sellerContent .bAndS .supportsItem::after{
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		height: 1px;
		width: 100%;
		background-color: rgba(7,17,27,0.1);
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	.sellerContent .bAndS .brand{
		display: inline-block;
		margin-right: 6px;
		height: 16px;
		width: 16px;
		background-size: 100% 100%;
		vertical-align: top; 
	}
	.sellerContent .bAndS .supportDetail{
		font-size: 12px;
		color: rgb(7,17,27);
		vertical-align: top;
	}
	.sellerContent .pics{
		padding: 18px;
		background-color: #fff;
	}
	.sellerContent .pics .title{
		margin-bottom: 12px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.sellerContent .pics .picWrap{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		font-size: 0;
	}
	.sellerContent .pics .picItem{
		display: inline-block;
		margin-right: 6px;
		width: 120px;
		height: 90px;
	}
	.sellerContent .pics .picItem:last-child{
		margin-right: 0;
	}
	.sellerContent .infos{
		margin-bottom: 16px;
		padding: 18px;
		background-color: #fff;
	}
	.sellerContent .infos .title{
		margin-bottom: 12px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);		
	}
	.sellerContent .infos .infosItem{
		padding: 16px 12px;
		position: relative;
		line-height: 16px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	.sellerContent .infos .infosItem::after{
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: rgba(7,17,27,0.1);
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
</style>