<template>
<div>
    <Question v-for="question in questions" :key="question._id" style="margin-top: 3px;" :question="question" :status="false"></Question>
</div>
 
</template>

<script>
import Question from '../components/Question.vue'
import { mapState } from 'vuex'
export default {
    components: {
        Question
    },
    created() {
        this.$store.dispatch('fetchQuestion')
    },
    computed: {
        ...mapState(['questions'])
    }
}
</script>

<style scoped>

</style>