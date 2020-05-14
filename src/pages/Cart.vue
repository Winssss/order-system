<template>
  <div id="Cart">
    <div class="cart-header" v-if="list.length">
      <h3 class="cart-header-title">购物车</h3>
      <div class="cart-header-des-top">
        <div class="des-top-left">
          <span>用餐人数：{{peopleInfoList.p_num}}</span>
          <span>备注：{{peopleInfoList.p_mark}}</span>
        </div>
        <div class="des-top-right">
          <router-link to="/edit">
            <img src="../assets/images/edit.png" alt="edit">
            <span>修改</span>
          </router-link>
        </div>
      </div>
      <div class="cart-header-des-bottom">
        <p>您的购物车有：共有{{totalNum}}个菜</p>
        <p>合计：<span class="des-bottom-price">￥{{totalPrice}}元</span></p>
      </div>
    </div>
    <div class="cart-list" v-if="list.length">
      <ul>
        <li class="cart-list-item" v-for="(item, key) in list" :key="key">
          <div class="item-left">
            <img :src="api+item.img_url" alt="2">
            <div class="item-left-des">
              <p>{{item.title}}</p>
              <p class="left-des-price">￥{{item.price}}元</p>
            </div>
          </div>
          <div class="item-right">
            <div class="item-right-count">
              <div class="count-des" @click="numDes(item, key)">-</div>
              <input type="text" readonly="readonly" class="count-input" v-model="item.num">
              <div class="count-inc" @click="numInc(item)">+</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-hot">
      <h2>本店顾客最常点的菜</h2>
      <div class="cart-hot-wrapper">
        <ul class="cart-hot-list">
          <li>
            <div class="inner">
                <img src="../assets/images/1.jpg" />
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
            </div>
          </li>
          <li>
            <div class="inner">
                <img src="../assets/images/2.jpg" />
                <p class="title">家乡扣肉</p>
                <p class="price">¥26</p>
            </div>
          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/3.jpg" />
              <p class="title">主打鸡</p>
              <p class="price">¥26</p>
            </div>
          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/4.jpg" />
              <p class="title">酸辣土豆丝</p>
              <p class="price">¥26</p>
            </div>
          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/5.jpg" />
              <p class="title">家乡腊肉</p>
              <p class="price">¥26</p>
            </div>
          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/6.jpg" />
              <p class="title">长沙臭豆腐</p>
              <p class="price">¥26</p>
            </div>
          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/7.jpg" />
              <p class="title">主打鸡</p>
              <p class="price">¥26</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-notice" v-if="!list.length">
      <span>购物车空空如也，请点击菜单开始下单</span>
    </div>
    <v-footerbarnav/>
    <router-link to="/home">
      <div class="menu-btn">
        <img src="../assets/images/menu.png" alt="菜单" />
        <span>继续点餐</span>
      </div>
    </router-link>
    <div class="cart-order" @click="submitOrder()">
      <img src="../assets/images/doorder.png" alt="下单" />
      <span>下单</span>
    </div>
  </div>
</template>
<script>
  import FooterbarNav from '../componets/FooterNav';
  import Config from '../assets/api/config';
  import axios from 'axios';
  import storage from '../localstorage/';

  export default {
    data() {
      return {
        count: 1,
        api: Config.api,
        list: [],
        totalNum: 0,
        totalPrice: 0,
        peopleInfoList: [],
        roomid: storage.get('roomid')
      }
    },
    sockets: {
      addcart: function(){
        this.getCartList() //接收广播并更新购物车数据
      }
    },
    methods:{
      getCartList() { // 获取购物车列表
        let api = this.api + 'api/cartlist?uid='+this.roomid;
        axios.get(api).then(res => {
          this.list=res.data.result;
          this.getTotalResult();
        }).catch(err => {
          console.log(err)
        })
      },
      getTotalResult() { // 计算总价钱和总下单数
        let allPrice = 0;
        let totalNum = 0;
        for(let i=0; i<this.list.length; i++) {
          totalNum += parseInt(this.list[i].num);
          allPrice += parseFloat(this.list[i].price * this.list[i].num);
        }
        this.totalNum = totalNum;
        this.totalPrice = allPrice;
      },
      numDes(item, key) { // 商品减量
        let api = this.api+'api/decCart?uid='+this.roomid+'&product_id='+item.product_id+'&num='+item.num
        axios.get(api).then(res => {
          if (res.data.success) {
            this.$socket.emit('addcart', 'addcart'); // 商品减量时广播消息
            this.getTotalResult();
          }
        }).catch(err => {
          console.log(err)
        })
        if (item.num>1){
            --item.num
        } else {
          this.list.splice(key, 1)
        }
      },
      numInc(item) { // 商品增量
        let api = this.api+'api/incCart?uid='+this.roomid+'&product_id='+item.product_id+'&num='+item.num
        axios.get(api).then(res => {
          if (res.data.success) {
            this.$socket.emit('addcart', 'addcart'); // 商品增量时广播消息
            this.getTotalResult();
          }
        }).catch(err => {
          console.log(err)
        })
        ++item.num
      },
      getPeopleInfoList() { // 获取用餐信息
        let api = this.api+'api/peopleinfoList?uid='+this.roomid;
        axios.get(api).then(res=>{
          this.peopleInfoList = res.data.result[0];
        }).catch(err => {
          console.log(err);
        })
      },
      submitOrder() { // 提交所有下单信息
        let api = this.api+'api/addOrder';
        let uid = this.roomid,
            p_num = this.peopleInfoList.p_num,
            p_mark = this.peopleInfoList.p_mark,
            order = JSON.stringify(this.list),
            total_price = this.totalPrice,
            total_num = this.totalNum;
        axios.post(api, {
          uid,
          p_num,
          p_mark,
          order,
          total_price,
          total_num
        }).then(res => {
          if (res.data.success) {
            this.$router.push({path: 'order'});
          }
        }).catch(err => {
          console.log(err)
        }) 
      }
    },
    components:{
      "v-footerbarnav": FooterbarNav,
    },
    mounted() {
      this.getCartList();
      this.getPeopleInfoList()
    }
  }
