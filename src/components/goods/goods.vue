<template>
	<div class="goods">
		<div class="goodsMenuWrap" ref="menuWrap">
			<ul v-if="goods">
				<li v-for="(item,index) in goods" :class="{'current':currentIndex == index}" @click="selectMenu(index,$event)">
					<span class="goodsMenu"><span v-if="item.type >= 0" class="supportsBrand" :class="supportsType[item.type]"></span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="goodsDetailWrap" ref="detailWrap">
			<ul v-if="goods">
				<li v-for="item in goods" class="goodsList goodsList-hook">
					<h1 class="title">{{item.name}}</h1>
					<good :goods="item" v-on:addGood="addGood" v-on:clickGood="clickGood"></good>
				</li>
			</ul>
		</div>
		<shopcart :deliv-cost="seller.deliveryPrice" :min-price="seller.minPrice" :selected-goods="selectedGoods" ref="shopcart"></shopcart>
		<gooddetail :good="clickedGood" v-on:addGood="addGood" ref="gooddetail"></gooddetail>
	</div>
</template>

<script>	
	const ERR_OK = 0;
	import btScroll from 'better-scroll';
	import good from '../../components/good/good.vue';
	import shopcart from '../../components/shopcart/shopcart.vue';
	import gooddetail from '../../components/gooddetail/gooddetail.vue';
	export default {
		props: ['seller'],
		data: function(){
			return {
				'goods': [],
				'supportsType': ['decrease','discount','special','invoice','guarantee'],
				'scrollY': 0,
				'goodsListHeight': [],
				'clickedGood': {}
			}
		},
		computed: {
			'currentIndex': function(){
				for (var i = 0; i < this.goodsListHeight.length; i++) {
					var height1 = this.goodsListHeight[i];
					var height2 = this.goodsListHeight[i+1];
					if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
						return i;
					}
				}
				return 0;
			},
			'selectedGoods': function(){
				var recordGoods = [];
				this.goods.forEach(function(fenglei){
					fenglei.foods.forEach(function(good){
						if (good.count) {
							recordGoods.push(good);
						}
					});
				});
				return recordGoods;
			}
		},
		components: {
			'good': good,
			'shopcart': shopcart,
			'gooddetail': gooddetail
		},
		methods: {
			initScroll: function(){
				this.menuScroll = new btScroll(this.$refs.menuWrap,{
					click: true
				});
				this.detailScroll = new btScroll(this.$refs.detailWrap,{
					click: true,
					probeType: 3
				});
				var that = this;
				this.detailScroll.on('scroll',function(pos){
					that.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			computedHeight: function(){
				var goodLi = this.$refs.detailWrap.getElementsByClassName('goodsList-hook');
				var height = 0;
				this.goodsListHeight = [height];
				for(var i = 0; i < goodLi.length; i++){
					height += goodLi[i].clientHeight;
					this.goodsListHeight.push(height);
				}
			},
			selectMenu: function(index,event){
				if (!event._constructed) {
					return;
				}				
				var goodLi = this.$refs.detailWrap.getElementsByClassName('goodsList-hook');
				var scrollToEl = goodLi[index];
				this.detailScroll.scrollToElement(scrollToEl,300);
			},
			// 体验优化
			addGood: function(target){
				this.$nextTick(function(){
					this.$refs.shopcart.ballFall(target);
				});
			},
			clickGood: function([good,event]){
				if (!event._constructed) {
					return;
				}
				this.clickedGood = good;
				this.$refs.gooddetail.goodDetailShow();
			}
		},
		created: function(){
			this.$http.get('/api/goods').then(function(response){
				response = response.data;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(function(){						
						this.initScroll();
						this.computedHeight();
					});
				}
			});
		}
	};
</script>

<style>
	.goods{
		display: flex;
		position: absolute;
		left: 0;
		top: 177px;
		bottom: 48px;
		width: 100%;
		overflow: hidden;
	}
	.goodsMenuWrap{
		flex: 0 0 80px;
		width: 80px;
		height: 100%;
		background-color: #f3f5f7;
	}
	.goodsMenuWrap li{
		position: relative;
		height: 54px;
		padding: 0 12px;
		display: flex;
		align-items: center;
		font-size: 12px;
		line-height: 14px;
		color: rgb(40,20,20);
	}
	.goodsMenuWrap .current{
		background-color: #fff;
		color: red;
	}
	.goodsMenuWrap .current::after{
		display: none;
	}
	.supportsBrand{		
	    display: inline-block;
	    width: 14px;
	    height: 14px;
	    background-size: 100%;
	    vertical-align: top;
	    margin-right: 4px;
	}
	.goodsMenuWrap li::after{
		content: '';
		display: block;
		position: absolute;
		height: 1px;
		width: 56px;
		bottom: 0;
		left: 50%;
		margin-left: -28px;
        -webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: rgba(7,17,27,0.1);
	}
	.decrease {
	    background-image: url(decrease_3@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .decrease {
	        background-image: url(decrease_3@3x.png);
	    }
	}

	.discount {
	    background-image: url(discount_3@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .discount {
	        background-image: url(discount_3@3x.png);
	    }
	}

	.guarantee {
	    background-image: url(guarantee_3@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .guarantee {
	        background-image: url(guarantee_3@3x.png);
	    }
	}

	.invoice {
	    background-image: url(invoice_3@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .invoice {
	        background-image: url(invoice_3@3x.png);
	    }
	}

	.special {
	    background-image: url(special_3@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .special {
	        background-image: url(special_3@3x.png);
	    }
	}
	.goodsDetailWrap{
		flex: 1;
	}
	.goodsDetailWrap .title{
		height: 26px;
		padding-left: 14px;
		border-left: 2px solid #d9dde1;
		line-height: 26px;
		background-color: #f3f5f7;
		font-size: 12px;
		color: rgb(147,153,159);
	}
</style>