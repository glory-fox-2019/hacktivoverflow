<template>
  <div class="home">
    <Navbar/>/
    <!-- <Ask></Ask> -->
    <BasePage/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';
// import Ask from '@/components/CreateQuestion.vue';
import BasePage from '@/components/BasePage.vue';

export default {
  name: 'home',
  components: {
    Navbar,
    BasePage,
  },
};
</script>
