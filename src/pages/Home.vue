<template>
	<div id="home">
		<div class="home-header-index">
			<ul class="home-header-hlist">
				<li>
					<img src="../assets/images/rexiao.png" alt="rexiao">
					<span>热销榜</span>
				</li>
				<li>
					<img src="../assets/images/caidan.png" alt="rexiao">
					<span>点过的菜</span>
				</li>
				<li>
					<img src="../assets/images/sousuo.png" alt="sousuo">
					<span>搜你喜欢</span>
				</li>
			</ul>
		</div>
		<aside class="home-left-nav" ref="leftNav">
			<ul class="left-nav-list" >
				<li v-for="(item, key) in productList" :key="key" @click="screenJump(key)">
					<span>{{item.title}}</span>
				</li>
			</ul>
			<div class="left-nav-btn" ref="leftNavBtn">
				<img src="../assets/images/menu.png" alt="menu">
				<span>菜单</span>
			</div>
		</aside>
		<div class="home-conent">
			<div class="home-conent-category" v-for="(items, key) in productList" :key="key">
				<h2 class="home-content-title" ref="itemDOM">{{items.title}}</h2>
				<ul class="home-content-list">
					<li v-for="(item, key) in items.list" :key="key">
						<router-link :to="'/detail?id='+item._id">
							<div class="content-list-inner">
								<img :src="api+item.img_url" :alt="item.img_url">
								<span >{{item.title}}</span>
								<span >￥{{item.price}}元</span>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="layer" ref="layer"></div>
		<v-footerNav/>
		<router-link to="/cart">
			<div class="cart-order">
				<img src="../assets/images/cart.png" alt="cart"/>
				<span>购物车</span>
				<div class="addcart" v-show="cartNum">{{cartNum}}</div>
			</div>
		</router-link>	
	</div>
</template>
<script>
	import axios from 'axios';
	import Config from '../assets/api/config';
	import footerNav  from '../componets/FooterNav';
	import storage from '../localstorage/index';
	export default{
		data() {
			return {
				productList: [],
				show: true,
				cartNum: 0,
				api: Config.api,
				roomid: storage.get('roomid')
			}
		},
		sockets:{
			addcart: function() {
				this.getCartCount() // 接收广播并更新数量提示红点
			}
		},
		methods: {
			showLeftNav() { // 左面导航栏显示开关
				let leftNav = this.$refs.leftNav;
				let leftNavBtn = this.$refs.leftNavBtn;
				let layer = this.$refs.layer;
				layer.onclick = leftNavBtn.onclick = () => {
					if (this.show) {
						leftNav.className = "home-left-nav show";
						layer.className = "layer show";
						this.show = false;
					} else {
						leftNav.className = "home-left-nav";
						layer.className = "layer";
						this.show = true;
					}
				}
			},
			getProductList() { // 获取菜品列表
				let api = this.api + 'api/productlist';
				axios.get(api).then(res => {
					this.productList = res.data.result;
				}).catch( err => {
					console.log(err)
				})
			},
			screenJump(key) { // 点击菜单名跳转到对应页面位置
				let itemDOM = this.$refs.itemDOM;
				let leftNav = this.$refs.leftNav;
				let layer = this.$refs.layer;
				document.documentElement.scrollTop = itemDOM[key].offsetTop;
				leftNav.className = "home-left-nav";
				layer.className = "layer";
				this.show = true;
			},
			getCartCount() { // 获取购物车里面的总数量
				let api = this.api + 'api/cartCount?uid='+this.roomid
				axios.get(api).then(res => {
					this.cartNum = res.data.result;
					console.log(res)
				}).catch(err => {
					console.log(err);
				})
			}
		},
		mounted() {
			this.getProductList();
			this.showLeftNav();
			this.getCartCount();
		},
		components: {
			"v-footerNav": footerNav
		}
	}
</script>
<style lang="scss" scoped>

/*头部*/ 
.home-header-index{
	width: 96%;
	height: 4rem;
	display: flex;
	margin: .5rem auto;
	background: #fff;
	border-radius: .25rem;
	.home-header-hlist {
		width: 100%;
		display:flex;
		li {
			flex: 1;
			border-right: 1px solid #eee;
			display: flex;
			justify-content: center;
			text-align: center;
			flex-direction: column;
			img{
				width: 2rem;
				height: 2rem;
				margin: 0 auto;
				padding-bottom: .5rem;
			}
			&:last-child{
				border-right:none;
			}
		}
	}
}

/*内容区*/ 
.home-conent-category{
	padding: .5rem 0;
	text-align:center;
	.home-content-title{
		font-size: 1.2em;
		font-weight: bold;
		color: #777;
	}
	.home-content-list{
		margin-top: .5rem;
		display: flex;
		flex-wrap: wrap;
		li{
			width: 33.33%;
			box-sizing: border-box;
			padding: .25rem;
			
			.content-list-inner{
				background: #fff;
				border-radius: .25rem .25rem 0 0;
				line-height: 1rem;
				overflow: hidden;
				img{
					height:4rem;
					width: 100%;
				}
				span{
					display: block;
					text-align:left;
					padding-left: .5rem;
				}
			}
		}
	}
}

/*左边导航栏*/
.home-left-nav{
	width: 4rem;
	height: 100%;
	position: fixed;
	top:0;
	left: 0;
	background: #eee;
	box-sizing: border-box;
	padding: .5rem .25rem;
	transition: all 1s;
	transform: translate(-100%, 0);
	z-index: 3;
	&.show{
		transform: translate(0, 0);
	}
	.left-nav-list{
		text-align:center;
		li{
			height: 2rem;
			line-height: 2rem;
			border-bottom: 1px solid #999;
		}
	}
	.left-nav-btn{
		position: absolute;
		left: 4rem;
		top: 40%;
		background: rgba(0, 0, 0, .8);
		padding: .25rem;
		box-sizing: border-box;
		text-align: center;
		border-radius: 0 50% 50% 0;
		z-index: 3;
		img{
			width: 2rem;
			height: 2rem;
		}
		span {
			color: #fff;
		}
	}
}

//遮掩层
.layer{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0, 0, 0, .8);
	z-index: 2;
	display: none;
	&.show {
		display: block;
	}
}



</style>