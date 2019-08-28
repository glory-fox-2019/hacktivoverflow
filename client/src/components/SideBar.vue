<template>
  <v-card class="pa-2" outlined tile>
    <v-list-item>
      <v-list-item-content @click="all" class="sidemenu">All Questions</v-list-item-content>
    </v-list-item>
     <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content @click="mine" class="sidemenu">My Questions</v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'sidebar',
  methods: {
    all() {
      this.$router.push('/home/all')
    },

    mine() {
      this.$router.push('/home/mine')
    }
  }
};
</script>

<style scoped>
.sidemenu{
  cursor:grab
}

.sidemenu:hover{
  color: brown;
  transition: 0.5s all;
}
</style>