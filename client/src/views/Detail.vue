<template>
  <v-card class="pa-2" outlined tile>
    <v-list-item class="d-flex justify-space-between">
      <v-list-item-content style="width:100%">
        <v-list-item-title>
          <h2>{{question.title}}</h2>
        </v-list-item-title>

          <p>{{question.content}}</p>

        <v-list-item-subtitle>{{answers.length}} Answers</v-list-item-subtitle>
        <v-list-item-subtitle>posted by: {{question.userId.name}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content class="updown" style="flex:none">
        <i class="far fa-thumbs-up ok" @click="up(question)"></i>
        {{question.upVote.length - question.downVote.length}}
        <i
          class="far fa-thumbs-down ok"
          @click="down(question)"
        ></i>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-content>
        <AddAnswer />
        <h2 class="alist">Answers List</h2>
        <AnswerList v-for="(answer, index) in answers" :key="index" :jawaban="answer" />
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
import AnswerList from '../components/AnswerList'
import AddAnswer from '../components/AddAnswer'
const url = 'http://34.87.27.57'

export default {
  name: 'detailQuestion',
  data () {
    return {
      // question: {},
    }
  },
  computed: mapState(['answers', 'question']),
  components: {
    AnswerList,
    AddAnswer
  },
  methods: {
    up (input) {
      let id = input._id
      let token = localStorage.getItem('token')
      axios
        .patch(`${url}/questions/${id}/upvote`, {}, { headers: { token } })
        .then(({ data }) => {
          this.$store.dispatch('getQuestionDetail', id)
          Swal.fire({
            position: 'top-end',
            type: 'info',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 500
          })
        })
        .catch(console.log)
    },

    down (input) {
      let id = input._id
      let token = localStorage.getItem('token')
      axios
        .patch(`${url}/questions/${id}/downvote`, {}, { headers: { token } })
        .then(({ data }) => {
          this.$store.dispatch('getQuestionDetail', id)
          Swal.fire({
            position: 'top-end',
            type: 'info',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 500
          })
        })
        .catch(console.log)
    }
  },
  created () {
    let id = this.$route.params.id
    this.$store.dispatch('getQuestionDetail', id)
    this.$store.dispatch('getAnswers', id)
  }
}
</script>

<style>
.ok {
  cursor: grab;
}

.alist{
  padding: 20px;
  margin-top: 30px
}

.updown{
    width: 10%;
}

.qdetail{
    width: 80%;
}

</style>
