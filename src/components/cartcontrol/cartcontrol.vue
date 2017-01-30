<template>
	<div class="cartControl">
		<transition name="delShow">
			<div class="deletWrap" v-show="good.count>0" @click.stop="delGood">
				<span class="delInner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<span class="num" v-show="good.count>0">{{good.count}}</span>
		<span class="add icon-add_circle" @click.stop="addGood($event)"></span>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		props: ['good'],
		methods: {
			addGood: function(event){
				if (!event._constructed) {
					return;
				}
				if (!this.good.count) {
					Vue.set(this.good,'count',1);
				}else{
					this.good.count++;
				}
				this.$emit('addGood',event.target);
			},
			delGood: function(event){
				if (!event._constructed) {
					return;
				}
				if (this.good.count>0) {
					this.good.count--;
				}
			}
		}
	}
</script>

<style>
	.cartControl{
		font-size: 0;
	}
	.cartControl .icon-add_circle{
		display: inline-block;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,160,220);
		vertical-align: bottom;
		padding: 6px;
	}
	.cartControl .num{
		display: inline-block;
		font-size: 10px;
		line-height: 24px;
		color: rgb(147,153,159);
		vertical-align: bottom;
		padding: 6px 0;
	}
	.cartControl .deletWrap{
		display: inline-block;		
		padding: 6px;
		opacity: 1;
		transform: translate3d(0,0,0);
	}
	.cartControl .delInner{
		display: inline-block;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,160,220);
		vertical-align: bottom;
		transform: rotate(0deg);
	}
	.cartControl .delShow-enter-active,.cartControl .delShow-leave-active{
		transition: all 0.3s linear;
	}
	.cartControl .delShow-enter, .cartControl .delShow-leave-active{
		opacity: 0;
		transform: translate3d(24px,0,0);
	}
	.cartControl .delShow-enter-active .delInner,.cartControl .delShow-leave-active .delInner{
		transition: all 0.3s linear;
	}
	.cartControl .delShow-enter .delInner, .cartControl .delShow-leave-active .delInner{		
		transform: rotate(180deg);
	}
</style>
