import Vue from 'vue';
import VueRouter from 'vue-router';

import Start from '../pages/Start';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Cart from '../pages/Cart';
import Edit from '../pages/Edit';
import Order from '../pages/Order';
import Pay from '../pages/Pay';

Vue.use(VueRouter);

const routes = [
	{path:'/start',component: Start},
	{path:'/home', component: Home},
	{path:'/detail', component: Detail},
	{path:'/cart', component: Cart},
	{path:'/edit', component: Edit},
	{path:'/order', component: Order},
	{path:'/pay', component: Pay},
	{path:'*', redirect: '/start'}
]

export default new VueRouter({
	routes
});
