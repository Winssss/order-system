<template>
  <div id="pay">
    <div class="pay-header">
    <div class="header-top">
      <h2 class="header-title">已下单的菜</h2>
      <div class="header-top-bottom">
        <p>桌号：{{list.uid}}</p>
        <p>人数：{{list.p_num}}</p>
        <p>下单事件：{{add_time}}</p>
      </div>
    </div>
    <p class="header-bottom">已点菜品份：<span>{{list.total_price}}元</span></p>
    </div>
    <div class="pay-list">
      <h3>菜品详情：</h3>
      <ul>
        <li class="pay-list-item" v-for="(item, key) in list.items" :key="key">
          <p>{{item.title}}</p>
          <p>{{item.num}}份</p>
          <p class="left-des-price">￥{{item.price}}元</p>
        </li>
      </ul>
    </div>
    <!-- 支付功能，后台还在开发当中 -->
    <div class="pay-methods-btn">
      <div class="pay-methods-wechat">
        <i class="iconfont">&#xe689;</i>
        <span>微信支付</span>
      </div>
      <div class="pay-methods-alipay">
        <i class="iconfont">&#xe68a;</i>
        <span>支付宝</span>
      </div>
    </div>
    <v-footerbarnav/>
    <router-link to="/home">
      <div class="menu-btn">
        <img src="../assets/images/menu.png" alt="菜单" />
        <span>继续点餐</span>
      </div>
    </router-link>
  </div>
</template>
<script>
  import FooterbarNav from '../componets/FooterNav';
  import axios from 'axios';
  import Config from '../assets/api/config';
  import storage from '../localstorage/index';
  import jutils from 'jutils-src';

  export default {
    data() {
      return {
        list: [],
        api: Config.api,
        roomid: storage.get('roomid'),
        add_time:''
      }
    },
    methods:{
      getOrder() { // 获取下单信息
        let api = this.api + 'api/getOrder?uid='+this.roomid;
        axios.get(api).then(res => {
          this.list = res.data.result[0];
          this.timestampToTime(this.list.add_time)
        }).catch(err => {
          console.log(err)
        })
      },
      timestampToTime(timestamp){ // 将下单时间戳转换成时间格式
        console.log(timestamp)
        this.add_time = jutils.formatDate(new Date(timestamp*1000), "MM-DD HH:ii:ss")
      }
    },
    components:{
      "v-footerbarnav": FooterbarNav,
    },
    mounted() {
      this.getOrder();  
    }
  }
</script>
<style lang="scss" scoped>
  /*头部*/
  .pay-header{
    width: 95%;
    margin: 1rem auto;
    background: #fff;
    padding: .5rem;
    box-sizing: border-box;
    border-radius: .5rem;
    .header-title{
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      padding: .25rem 0 1rem;
      border-bottom: 1px solid #eee;
    }
    .header-top-bottom{
      padding-top: .5rem;
      display: flex;
      padding-bottom: .5rem;
      text-align: left;
      p:nth-child(1), p:nth-child(2){
        flex:1;
      }
      p:nth-child(3){
        width: 50%;
      }
    }
    .header-bottom{
      font-size: .8rem;
      font-weight: bold;
      padding-bottom: .5rem;
      span{
        color: red;
        font-size: .9rem;
      }
    }
  }
  
  /* 中间内容区 */
  .pay-list{
    width: 95%;
    margin: 1rem auto;
    background: #fff;
    padding: .5rem;
    box-sizing: border-box;
    border-radius: .5rem;
    h3 {
      font-size: .8rem;
      font-weight: bold;
      padding-bottom: .5rem;
    }
    ul {
      border-top: 1px solid #eee;
      .pay-list-item{
        margin-top: .5rem;
        display: flex;
        font-size: .7rem;
        p:nth-child(1){
          width: 70%;
          text-indent: .25rem;
        }
        p:nth-child(2),p:nth-child(3){
          flex:1;
        }
      }
    }
  }
  .menu-btn {
    left: auto !important; 
    margin-left: 0 !important;
    right: .5rem !important;
  }

  /* 支付按钮 */
  .pay-methods-btn{
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
    .pay-methods-alipay{
      height: 100%;
      width: 4.5rem;
      border-radius: .5rem;
      background: lightskyblue;
    }
    .pay-methods-wechat{
      height: 100%;
      width: 4.5rem;
      border-radius: .5rem;
      background: lightgreen;
    }

  }

</style>