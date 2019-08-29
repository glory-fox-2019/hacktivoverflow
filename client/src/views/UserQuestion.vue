<template>
<div>
    <h3 style="text-align: center; margin-bottom: 10px;">Your Question</h3>
    <div>
        <Question v-for="question in questions" :key="question._id" style="margin-top: 3px;" :question="question" :status="true"></Question>
    </div>
</div>
</template>

<script>
import Question from '../components/Question.vue'
import { mapState } from 'vuex'
export default {
    components: {
        Question
    },
    computed: {
        ...mapState(['questions'])
    },
    created () {
        this.$store.dispatch('userQuestion')
    }
}
</script>

<style>

</style>