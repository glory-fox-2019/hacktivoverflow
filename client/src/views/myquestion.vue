<template>
    <div class="card mb-5" style="width:95%">
        <questionItem v-for="question in this.$store.state.myquestions" :key="question._id" :question="question"/>
    </div>
  
</template>

<script>
import questionItem from '../components/questionItem'
export default {
    components: {
        questionItem
        },
        created () {
            this.$store.dispatch('fetch_myquestion')
        }
}
</script>

<style>

</style>