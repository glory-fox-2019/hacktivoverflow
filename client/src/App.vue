<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { mapActions } from 'vuex'

export default {
  components: { Nav, Footer },
  created () {
    this.checkLogin()
  },
  methods: {
    ...mapActions(['checkLogin'])
  }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
@import './assets/style.scss';
</style>
