<template>
	<transition name="goodDetailShow">
		<div class="goodDetail" v-show="goodDetailFlag" ref="goodDetail">
			<div>
				<div class="goodAvatar">
					<img :src="good.image" alt="avatar">
					<div class="detailBack" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="shopName">
					<h1 class="name">{{good.name}}</h1>
					<p class="sellInfo">
						<span class="sellCount">月售{{good.sellCount}}份</span>
						<span class="shopRating">好评率{{good.rating}}%</span>
					</p>
					<p class="price">
						<span class="rmb">¥</span><span class="priceNow">{{good.price}}</span>
						<span class="oldPrice" v-if="good.oldPrice">¥{{good.oldPrice}}</span>
					</p>
					<div class="addToCart" @click.stop="addGood($event.target)">
						<div class="addCart" v-if="!good.count" @click="buyTheGood">加入购物车</div>
						<div class="cartContr" v-else-if="good.count>0">
							<cartcontrol :good="good" v-on:addGood="addGood"></cartcontrol>
						</div>
					</div>
				</div>
				<div class="goodInfo" v-show="good.info">
					<h1 class="title">商品介绍</h1>
					<p>{{good.info}}</p>
				</div>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :ratings="good.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" v-on:selectTypeChange="selectTypeChange" v-on:contentToggle="contentToggle"></ratingselect>
					<ul v-if="good.ratings && good.ratings.length" class="ratingWrap">
						<li class="ratingItem" v-for="item in good.ratings" v-show="ratingShow(item.rateType,item.text)">
							<div class="user">
								<span class="username">{{item.username}}</span><img :src="item.avatar" class="useravatar" width="12" height="12">
							</div>
							<div class="rateTime">{{item.rateTime | formateDate}}</div>
							<p class="rateContent">
								<span :class="{'icon-thumb_up':!item.rateType,'icon-thumb_down':item.rateType}" class="rateType"></span>{{item.text}}
							</p>
						</li>
					</ul>
					<div class="noRatings" v-else>暂无对应商品评价~</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	import Vue from 'vue';
	import btScroll from 'better-scroll';
	import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
	import ratingselect from '../../components/ratingselect/ratingselect.vue';
	import {formatDate} from '../../common/js/formatDate.js';
	export default {
		props: ['good'],
		data: function(){
			return {
				goodDetailFlag: false,
				selectType: ALL,
				onlyContent: false,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		filters: {
			formateDate: function(time){
				var date = new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			cartcontrol: cartcontrol,
			ratingselect: ratingselect
		},
		methods: {
			goodDetailShow: function(){
				this.goodDetailFlag = true;
				this.$nextTick(function(){
					if (!this.scroll) {
						this.scroll = new btScroll(this.$refs.goodDetail,{
							click: true
						});
					}else{
						this.scroll.refresh();
					}
				});
			},
			hide: function(){
				this.goodDetailFlag = false;
			},
			buyTheGood: function(event){
				if (!event._constructed) {
					return;
				}
				Vue.set(this.good,'count',1);
			},
			addGood: function(target){
				this.$emit('addGood',target);
			},
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
	.goodDetail{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index: 80;
		width: 100%;
		background-color: #f3f5f7;
	}
	.goodDetailShow-enter-active,.goodDetailShow-leave-active{
		transform: translate3d(0,0,0);
		transition: all 0.5s;
	}
	.goodDetailShow-enter,.goodDetailShow-leave-active{
		transform: translate3d(100%,0,0);
	}
	.goodDetail .goodAvatar{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	.goodDetail .goodAvatar img{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.goodDetail .detailBack{
		position: absolute;
		top: 10px;
		left: 0;
	}
	.goodDetail .icon-arrow_lift{
		display: inline-block;
		padding: 10px;
		font-size: 20px;
		color: #fff;
	}
	.goodDetail .shopName{
		position: relative;
		padding: 18px;
		background-color: #fff;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.goodDetail .shopName .name{
		line-height: 14px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7,17,27);
		margin-bottom: 8px;
	}
	.goodDetail .shopName .sellInfo{
		font-size: 0;
		margin-bottom: 18px;
	}
	.goodDetail .shopName .sellCount,.goodDetail .shopName .rating{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.goodDetail .shopName .shopRating{
		margin-left: 12px;
	}
	.goodDetail .shopName .price{
		font-size: 0;
	}
	.goodDetail .shopName .rmb,.goodDetail .shopName .priceNow{
		line-height: 24px;
		font-size: 10px;
		color: rgb(240,20,20);
	}
	.goodDetail .shopName .priceNow{
		font-size: 14px;
		font-weight: 700;
	}
	.goodDetail .shopName .oldPrice{
		margin-left: 12px;
		line-height: 24px;
		font-size: 10px;
		color: rgb(147,153,159);
		text-decoration: line-through;
	}
	.goodDetail .shopName .addToCart{
		position: absolute;
		right: 18px;
		bottom: 18px;
	}
	.goodDetail .shopName .addCart{
		width: 74px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		border-radius: 12px;
		background-color: rgb(0,160,220);
		font-size: 10px;
		color: #fff;
	}
	.goodDetail .shopName .cartContr{
		margin: 0 -6px -6px 0;
	}
	.goodDetail .goodInfo{
		margin-top: 16px;
		padding: 18px;
		border-top: 1px solid rgba(7,17,27,0.1);
		border-bottom: 1px solid rgba(7,17,27,0.1);
		background-color: #fff;
	}
	.goodDetail .goodInfo .title{
		margin-bottom: 6px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.goodDetail .goodInfo p{
		padding: 0 8px;
		line-height: 24px;
		font-size: 12px;
		color: rgb(77,85,93);
	}
	.goodDetail .rating{
		margin-top: 16px;
		border-top: 1px solid rgba(7,17,27,0.1);
		background-color: #fff;
	}
	.goodDetail .rating .title{
		margin: 18px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.goodDetail .rating .noRatings{
		height: 90px;
		text-align: center;
		font-size: 10px;
		line-height: 90px;
		color: rgb(77,85,93);
	}
	.goodDetail .rating .ratingWrap{
		padding: 0 18px; 
	}
	.goodDetail .rating .ratingItem{
		position: relative;
		padding: 16px 0;
	}
	.goodDetail .rating .ratingItem::after{
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 1px;
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
		background-color: rgba(7,17,27,0.1);
	}
	.goodDetail .rating .user{
		position: absolute;
		right: 0;
		top: 16px;
	}
	.goodDetail .rating .username{
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
		margin-right: 6px;
		vertical-align: middle;
	}
	.goodDetail .rating .useravatar{
		width: 12px;
		height: 12px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.goodDetail .rating .rateTime{
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
		margin-bottom: 6px;
	}
	.goodDetail .rating .rateContent{
		line-height: 16px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	.goodDetail .rating .rateType{
		color: rgb(147,153,159);
		margin-right: 4px;
		vertical-align: middle;
	}
	.goodDetail .rating .icon-thumb_up{
		color: rgb(0,160,220);
	}
</style>
