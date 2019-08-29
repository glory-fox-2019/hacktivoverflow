<template>
  <v-card class="pa-2" outlined tile>
    <v-list-item>
      <v-list-item-content @click="all" class="sidemenu">All Questions</v-list-item-content>
    </v-list-item>
     <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content @click="mine" class="sidemenu">My Questions</v-list-item-content>
    </v-list-item>
    <br>
    <br>
    <v-card>
      <h3>Top Questions this week</h3>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{top1.title}}
          </v-list-item-title>
          <v-list-item-subtitle>total votes {{top1.vote}} </v-list-item-subtitle>
          <v-list-item-subtitle>posted by:  {{top1.name}} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{top2.title}}
          </v-list-item-title>
          <v-list-item-subtitle>total votes {{top2.vote}} </v-list-item-subtitle>
          <v-list-item-subtitle>posted by:  {{top2.name}} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{top3.title}}
          </v-list-item-title>
          <v-list-item-subtitle>total votes {{top3.vote}} </v-list-item-subtitle>
          <v-list-item-subtitle>posted by:  {{top3.name}} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-card>
</template>

<script>
import axios from 'axios'
const url = 'http://localhost:3000'
export default {
  name: 'sidebar',
  data() {
    return{
      top1: {},
      top2: {},
      top3: {}
    }
  },
  methods: {
    all() {
      this.$store.dispatch('getQuestions')
      this.$router.push('/home/all')
    },

    mine() {
      this.$store.dispatch('getQuestions')
      this.$router.push('/home/mine')
    }
  },

  created() {
    axios.get(`${url}/top`)
    .then(({data}) => {
      this.top1 = data[0],
      this.top2 = data[1],
      this.top3 = data[2]
    })
    .catch(console.log)
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