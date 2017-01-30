<template>
	<div class="stars" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="itemClass"></span>
	</div>
</template>

<script>
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';

	export default{
		props: ['score','size'],
		data: function(){
			return {

			}
		},
		computed:{
			starType: function(){
				return 'star-'+this.size;
			},
			itemClasses: function(){
				var classFlag=[];
				var tempScore=this.score;
				for (var i = 0; i < LENGTH; i++) {
					if (tempScore >= 1) {
						classFlag.push(CLS_ON);
						tempScore=tempScore-1;
						continue;
					}else if(tempScore >= 0.5){
						classFlag.push(CLS_HALF);
						tempScore=tempScore-1;
						continue;
					}else {
						classFlag.push(CLS_OFF);
					}
				}
				return classFlag;
			}
		}
	};
</script>

<style>
	.stars{
		font-size: 0;
	}
	.itemClass{
		display: inline-block;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.star-48 .itemClass{
		width: 20px;
		height: 20px;
		margin-right: 22px;
	}
	.star-48 .on{
		background-image: url(star48_on@2x.png);
	}
	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
		.star-48 .on{
			background-image: url(star48_on@3x.png);
		}
	}
	.star-48 .off{
		background-image: url(star48_off@2x.png);
	}
	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
		.star-48 .off{
			background-image: url(star48_off@3x.png);
		}
	}
	.star-48 .half{
		background-image: url(star48_half@2x.png);
	}
	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
		.star-48 .half{
			background-image: url(star48_half@3x.png);
		}
	}
	.star-36 .itemClass{
		width: 15px;
		height: 15px;
		margin-right: 6px;
	}
	.star-36 .on{
		background-image: url(star36_on@2x.png);
	}
	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
		.star-36 .on{
			background-image: url(star36_on@3x.png);
		}
	}
	.star-36 .off{
		background-image: url(star36_off@2x.png);
	}
	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
		.star-36 .off{
			background-image: url(star36_off@3x.png);
		}
	}
	.star-36 .half{
		background-image: url(star36_half@2x.png);
	}
	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
		.star-36 .half{
			background-image: url(star36_half@3x.png);
		}
	}
	.star-24 .itemClass{
		width: 10px;
		height: 10px;
		margin-right: 3px;
	}
	.star-24 .on{
		background-image: url(star24_on@2x.png);
	}
	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
		.star-24 .on{
			background-image: url(star24_on@3x.png);
		}
	}
	.star-24 .off{
		background-image: url(star24_off@2x.png);
	}
	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
		.star-24 .off{
			background-image: url(star24_off@3x.png);
		}
	}
	.star-24 .half{
		background-image: url(star24_half@2x.png);
	}
	@media (min-device-pixel-ratio:3),
	(-webkit-min-device-pixel-ratio:3) {
		.star-24 .half{
			background-image: url(star24_half@3x.png);
		}
	}
	.stars .itemClass:last-child{
		margin-right: 0;
	}
</style>