<template>
  <v-col cols="12">
    <v-card-text>
      <v-card class="pa-5">
        <v-row>
          <v-col id="left" cols="1" class="pa-0 d-flex flex-column">
          <v-icon large color="blue-grey lighten-3">expand_less</v-icon>
            <h2 class="text-center">80</h2>
            <v-icon large color="blue-grey lighten-3">expand_more</v-icon>
          </v-col>
          <v-col cols="11">
            <v-card-title class="pt-0">Answer title</v-card-title>
            <v-card-text>Answer content</v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-card-text>
  </v-col>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  #left .v-icon:nth-child(1):hover, 
  #left .v-icon:nth-child(3):hover {
    cursor: pointer;
    color: rgb(46, 46, 46) !important;
  }
</style>
