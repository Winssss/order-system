<template>
  <div id="footerNav">
    <div class="footerNav-nav" @click="show=!show">
      <img src="../assets/images/navigation.png" alt="navigation">
      <span>导航</span>
    </div>
    <div class="footerNav-nav-show" v-show="show">
      <ul class="footerNav-nav-show-list">
        <li>
          <router-link to="/home">
            <img src="../assets/images/menu.png" alt="menu"/>
            <p>菜单</p>
          </router-link>
        </li>
        <li>
          <router-link to="/cart">
            <img src="../assets/images/cart.png" alt="cart"/>
            <p>购物车</p>
          </router-link>
        </li>
        <li>
          <router-link to="/order">
            <img src="../assets/images/order.png" alt="order"/>
            <p>我的订单</p>
          </router-link>  
        </li>
        <li>
         <router-link to="/pay">
            <img src="../assets/images/wallet.png" alt="wallet"/>
            <p>结账</p>
         </router-link>
        </li>
        <li @click="show=!show">
          <img src="../assets/images/close.png" alt="close"/>
          <p>返回</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      show: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .footerNav-nav{
    position: fixed;
    bottom: .25rem;
    left: .5rem;
    width: 2.8rem;
    height: 2.8rem;
    background: #000;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    img {
      width: 1rem;
      height: 1rem;
      margin-bottom: .25rem;
    }
    span {
      color: #fff;
    }
  }
  .footerNav-nav-show{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 3;
    .footerNav-nav-show-list{
      li{
        position: absolute;
        bottom: .25rem;
        left: .5rem;
        width: 2.8rem;
        height: 2.8rem;
        background: #000;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        img{
          width: 1rem;
          height: 1rem;
          margin-bottom: .1rem;
        }
        p{
          color: #fff;
          font-size: .6rem;
        }
        &:nth-child(1){
          bottom: 6rem;
          left: .25rem;
        }
        &:nth-child(2){
          bottom: 5rem;
          left: 3.1rem;
        }
        &:nth-child(3){
          bottom: 3rem;
          left: 5.5rem;
        }
        &:nth-child(4){
          bottom: .15rem;
          left: 6.5rem;
        }
      }

    }
  }
</style>