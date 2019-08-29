<template>
    <div class="card mb-5" style="width:95%">
    <div class = "card mb-4">
      <div class = "card-body">
        <form>
            <input type="search" style = "width:100%; height:40px" placeholder="Search by title..." v-model = "search">
        </form>
      </div>
    </div>
        <questionItem v-for="question in filteredList" :key="question._id" :question="question"/>
    </div>
  
</template>

<script>
import questionItem from '../components/questionItem'
export default {
    components: {
        questionItem
        },
        created () {
            this.$store.dispatch('fetch_question')
        },
        data () {
          return {
            search : ""
          }
        },
        computed: {
        filteredList() {
            return this.$store.state.questions.filter(item => {
               return item.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
      }
}
</script>

<style>

</style>