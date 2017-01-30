<template>
	<div class="shopcartWrap">
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="cart-icon" :class="{cartNotEmpty: totalCount > 0}">
						<i class="icon-shopping_cart"></i>
						<span class="num" v-show="totalCount">{{totalCount}}</span>
					</div>
					<div class="goods-cost" :class="{totalNotEmpty: totalCount > 0}">¥{{goodsCost}}</div>
					<div class="deliv-cost">另需配送费¥{{delivCost}}元</div>
				</div>
				<div class="content-right" v-html="payStatus" :class="{uCanPay: goodsCost >= minPrice}" @click.stop="pay"></div>
			</div>
			<div class="ballsContainer">
				<transition v-for="ball in balls" name="ballFall" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
					<div class="ballWrap" v-show="ball.show">
						<div class="innerBall"></div>
					</div>
				</transition>
			</div>
			<transition name=toggleList>
				<div class="shopcartList" v-show="listShow">
					<div class="listHeader clearF">
						<h1 class="title">购物车</h1>
						<span class="emptyCart" @click="emptyCart">清空</span>
					</div>
					<div class="listContent" ref="listContent">
						<ul>
							<li class="good" v-for="good in selectedGoods">
								<span class="name">{{good.name}}</span>
								<div class="price">
									<span>¥</span>{{good.price*good.count}}
								</div>
								<div class="cartControlWrap">
									<cartControl :good="good" v-on:addGood="ballFall"></cartControl>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="listFilterShow">
			<div class="listFilter" v-show="listShow" @click="closeList"></div>
		</transition>
	</div>
</template>

<script>
	import btScroll from 'better-scroll';
	import cartControl from '../../components/cartcontrol/cartcontrol.vue';
	export default {
		props:['deliv-cost','selected-goods','min-price'],
		data: function(){
			return {
				balls: [
					{
						show: false,
					},
					{
						show: false,
					},
					{
						show: false,
					},
					{
						show: false,
					},
					{
						show: false,
					}
				],
				failedBalls: [],
				foldList: true
			}
		},
		components: {
			cartControl: cartControl
		},
		computed: {
			goodsCost: function(){
				var total = 0;
				this.selectedGoods.forEach(function(singleGood){
					total += singleGood.price*singleGood.count;
				});
				return total;
			},
			totalCount: function(){
				var totalcount = 0;
				this.selectedGoods.forEach(function(singleGood){
					totalcount += singleGood.count;
				});
				return totalcount;
			},
			payStatus: function(){
				if(this.goodsCost === 0){
					return '¥' + this.minPrice + '起送';
				}else if (this.goodsCost < this.minPrice) {
					return '还差¥' + (this.minPrice - this.goodsCost) + '起送';
				}else{
					return '去结算';
				}
			},
			listShow: function(){
				if (!this.totalCount) {
					this.foldList = true;
					return false;
				}
				var show = !this.foldList;
				if (show) {
					this.$nextTick(function(){
						if (!this.scroll) {
							this.scroll = new btScroll(this.$refs.listContent,{
								click: true
							});
						}else{
							this.scroll.refresh();
						}
					});
				}
				return show;
			}
		},
		methods: {
			ballFall: function(target){
				for (var i = 0; i < this.balls.length; i++) {
					var ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.target = target;
						this.failedBalls.push(ball);
						return;
					}
				}
			},
			beforeEnter: function(el){
				var countBall = this.balls.length;
				while(countBall--){
					var ball = this.balls[countBall];
					if (ball.show) {
						var rect = ball.target.getBoundingClientRect();
						var x = rect.left - 22;
						var y = -(window.innerHeight - rect.top - 45);
						el.style.display = '';
						el.style.webKitTransform = 'translate3d(0,'+ y +'px,0)';
						el.style.transform = 'translate3d(0,'+ y +'px,0)';
						var inner = el.getElementsByClassName('innerBall')[0];
						inner.style.webKitTransform = 'translate3d(' + x + 'px,0,0)';
						inner.style.transform = 'translate3d(' + x + 'px,0,0)';
					}
				}
			},
			enter: function(el,done){
				var rf = el.offsetHeight;
				this.$nextTick(function(){
					el.style.webKitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					el.style.webkitTransition = 'all 0.5s cubic-bezier(.28,-0.29,.65,-0.03)';
					el.style.transition = 'all 0.5s cubic-bezier(.28,-0.29,.65,-0.03)';				
					var inner = el.getElementsByClassName('innerBall')[0];
					inner.style.webKitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					inner.style.webkitTransition = 'all 0.5s linear';
					inner.style.transition = 'all 0.5s linear';
				});
				setTimeout(done,500);
			},
			afterEnter: function(el){
				var ball = this.failedBalls.shift();
				if (ball) {
					ball.show = false;
					el.style.display = "none";
				}
			},
			toggleList: function(){
				if (!this.totalCount) {
					return;
				}
				this.foldList = !this.foldList;
			},
			emptyCart: function(){
				this.selectedGoods.forEach(function(item){
					item.count = 0;
				});
			},
			closeList: function(){
				this.foldList = true;
			},
			pay: function(){
				if (this.goodsCost < this.minPrice) {
					return;
				}
				window.alert('本次需要支付'+this.goodsCost+'元，不过现在还不能支付哦~');				
			}
		}
	}
