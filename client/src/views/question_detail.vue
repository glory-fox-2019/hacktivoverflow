<template>
    <div class="row ml-3 pb-4" style="width:98%">
        <div class= "card pt-3 pl-3 pb-3 " style="width:100%; text-align:left">
            <h3>{{this.$store.state.oneQuestion.title}}</h3>
            <small>Asked at <b>{{this.$store.state.oneQuestion.created_at}}</b> | By <b>{{this.$store.state.oneQuestion.User.name}}</b></small>
            <hr>
            <div v-if="user == this.$store.state.oneQuestion.User._id ">
                <router-link :to="'/edit_question/' + this.$store.state.oneQuestion._id">Edit</router-link> | <a href='#' @click="deleteQuestion()">Delete</a>
                <hr>
            </div>
            <div class = "row">
                <div class="col-sm">
                    <div v-if="user != this.$store.state.oneQuestion.User._id ">
                        <a href="#" @click="upvotesQuestion"><img src="../assets/up-arrow.png" width="50px" height="50px"></a>
                        <center><h2>{{this.$store.state.oneQuestion.upvotes.length - this.$store.state.oneQuestion.downvotes.length}}</h2></center>
                        <a href="#" @click="downvotesQuestion"><img src="../assets/down-arrow.png" width="50px" height="50px"></a>
                    </div>
                    <div v-else>
                        <a href="#" @click="noVotes()"><img src="../assets/up-arrow.png" width="50px" height="50px"></a>
                        <center><h2>{{this.$store.state.oneQuestion.upvotes.length - this.$store.state.oneQuestion.downvotes.length}}</h2></center>
                         <a href="#" @click="noVotes()"><img src="../assets/down-arrow.png" width="50px" height="50px"></a>
                    </div>
                </div>
                <div class="col-sm-11 mr-3" style="text-align:justify">
                    <p v-html="this.$store.state.oneQuestion.description"></p>
                </div>
            </div>
            <hr>
            <h5>{{answers.length}} Answers</h5>
   
            <div class = "row mb-5"  v-for="answer in answers" :key="answer._id">
                <div class="col-sm">
                    <div v-if="answer.User._id != user ">
                        <a href="#" @click="upvotesAnswer(answer._id)"><img src="../assets/up-arrow.png" width="50px" height="50px"></a>
                        <center><h2>{{answer.upvotes.length - answer.downvotes.length}}</h2></center>
                        <a href="#" @click="downvotesAnswer(answer._id)"><img src="../assets/down-arrow.png" width="50px" height="50px"></a>
                    </div>
                    <div v-else>
                        <a href="#" @click="noVotes()"><img src="../assets/up-arrow.png" width="50px" height="50px"></a>
                        <center><h2>{{answer.upvotes.length - answer.downvotes.length}}</h2></center>
                        <a href="#" @click="noVotes()"><img src="../assets/down-arrow.png" width="50px" height="50px"></a>
                    </div>
                </div>
                <div class="col-sm-11 mr-3" style="text-align:justify">
                     <h3>{{answer.title}}</h3>
                    <p v-html="answer.description"></p>
                    <div v-if="answer.User._id == user">
                        <router-link :to="'/edit_answer/' + answer._id">Edit</router-link>
                        <br>
                    </div>
                    <small>Answered at <b>{{answer.created_at}}</b> | By <b>{{answer.User.name}}</b></small>
                </div>
          
            </div>
  
            <hr>
            <h5>Your Answer</h5>
            <input type="text" placeholder = "Title..." class="mb-2" style="width : 95%; height: 40px; text-align:left" v-model="answerTitle">
            <wysiwyg style="width:95%" class="mb-2" v-model="answerDesc"></wysiwyg>
            <input type="submit" value = "Publish Answer" style="width : 95%; height: 40px; background-color:rgb(255, 116, 0); color:white" v-on:click="newAnswer()">
        </div>
    
    </div>
  
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
const baseUrl = 'http://3.15.230.206/api'
export default {
    data () {
        return {
            user: '',
            answerTitle: '',
            answerDesc:'',
            answers: this.$store.state.answers
        }
    },
    created () {
        this.$store.dispatch('findOneQuestion',this.$route.params.id)
        if(localStorage.getItem('UserId')){
            this.user = localStorage.getItem('UserId')
        }
        this.fetchAnswer()
    },
    methods: {
        deleteQuestion () {
            this.$store.dispatch('deleteQuestion',this.$store.state.oneQuestion._id)
            this.$router.push('/')
        },
        newAnswer (id) {
            this.$store.dispatch('createAnswer',{title: this.answerTitle, description: this.answerDesc, QuestionId: this.$route.params.id})
            this.answerTitle = ''
            this.answerDesc = ''
            this.fetchAnswer()
            this.answers= this.$store.state.answers
            this.$router.push('/'+this.$route.params.id)
        },
        fetchAnswer () {
            axios.get(baseUrl + '/answers/all/'+ this.$route.params.id)
            .then(({ data }) => {
                this.answers = data
                console.log(data);
            })
            .catch(err => {
            console.log(err)
            })
        },
        upvotesQuestion () {
            this.$store.dispatch('upvotesQuestion', this.$route.params.id)
        },
        downvotesQuestion () {
            this.$store.dispatch('downvotesQuestion', this.$route.params.id)
        },
        upvotesAnswer (id) {
            axios.patch(baseUrl + '/answers/upvotes/' + id, null, { headers: { token: localStorage.getItem('token') } })
                .then(({ data }) => {
                    Swal.fire({
                        type: 'success',
                        title: `You have been giving upvotes to this post!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.fetchAnswer()
                })
                .catch(err => {
                    Swal.fire({
                        type: 'error',
                        title: `You can only give one vote!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(err)
                })
        },
        downvotesAnswer (id) {
            axios.patch(baseUrl + '/answers/downvotes/' + id, null, { headers: { token: localStorage.getItem('token') } })
                .then(({ data }) => {
                    Swal.fire({
                        type: 'success',
                        title: `You have been giving downvotes to this post!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.fetchAnswer()
                })
                .catch(err => {
                    Swal.fire({
                        type: 'error',
                        title: `You can only give one vote!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(err)
                })
        },
        noVotes() {
            Swal.fire({
                type: 'error',
                title: `Sorry, You can't vote your own post.`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

}
</script>

<style>

</style>