</script>

<style lang="scss" scoped>
  /* 头部 */
  .cart-header{
    width: 95%;
    margin: 1rem auto;
    background: #fff;
    padding: .5rem;
    box-sizing: border-box;
    border-radius: .5rem;
    .cart-header-title {
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      padding-bottom: .5rem;
      color: #999;
    }
    .cart-header-des-top {
      width: 100%;
      padding: .5rem 0;
      border-top: 1px solid #999;
      display: flex;
      .des-top-left{
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        span:nth-child(1){
          color: red;
          font-size: .8rem;
        }
      }
      .des-top-right{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        img{
          height: 1.5rem;
          width: 1.5rem;
          margin-bottom: .25rem;
        }
      }
    }
    .cart-header-des-bottom{
      border-top: 1px solid #999;
      padding-top: .5rem;
      line-height: 1.5rem;
      p{
        font-size: .8rem;
      }
      p:nth-child(1){
        color: blue;
      }
      .des-bottom-price{
        color: red; 
        font-size: 1rem;
        font-weight: bold;
      }
    }
  }
  .cart-notice{
    width: 95%;
    height: 5rem;
    line-height: 5rem;
    margin: 1rem auto;
    text-align: center;
  }
  /* 商品列表 */
  .cart-list{
    width: 95%;
    margin: 1rem auto;
    background: #fff;
    padding: .5rem;
    box-sizing: border-box;
    border-radius: .5rem;
    .cart-list-item {
      display: flex;
      align-items: center;
      padding: .5rem 0;
      border-bottom: 1px solid #eee;
      .item-left{
        width: 65%;
        display: flex;
        line-height: 1.2rem;
        img{
          width: 3rem;
          height: 3rem;
          margin-right: .25rem;
          border-radius: .25rem;
        }
      }
      .item-right{
        flex:1; 
        .item-right-count{
          display: flex;
          width: 100%;
          .count-input{
            height: 1.5rem;
            width: 2rem;
            border-left: none;
            border-right: none;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            padding: 0;
            text-align: center;
          }
          .count-des,.count-inc{
            height: 1.5rem;
            width: 1.8rem;
            line-height: 1.5rem;
            text-align: center;
            border: 1px solid #eee;
            font-size: 1rem;
            font-weight: bold;
            color: red;
          }
        }
        .footbar-addcart{
        width: 4rem;
        height: 2rem;
        line-height: 2rem;
        background: red;
          text-align: center;
        border-radius: .5rem;
        span{
          color: #fff;
          }
        }
      }
    }
  }
  /* 最常点的菜 */
  .cart-hot {
    width: 95%;
    margin: 1rem auto 3.5rem;
    background: #fff;
    padding: .5rem;
    box-sizing: border-box;
    border-radius: .5rem;
    
    h2{
      font-size: 1.5em;
      margin: 0 0 .5rem .5rem;
    }
    .cart-hot-wrapper{
       overflow-x: auto;
      .cart-hot-list{
        width: 2.9rem;
        display: flex;
        .inner{
          margin-right: .6rem;
          border-radius: .5rem .5rem 0 0;
          overflow: hidden;
          line-height: 1rem;
          img {
            width: 4rem;
            height: 4rem;
          }
        }
      }
    }
  }
</style>