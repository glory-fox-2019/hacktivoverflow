<template>
<div style="display:flex; flex-direction: column;">
    <h3>Question by : {{ oneQuestion.user && oneQuestion.user.username }}</h3>
    <div style="margin-bottom: 100px; margin-top: 20px;">
        <Card :question="oneQuestion" :status="'voteQuestion'"></Card>
    </div>
    <h5>Answers: {{ oneQuestion.answer && oneQuestion.answer.length }}</h5>
    <div class="border-top">
        <Card :question="answer" v-for="answer in oneQuestion.answer" :key="answer._id" :status="'voteAnswer'"></Card>
    </div>
    <div style="margin-top: 50px; margin-bottom: 60px; display: flex; flex-direction: column; width: 100%;">
        <h4 style="margin: 0; margin-bottom: 10px;">Your Answer</h4>
        <b-form-group
          label="Title:"
          label-for="input-1"
          style="width: 100%">
          <b-form-input
            id="input-1"
            type="text"
            v-model="form.title"
            placeholder="Insert Title here.."></b-form-input>
        </b-form-group>
        <wysiwyg id="wysiwyg" v-model="form.answer"></wysiwyg>
        <b-button style="width: 20%; margin-top: 20px;" variant="success" @click.prevent="submitAnswer">Submit</b-button>
    </div>
</div>
</template>

<script>
import Card from '../components/Card'
import { mapState } from 'vuex'
export default {
    components: {
        Card
    },
    data() {
        return {
            answer: '',
            form: {
                answer: '',
                title: ''
            }
        }
    },
    methods: {
        submitAnswer () {
            const payload = {
                title: this.form.title,
                description: this.form.answer,
                question: this.$route.params.id
            }
            this.$store.dispatch('createAnswer', payload)
            this.form.answer = ''
            this.form.title = ''
        }
    },
    created() {
        this.$store.dispatch('findOneQuestion', this.$route.params.id)
    },
    computed: {
        ...mapState(['oneQuestion'])
    }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>