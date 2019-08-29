<template>
  <div class="error">
    <p v-for="(error, index) in this.$store.state.errors" :key="index">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>

.error{
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid red;
}
.error p{
  color: red;
}
</style>