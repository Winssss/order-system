<template>
  <div id="Order">
    <div class="order-header">
      <div class="header-top">
        <img src="../assets/images/timer.png" alt="timer">
        <div class="header-top-right">
          <h3>{{list.uid}}号卓待门店接单</h3>
          <p>请及时联系服务员确认菜品信息!</p>
        </div>
      </div>
      <p class="header-bottom">已点菜品{{list.total_num}}份：<span>{{list.total_price}}元</span></p>
    </div>
    <div class="order-list">
      <h3>菜品详情：</h3>
      <ul>
        <li class="order-list-item" v-for="(item, key) in list.items" :key="key">
          <p>{{item.title}}</p>
          <p>{{item.num}}份</p>
          <p class="left-des-price">￥{{item.price}}元</p>
        </li>
      </ul>
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

  export default {
    data() {
      return {
        list: [],
        api: Config.api,
        roomid: storage.get('roomid')
      }
    },
    methods:{
      getOrder() { // 获取下单信息
        let api = this.api + 'api/getOrder?uid='+this.roomid;
        axios.get(api).then(res => {
          this.list = res.data.result[0];
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components: {
      "v-footerbarnav": FooterbarNav,
    },
    mounted() {
      this.getOrder()
    }
  }
</script>

<style lang="scss" scoped>
  /*头部*/
  .order-header{
    width: 95%;
    margin: 1rem auto;
    background: #fff;
    padding: .5rem;
    box-sizing: border-box;
    border-radius: .5rem;
    .header-top{
      display: flex;
      padding-bottom: .5rem;
      .header-top-right{
        padding-left: .25rem;
        line-height: 1.5rem;
        h3{
          font-size: .8rem;
          font-weight: bold;
        }
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
  .order-list{
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
      .order-list-item{
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
</style>