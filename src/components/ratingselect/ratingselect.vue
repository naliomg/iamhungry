<template>
    <div class="ratingSelect">
        <div class="selectType">
            <span class="all" :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<i class="num">{{ratings.length}}</i></span>
            <span class="positive" :class="{'active':selectType===0}" @click="select(0,$event)">{{desc.positive}}<i class="num">{{positives.length}}</i></span>
            <span class="negative" :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.negative}}<i class="num">{{negatives.length}}</i></span>
        </div>
        <div class="switch">
            <i class="icon-check_circle" :class="{'on':onlyContent}" @click="contentToggle"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props: {
        ratings: {
            type: Array,
            default: function() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: true
        },
        desc: {
            type: Object,
            default: function() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    },
    computed: {
    	positives: function(){
    		return this.ratings.filter(function(item){
    			return item.rateType === POSITIVE;
    		});
    	},
    	negatives: function(){
    		return this.ratings.filter(function(item){
    			return item.rateType === NEGATIVE;
    		});
    	}
    },
    methods: {
        contentToggle: function(event) {
            if (!event._constructed) {
                return;
            }
            this.$emit('contentToggle');
        },
        select: function(type, event) {
            if (!event._constructed) {
                return;
            }
            this.$emit('selectTypeChange',type);
        }
    }
}
</script>
<style>
.ratingSelect .selectType {
    position: relative;
    margin: 0 18px;
    padding-bottom: 18px;
    font-size: 0;
}

.ratingSelect .selectType::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(7,17,27,0.1);
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}

.ratingSelect .selectType span {
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    line-height: 16px;
    font-size: 12px;
    color: rgb(77, 85, 93);
}

.ratingSelect .selectType .num {
    font-size: 8px;
    margin-left: 4px;
}

.ratingSelect .selectType .all {
    display: inline-block;
    background-color: rgba(0, 160, 220, 0.2);
}

.ratingSelect .selectType .all.active,
.ratingSelect .selectType .positive.active {
    background-color: rgba(0, 160, 220, 1);
}

.ratingSelect .selectType .positive {
    display: inline-block;
    background-color: rgba(0, 160, 220, 0.2);
}

.ratingSelect .selectType .negative {
    display: inline-block;
    background-color: rgba(77, 85, 93, 0.2);
}

.ratingSelect .selectType .negative.active {
    background-color: rgba(77, 85, 93, 1);
}

.ratingSelect .selectType .active {
    color: #fff;
}

.ratingSelect .switch {
    padding: 12px 18px;
    font-size: 0;
    color: rgb(147, 153, 159);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.ratingSelect .switch i {
    line-height: 24px;
    font-size: 24px;
    margin-right: 4px;
}

.ratingSelect .switch .text {
    line-height: 24px;
    font-size: 12px;
    vertical-align: top;
}

.ratingSelect .switch .on {
    color: rgb(0, 160, 220);
}
</style>
