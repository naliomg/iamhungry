<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评价</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/sellers">商家</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view :seller="seller"></router-view> 
        </keep-alive>       
    </div>
</template>

<script>
import {urlParse} from './common/js/urlParse.js';
import header from 'components/header/header.vue';
const ERR_OK = 0;
export default {
    data:function(){
        return {
            seller:{
                id: (function(){
                    var queryParam = urlParse();
                    return queryParam.id;
                })()
            }
        }
    },
    created:function(){
        this.$http.get('api/seller?id='+this.seller.id).then(function(response){
            response = response.data;
            if (response.errno === ERR_OK) {
                // this.seller = response.data;
                // es6扩展对象属性方法，将id加入seller中，避免被新获取的值直接盖掉
                this.seller = Object.assign({},this.seller,response.data);
            }
        });
    },
    components: {
        'v-header': header
    }
}
</script>

<style>
@media (min-device-pixel-ratio:1.5),
(-webkit-min-device-pixel-ratio:1.5) {
    .border-1px::after {
        -webkit-transform: scaleY(0.7);
        transform: scaleY(0.7);
    }
}

@media (min-device-pixel-ratio:2),
(-webkit-min-device-pixel-ratio:2) {
    .border-1px::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}

.border-1px::after {
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    content: '';
}

.tab {
    display: flex;
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: rgb(77, 84, 93);
}

.tab-item {
    flex: 1;
    text-align: center;
}

.tab a {
    display: block;
}

.tab a.active {
    color: rgb(240, 20, 20);
}
</style>
