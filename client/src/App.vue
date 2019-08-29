<template>
  <div id="app">
    <TopHeader></TopHeader>
    <section id="content-container">
      <div id="title-page">
        <h1>Top Questions</h1>
      </div>
      <div id="content">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue'
export default {
  name: 'app',
  components: {
    TopHeader
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.commit('login', localStorage.getItem('username'))
    }
  }
}
</script>

<style lang="scss">

@import '@/assets/style'

</style>
