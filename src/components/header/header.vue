<template>
    <div class="header">
        <div class="content-wrap">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64">
            </div>
            <div class="content">
                <h2>
        			<span class="brand"></span><span class="name">{{seller.name}}</span>
        		</h2>
                <p class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
                <p class="supports" v-if="seller.supports">
                    <span class="brand" :class="supportsType[seller.supports[0].type]"></span><span class="supDescription">{{seller.supports[0].description}}</span>
                    <span class="supportsNum" @click="showFilter">{{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></span>
                </p>
            </div>
        </div>
        <div class="announcement-wrap" @click="showFilter">
        	<span class="annouce-brand"></span><span 
        	class="annouce-text">{{seller.bulletin}}</span><i 
        	class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background-wrap">
        	<img :src="seller.avatar" width="100%">
        </div>
        <transition name="fade">
        	<div class="filter" v-show="filterShow">
        	<div class="detail-wrap" clearF>
        		<div class="detail-main">
        			<h1>{{seller.name}}</h1>
        			<div class="stars-wrap">
        				<stars :score="seller.score" :size="48"></stars>
        			</div>        			
        			<div class="discountInfo">
        				<div class="divLine"></div>
        				<div class="text">优惠信息</div>
        				<div class="divLine"></div>
        			</div>
        			<div class="supportsList" v-if="seller.supports">
        				<p v-for="item in seller.supports"><span class="brand" :class="supportsType[item.type]"></span><span class="supportDetail">{{item.description}}</span></p>
        			</div>
        			<div class="discountInfo">
        				<div class="divLine"></div>
        				<div class="text">商家公告</div>
        				<div class="divLine"></div>
        			</div>
        			<div class="bulletin">
        				<p>{{seller.bulletin}}</p>
        			</div>
        		</div>
        	</div>
        	<div class="detail-close" @click="hideFilter"><i class="icon-close"></i></div>
        </transition>
        </div>
    </div>
</template>

<script>
	import stars from '../stars/stars.vue';
	export default {
	    props: ['seller'],
	    data: function() {
	        return {
	            'supportsType': ['decrease','discount','special','invoice','guarantee'],
	            'filterShow': false
	        }
	    },
	    methods:{
	    	showFilter: function(){
	    		this.filterShow = true;
	    	},
	    	hideFilter: function(){
	    		this.filterShow = false;
	    	}
	    },
	    components: {
	    	stars: stars
	    }
	}
</script>

<style>
	.header {
	    color: #fff;
	    position: relative;
	    background: rgba(7,17,27,0.5);
	}

	.header .content-wrap {
	    padding: 24px 12px 18px 24px;
	    overflow: hidden;	    
		position: relative;
	}

	.content-wrap .avatar,
	.content-wrap .content {
	    float: left;
	}

	.content-wrap .avatar {
	    border-radius: 2px;
	    overflow: hidden;
	}

	.content-wrap .content {
	    margin-left: 16px;
	}

	.content-wrap h2 {
	    margin: 2px 0 8px 0;
	}

	.content-wrap h2 .brand {
	    display: inline-block;
	    height: 18px;
	    width: 30px;
	    background-image: url(brand@2x.png);
	    background-size: 100%;
	    vertical-align: top;
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .content-wrap h2 .brand {
	        background-image: url(brand@3x.png);
	    }
	}

	.content-wrap h2 .name {
	    font-size: 16px;
	    font-weight: bold;
	    line-height: 18px;
	    padding-left: 6px;
	}

	.content-wrap .description {
	    font-size: 12px;
	    line-height: 12px;
	    margin-bottom: 10px;
	}

	.content-wrap .supports .brand {
	    display: inline-block;
	    width: 12px;
	    height: 12px;
	    background-size: 100%;
	    vertical-align: top;
	}

	.decrease {
	    background-image: url(decrease_2@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .decrease {
	        background-image: url(decrease_2@3x.png);
	    }
	}

	.discount {
	    background-image: url(discount_2@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .discount {
	        background-image: url(discount_2@3x.png);
	    }
	}

	.guarantee {
	    background-image: url(guarantee_2@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .guarantee {
	        background-image: url(guarantee_2@3x.png);
	    }
	}

	.invoice {
	    background-image: url(invoice_2@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .invoice {
	        background-image: url(invoice_2@3x.png);
	    }
	}

	.special {
	    background-image: url(special_2@2x.png);
	}

	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .special {
	        background-image: url(special_2@3x.png);
	    }
	}
	.content-wrap .supports .supDescription{
		display: inline-block;
		padding-left: 4px;
		font-size: 10px;
		line-height: 12px;
		vertical-align: top;
		margin-top: 1px;
	}
	.content-wrap .supports .supportsNum{
		display: block;
		position: absolute;
		right: 12px;
		bottom: 18px;
		background-color: rgba(0,0,0,0.2);
		height: 12px;
		padding: 6px 8px;
		font-size: 10px;
		line-height: 12px;
		border-radius: 14px/16px;
	}
	.icon-keyboard_arrow_right:before {
	  content: "\e908";
	} 
	.supportsNum i{
		margin-left: 2px;
		vertical-align: middle;
	}
	.announcement-wrap{
		position: relative;
		height: 28px;
		padding: 0 20px 0 12px;
		font-size: 10px;
		line-height: 28px;
		background-color: rgba(7,17,27,0.2);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.annouce-brand{
		display: inline-block;
		width: 22px;
		height: 12px;
		vertical-align: middle;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url(bulletin@2x.png);
	}
	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
	    .annouce-brand {
	        background-image: url(bulletin@3x.png);
	    }
	}
	.annouce-text{
		padding: 0 20px 0 4px;	
		vertical-align: top;
	}
	.announcement-wrap i{
		display: inline-block;
		height: 28px;
		line-height: 28px;
		position: absolute;
		right: 12px;
		top: 0px;
	}
	.background-wrap{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(10px); 
		overflow: hidden;
	}
	.filter{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		overflow: auto;
		opacity: 1;		
		background: rgba(7,17,27,0.8);	
	}
	.fade-enter-active, .fade-leave-active {
		transition: all 0.5s;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0;
	}
	.detail-wrap{
		min-height: 100%;
	}
	.detail-main{
		padding: 88px 0
	}
	.detail-close{
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto 0;
		font-size: 32px;
		color: rgba(255,255,255,0.5);
		clear: both;
	}
	.detail-main h1{
		text-align: center;
		font-size: 16px;
		font-weight: 700;
		line-height: 16px;
	}
	.detail-main .stars-wrap{
		text-align: center;
		padding: 2px;
		margin-top: 16px;
	}
	.detail-main .discountInfo{
		display: flex;		
		width: 80%;
		margin: 28px auto 24px;
		font-size: 14px;
		font-weight: 700;
		line-height: 28px;
	}
	.detail-main .discountInfo .divLine{
		flex: 1;
		height: 1px;
		background-color: rgba(255,255,255,0.2);
		position: relative;
		top: 13px;
	}
	.detail-main .discountInfo .text{
		padding: 0 12px;
	}
	.supportsList{		
		width: 80%;
		margin: 0 auto;		
	}
	.supportsList p{
		margin-bottom: 12px;
		padding: 0 12px;
	}
	.supportsList p:last-child{
		margin-bottom: 0;
	}
	.supportsList .brand {
	    display: inline-block;
	    width: 16px;
	    height: 16px;
	    background-size: 100%;
	    vertical-align: middle;
	}
	.supportsList .supportDetail{
		padding-left: 6px;
		font-size: 12px;
		line-height: 16px;
	}
	.detail-main .bulletin{
		width: 80%;
		margin: 0 auto;
	}
	.detail-main .bulletin p{
		padding: 0 12px;
		font-size: 12px;
		line-height: 24px;
	}
</style>
