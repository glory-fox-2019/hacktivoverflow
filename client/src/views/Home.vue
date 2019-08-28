<template>
  <v-container grid-list-md>
  <v-layout row justify-space-between>
    <v-flex md2 flex-start>
        <SideBar/>
    </v-flex>
    <v-flex md10>
        <router-view/>
    </v-flex>
  </v-layout> 
  </v-container>
</template>

<script>
import SideBar from '../components/SideBar'
export default {
    name: 'home',
    components: {
        SideBar,
    },
    created() {
        this.$store.dispatch('getQuestions')      
    }
}
</script>

<style>

</style>