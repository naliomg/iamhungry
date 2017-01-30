<template>
	<ul>
		<li v-for="item in goods.foods" class="singleGoodWrap" @click.stop="clickGood(item,$event)">
			<div class="singleGood clearF">
				<div class="avatar">
	                <img :src="item.icon" width="57" height="57">
	            </div>
	            <div class="content">
	                <h2 class="name">{{item.name}}</h2>
	                <p class="description" v-if="item.description">{{item.description}}</p>
	                <p class="sellInfo" v-if="item.sellCount || item.rating">
	                    <span class="sellCount" v-if="item.sellCount">月售{{item.sellCount}}份</span><span class="rating" v-if="item.rating">好评率{{item.rating}}%</span>
	                </p>
	                <p class="priceInfo">
	                	<span class="priceTag">¥</span><span class="price">{{item.price}}</span
	                	><span class="oldPrice" v-if="item.oldPrice">¥{{item.oldPrice}}</span>
	                </p>
	            </div>
	            <div class="cartControllWrap">
					<cartControl :good="item" v-on:addGood="addGood"></cartControl>
				</div>
            </div>
		</li>
	</ul>
</template>

<script>
	import cartControl from '../../components/cartcontrol/cartcontrol.vue';
	export default {
		props: ['goods'],
		methods: {
			addGood: function(target){
				this.$emit('addGood',target);
			},
			clickGood: function(good,event){
				this.$emit('clickGood',[good,event]);
			}
		},
		components: {
			cartControl: cartControl
		}
	}
</script>

<style>
	.singleGoodWrap{
		padding: 18px;
	}
	.singleGood{
		position: relative;
		display: flex;
	}
	.singleGood::after{
		content: '';
		height: 1px;
		width: 100%;
		position: absolute;
		bottom: -18px;
		left: 0;
		transform: scaleY(0.5);
		background-color: rgba(7,17,27,0.1);
	}
	.singleGoodWrap:last-child .singleGood::after{
		display: none;
	}
	.singleGood .avatar{
		width: 57px;
		height: 57px;
		flex: 0 0 57px;
		vertical-align: top;
	}
	.singleGood .content{
		flex: 1;
		padding-left: 10px;
	}
	.singleGood .content .name{
		margin-top: 2px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.singleGood .description,.content .sellInfo{
		margin-top: 8px;
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.singleGood .rating{
		margin-left: 12px;
	}
	.singleGood .priceInfo{
		font-size: 14px;
		line-height: 14px;
		margin-top: 8px;
	}
	.singleGood .priceTag{
		line-height: 10px;
		font-size: 10px;
		vertical-align: bottom;
		color: rgb(240,20,20);
	}
	.singleGood .price{
		font-weight: 700;
		color: rgb(240,20,20);
		vertical-align: bottom;		
	}
	.singleGood .oldPrice{
		margin-left: 8px;
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
		vertical-align: bottom;
		text-decoration: line-through;
	}
	.singleGood .cartControllWrap{
		position: absolute;
		right: 0;
		bottom: -12px;
	}
</style>