</script>

<style>
	.shopcart{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 48px;
	}
	.shopcart .content{
		display: flex;
		height: 100%;
		background-color: #141d27;
	}
	.shopcart .content-left{
		flex: 1;
		font-size: 0;
	}
	.shopcart .cart-icon{
		display: inline-block;
		position: relative;
		top: -10px;
		margin: 0 12px;
		padding: 6px;
		width: 44px;
		height: 44px;
		text-align: center;
		vertical-align: top;
		border-radius: 50%;
		background-color: #141d27;
	}
	.shopcart .cart-icon i{
		display: inline-block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #2b343c;
		font-size: 24px;
		line-height: 44px;
		color: rgba(255,255,255,0.4);
	}
	.shopcart .cartNotEmpty i{
		background-color: rgb(0,160,220);
		color: #fff;
	}
	.shopcart .cart-icon .num{
		position: absolute;
		top: 0px;
		right: 0px;
		display: inline-block;
		line-height: 16px;
		height: 16px;
		width: 24px;
		border-radius: 7px;
		background-color: rgb(240,20,20);
		text-align: center;
		font-size: 9px;
		font-weight: 700;
		color: #fff;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.4);
	}
	.shopcart .goods-cost,.shopcart .deliv-cost{
		display: inline-block;
		margin: 12px 0;
		padding-right: 12px;
		line-height: 24px;
		font-size: 16px;
		font-weight: 700;
		color: rgba(255,255,255,0.4);
		border-right: 1px solid rgba(255,255,255,0.1);
	}
	.shopcart .totalNotEmpty{
		color: #fff;
	}
	.shopcart .deliv-cost{
		margin: 12px 0 12px 12px;
		font-size: 10px;
		font-weight: normal;		
		border-right: none;
	}
	.shopcart .content-right{
		flex: 0 0 105px;
		width: 105px;
		height: 100%;
		box-sizing: border-box;
		padding: 12px 8px;
		background-color: #2b343c;
		font-size: 12px;
		font-weight: 700px;
		line-height: 24px;
		color: rgba(255,255,255,0.4);
		text-align: center;
	}
	.shopcart .uCanPay{
		background-color: #00b43c;
		color: #fff;
	}
	.shopcart .ballsContainer{}
	.shopcart .ballWrap{
		position: fixed;
		left: 32px;
		bottom: 22px;
		z-index: 99;
	}
	.shopcart .innerBall{
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background-color: rgb(0,160,220);
	}
	.shopcartList{
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		width: 100%;
		transform: translate3d(0,-100%,0);
	}
	.toggleList-enter-active,.toggleList-leave-active{
		transition: all 0.5s;
	}
	.toggleList-enter,.toggleList-leave-active{
		transform: translate3d(0,0,0);
	}
	.shopcartList .listHeader{
		height: 40px;
		padding: 0 18px;
		background-color: #f3f5f7;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.shopcartList .listHeader .title{
		display: inline-block;
		float: left;
		line-height: 40px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.shopcartList .listHeader .emptyCart{
		display: inline-block;
		float: right;
		line-height: 40px;
		font-size: 12px;
		color: rgb(0,160,220);
	}
	.shopcartList .listContent{
		padding: 0 18px;
		overflow: hidden;
		max-height: 217px;
		background-color: #fff;
	}
	.shopcartList .listContent .good{
		position: relative;
		box-sizing: border-box;
		height: 48px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		padding: 12px 0;
	}
	.shopcartList .listContent .name{
		display: inline-block;
		line-height: 24px;
		font-size: 14px;
		color: rgb(7,17,27);
		font-weight: 700;
	}
	.shopcartList .listContent .price{
		position: absolute;
		right: 90px;
		bottom: 12px;
		line-height: 24px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(240,20,20);
	}
	.shopcartList .listContent .price span{
		font-size: 10px;
		font-weight: normal;
	}
	.shopcartList .listContent .cartControlWrap{
		position: absolute;
		right: 0;
		bottom: 5px;
	}
	.shopcartWrap .listFilter{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 90;
		background-color: rgba(7,17,27,0.6);
		filter: blur(10px);
	}
	.listFilterShow-enter-active,.listFilterShow-leave-active{
		transition: all 0.5s;	
		opacity: 1;
	}
	.listFilterShow-enter,.listFilterShow-leave-active{
		opacity: 0;
	}
</style>
