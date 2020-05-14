import Vue from 'vue'
import App from './App.vue'
import storage from './localstorage';

// 配置路由
import router from './router';


// 获取URL传过来的桌号
var roomid = window.location.href.split('=')[1];
storage.set('roomid', roomid);


// 配置socket.io
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  connection: 'http://a.itying.com?roomid='+roomid
}))

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
