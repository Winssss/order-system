<template>
	<div id="start" class="start">
		<div class="loading" v-show="showLoading">
			<img src="../assets/images/loading.gif" alt="loading" />
			<p>页面加载中，请耐心等待</p>
		</div>
		<div class="start-content" v-show="!showLoading">
			<header class="start-title">
				<img class="start-title-pic" src="../assets/images/tableware.png" alt="tableware" />
				<span>用餐人数</span>
			</header>
			<p class="start-notice">
				请选择正确的用餐人数，小儿马上给您送餐具
			</p>
			<div class="start-user">
				<ul class="start-user-list" ref="userList">
					<li  v-for="(item, key) in list" :class='{"active":key==0}' :key="key">
						<span>{{item}}</span>
					</li>
				</ul>
			</div>
			<div class="start-remark">
				<input type="text" placeholder="请输入您的口味要求, 忌口等(可不填)" class="start-remark-input" v-model="p_mark"/>
			</div>
			<div class="start-remark">
				<ul class="start-remark-list" ref="remarkList">
					<li class="active">
            <span>打包带走</span>
          </li>
					<li>
            <span>微辣</span>
          </li>
					<li>
            <span>中辣</span>
          </li>
          <li>
            <span>菊花辣</span>
          </li>
				</ul>
			</div>
			<div class="start-submit" @click="submitData()">
				<span>开始点菜</span>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import Config from "../assets/api/config";
	import storage from '../localstorage/index';

	export default{
		data() {
			return {
				p_num: '1人',
				p_mark: '',
				list: [],
				peopleInfoList: [],
				roomid: storage.get('roomid'),
				api: Config.api,
				showLoading: true
			}
		},
		methods: {
			changeUserActive() { // 操作用餐人数 DOM树，改变按钮高亮
				let userList = this.$refs.userList.children;
				for (let i=0; i<userList.length; i++) {
					userList[i].onclick = (e) => {
						for(let i=0; i<userList.length; i++) {
							userList[i].className=" ";
						}
						userList[i].className="active";
						this.p_num=e.target.innerText;
					}
				}
			},
			changeRemarkActive() {  // 操作remark DOM树，改变按钮高亮
				let remarkList = this.$refs.remarkList.children;
				for (let i=0; i<remarkList.length; i++) {
				remarkList[i].onclick = (e) => {
					for(let i=0; i<remarkList.length; i++) {
						remarkList[i].className=" ";
					}
					remarkList[i].className="active";
					this.p_mark+= " " + e.target.innerText;
					}
				}
			},
			renderUserNum() {  // 渲染点餐人数按钮
				for (let i=0; i<12; i++) {
					this.list.push((i+1)+"人")
				}
			},
			submitData() { // 保存用餐人数和口味要求到服务器
				let api = this.api + 'api/addPeopleInfo';
				axios.post(api, {
					uid: this.roomid,
					p_num: this.p_num,
					p_mark: this.p_mark
				}).then(res => {
				if (res.data.success) {
					this.$router.push({path: 'home'})
				}
				}).catch(err=>{
					console.log(err)
				})
			},
			getPeopleInfoList() { // 获取用餐信息
				let api = this.api+'api/peopleinfoList?uid='+this.roomid;
				axios.get(api).then(res=>{
					this.showLoading = false;
					// 如果当前桌号已有人扫描，直接跳转到菜单页
					if (res.data.result.length > 0){
						this.$router.push({path: 'home'});
					}
				}).catch(err => {
					console.log(err);
				})
			}
		},
		created() {
			this.getPeopleInfoList();
		},
		mounted() {
			this.renderUserNum();
			// 待DOM树加载完毕再调用以下方法
			this.$nextTick(() => {
				this.changeUserActive();
				this.changeRemarkActive()
			})
		}
	}
</script>
<style lang="scss" scoped>
	.start-content{
		width: 100%;
		height: 100%;
		.start-title {
			width: 6rem;
			height: 2rem;
			line-height: 2rem;
			margin: 2rem auto;
			text-align: center;
			background: #000;
			border-radius: .5rem;
			display: flex;
			.start-title-pic{
				width: 1.5rem;
				height: 1.5rem;
				margin: .25rem .5rem 0 .5rem;
			}
			span{
				color: #fff;
			}
		}
		.start-notice{
			color: red;
			text-align:center;
			margin-bottom: .5rem;
		}
		.start-user, .start-remark{
			.start-user-list, .start-remark-list{
				display: flex;
				flex-wrap: wrap;
				li{
					width: 25%;
					box-sizing:border-box;
					padding: .25rem;
					span {
						width: 100%;
						display: block;
						border: 1px solid #eee;
						border-radius: .5rem;
						text-align: center;
						line-height: 2rem;
						background: #fff;
					}
				}
				li.active{
					span{
						background: red;
						color: #fff;
					}
				}
			}
		}
		.start-remark{
			margin: .5rem 0;
			text-align:center;
			box-sizing: border-box;
			.start-remark-input {
				width: 92%;
				height: 1.5rem;
				border: 1px solid #eee;
				border-radius: .25rem;
				padding: 0 .5rem;
			}
		}
		.start-submit{
			width: 3rem;
			height: 3rem;
			background: red;
			position: fixed;
			left: 50%;
			margin-left: -1.5rem;
			bottom: 2.5rem;
			border-radius: 50%;
			span{
				display: inline-block;
				width:50%;
				text-align: center;
				line-height: .8rem;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #fff;
			}
		}
	}
	.loading {
		position: fixed;
		top: 50%;
		left: 50%;
		text-align: center;
		transform: translate(-50%, -50%);
	}
</style>