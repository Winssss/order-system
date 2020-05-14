<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './assets/scss/reset.scss';
import './assets/scss/basic.scss';
export default {

  data () {
    return {
      msg: 'hello'
    }
  }
}
</script>

