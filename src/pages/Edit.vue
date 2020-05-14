<template>
  <div id="edit">
   <div class="edit-content">
			<header class="edit-title">
				<img class="edit-title-pic" src="../assets/images/tableware.png" alt="tableware" />
				<span>修改用餐人数</span>
			</header>
			<p class="edit-notice">
				请选择正确的用餐人数
			</p>
			<div class="edit-user">
				<ul class="edit-user-list" ref="userList">
					<li  v-for="(item, key) in list" :class='{"active":key==parseInt(p_num)-1}' :key="key">
						<span>{{item}}</span>
					</li>
				</ul>
			</div>
			<div class="edit-remark">
				<input type="text" placeholder="请输入您的口味要求, 忌口等(可不填)" class="edit-remark-input" v-model="p_mark"/>
			</div>
			<div class="edit-remark">
				<ul class="edit-remark-list" ref="remarkList">
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
			<div class="edit-btn" >
				<div class="edit-cancle" @click="cancelEditing()">取消修改</div>
        <div class="edit-confirm" @click="updataPeopleInfoList()">确定修改</div>
			</div>
		</div>
  </div>
</template>
<script>
  import axios from 'axios';
  import Config from '../assets/api/config';
  import storage from '../localstorage/';
  export default {
    data() {
      return{
        api: Config.api,
        list:[],
        p_num: "",
        p_mark: "",
        roomid: storage.get('roomid')
      }
    },
    methods: {
      renderUserNum() {  // 渲染点餐人数按钮
        for (let i=0; i<12; i++) {
          this.list.push((i+1)+"人")
        }
      },
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
      getPeopleInfoList() { // 获取用餐信息
        let api = this.api+'api/peopleinfoList?uid='+this.roomid;
        axios.get(api).then(res=>{
          this.p_num = res.data.result[0].p_num;
          this.p_mark = res.data.result[0].p_mark;
        }).catch(err => {
          console.log(err);
        })
      },
      updataPeopleInfoList() {//保存用餐信息
        let api = Config.api + 'api/addPeopleInfo';
        axios.post(api, {
          uid: this.roomid,
          p_num: this.p_num,
          p_mark: this.p_mark
        }).then(res => {
        if (res.data.success) {
          // 添加购物车时广播消息
          this.$router.push({path: 'cart'})
        }
        }).catch(err=>{
          console.log(err)
        })
      },
      cancelEditing() { // 取消修改
        this.$router.push({path: 'cart'});
      }
    },
    mounted() {
      this.renderUserNum();
      this.$nextTick(() => {
        this.changeUserActive();
        this.changeRemarkActive();
        this.getPeopleInfoList();
      })
    }
  }
</script>
<style lang="scss" scoped>
	.edit-content{
		width: 100%;
		height: 100%;
		.edit-title {
			width: 6.5rem;
			height: 2rem;
			line-height: 2rem;
			margin: 2rem auto;
			text-align: center;
			background: #000;
			border-radius: .5rem;
			display: flex;
			.edit-title-pic{
				width: 1.5rem;
				height: 1.5rem;
				margin: .25rem .5rem 0 .5rem;
			}
			span{
				color: #fff;
			}
		}
		.edit-notice{
			color: red;
			text-align:center;
			margin-bottom: .5rem;
		}
		.edit-user, .edit-remark{
			.edit-user-list, .edit-remark-list{
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
		.edit-remark{
			margin: .5rem 0;
			text-align:center;
			box-sizing: border-box;
			.edit-remark-input {
				width: 92%;
				height: 1.5rem;
				border: 1px solid #eee;
				border-radius: .25rem;
				padding: 0 .5rem;
			}
		}
  }
  // 底部按钮
  .edit-btn{
    position: fixed;
    width: 10rem;
    height: 2rem;
    bottom: 20%;
    left: 50%;
    margin-left: -5rem;
    display: flex;
    text-align: center;
    justify-content: space-between;
    line-height: 2rem;
    .edit-cancle{
      height: 100%;
      width: 4.5rem;
      background: lightpink;
      border-radius: .5rem;
    }
    .edit-confirm{
      height: 100%;
      width: 4.5rem;
      background: lightgreen;
      border-radius: .5rem;
    }
  }
</style>
