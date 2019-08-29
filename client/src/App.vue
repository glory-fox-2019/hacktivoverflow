<template>
  <div>
    <Navbar />
      <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style>
body {
  background: url('./assets/bg.png')
}
button:hover, .ui.label:hover {
  cursor: pointer;
}
</style>
