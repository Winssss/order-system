<template>
  <div id="detail">
    <router-link to="/home">
      <div class="detail-back">
        <span>返回</span>
      </div>
    </router-link>
    <div class="detail-content" >
      <img :src="api+detail.img_url" alt="pic">
      <div class="detail-content-des">
        <h2>{{detail.title}}</h2>
        <span>￥{{detail.price}}/份</span>
      </div>
    </div>
    <div class="detail-des">
      <h3>商品详情</h3>
      <p v-html="detail.content" class="detail-des-content"></p>
    </div>
    <div class="footerbar-wrapper">
      <span>数量：</span>
      <div class="footerbar-count">
        <div class="count-des" @click="numDes()">-</div>
        <input type="text" readonly="readonly" class="count-input" v-model="num">
        <div class="count-inc" @click="numInc()">+</div>
      </div>
      <div class="footbar-addcart" @click="addProductToCart()">
        <span>加入购物车</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Config from '../assets/api/config';
  import axios from 'axios';
  import storage from '../localstorage/index';
  export default {
    data() {
      return {
        detail: [],
        api: Config.api,
        num: 1,
        roomid: storage.get('roomid')
      }
    },
    methods:{
      getProductDetail(id) { //获取商品详情
        let api = this.api+'api/productcontent?id='+id;
        axios.get(api).then(res => {
          this.detail = res.data.result[0];
        }).catch(err => {
          console.log(err)
        })
      },
      numDes() {
        if (this.num>1){
            --this.num
        }
      },
      numInc() {
       ++this.num
      },
      addProductToCart() { // 将菜品添加到购物车
        let api = this.api+'api/addcart';
        axios.post(api, {
          uid: this.roomid,
          title:this.detail.title,
          price:this.detail.price,
          num:this.num,
          product_id:this.detail._id,
          img_url: this.detail.img_url,
        }).then(res=>{
          if (res.data.success) {
            this.$router.push({path: 'cart'})
            this.$socket.emit('addcart', 'addcart')
          }
        }).catch(err => {
          console.log(err)
        });
      }
    },
    mounted() {
      let id = this.$route.query.id;
      this.getProductDetail(id);
    }

  }
</script>
<style lang="scss" scoped>
  .detail-back {
    position: fixed;
    top: .5rem;
    left: .5rem;
    width: 2.8rem;
    height: 2.8rem;
    background: rgba(0, 0, 0, .8);
    text-align: center;
    line-height: 2.8rem;
    border-radius: 50%;
    span {
      color: #fff;
    }
    &::before{
      content: '';
      display: inline-block;
      width: .5rem;
      height: .5rem;
      border-left: 1px solid #fff;
      border-bottom: 1px solid #fff;
      transform: rotate(45deg);
    }
  }
  .detail-content{
    width: 100%;
    height: 15rem;
    background: #fff;
    img{
      width: 100%;
      height: 80%;
    }
    .detail-content-des{
      padding: .5rem;
      h2{
        font-size: 1.5em;
        font-weight: bold;
        color: #777;
        margin-bottom: .5rem;
      }
      span {
        color: red;
      }
    }
  }
  .detail-des{
    width: 100%;
    background: #fff;
    margin-top: 1rem;
    padding: .5rem;
    box-sizing: border-box;
    h3{
      font-size: 1.17em;
      font-weight: bold;
      margin-bottom: .25rem;
    }
    .detail-des-content{
      line-height: .8rem;
      text-indent: 1.2rem;
    }
  }
  .footerbar-wrapper{
    width: 100%;
    height: 3rem;
    background: #fff;
    position: fixed;
    bottom:0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem;
    box-sizing: border-box;
    span {
      display: block;
      font-weight: bold;
    }
    .footerbar-count{
      display: flex;
      width: 10rem;
      
      margin: 0 .7rem;
      input{
        flex: 1;
        height: 1.5rem;
        width: 4rem;
        border-left: none;
        border-right: none;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding: 0;
        text-align: center;
      }
      .count-des,.count-inc{
        height: 1.5rem;
        width: 4rem;
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
</style>