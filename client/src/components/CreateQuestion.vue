<template>
<!-- <p>masuk</p> -->
<div>
  <Navbar/>
  <Form/>
</div>

  
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Form from '@/components/formQuestion.vue';
export default {
  data() {
    return {

    }
  },
  components: {
    Navbar,
    Form,
  },
};
</script>

<style>

</style>