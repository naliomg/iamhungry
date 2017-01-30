import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import sellers from 'components/sellers/sellers.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [{
    path: '/goods',
    component: goods
}, {
    path: '/ratings',
    component: ratings
}, {
    path: '/sellers',
    component: sellers
}];
const router = new VueRouter({
    routes: routes,
    linkActiveClass: 'active'
});

/* eslint-disable no-new */
const app = new Vue({
    el: '#app',
    router: router,
    template: '<App/>',
    components: { App }
});

// router.push('/goods');
