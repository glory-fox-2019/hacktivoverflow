<template>
  <div class="card" style="margin: 40px">

  <div class="card-content columns"  >
      <div class="column is-2 votes">
        <div>
            <a>
                <i v-if="answer.upvotes.includes(user)" @click.prevent="upvote()" class="fas fa-arrow-alt-circle-up"></i>
                <i v-else @click.prevent="upvote()" class="far fa-arrow-alt-circle-up"></i>
            </a>
        </div>
        <span> {{answer.upvotes.length - answer.downvotes.length}} </span>
        <div>
            <a>
                <i v-if="answer.downvotes.includes(user)" @click.prevent="downvote()" class="fas fa-arrow-alt-circle-down"></i>
                <i v-else @click.prevent="downvote()" class="far fa-arrow-alt-circle-down"></i>
            </a>
        </div>
    </div>
    <div class="content" style="height:100%" >
      <p id="card-content">
       <froalaView v-model="answer.content"></froalaView> 
      </p>
      
    </div>
  </div>
  <footer class="card-footer level">  
    <div class="column">
        <time datetime="2016-1-1">{{date}}</time>
        <div>
            <strong style="color: blue">
                {{answer.owner.name}}
            </strong>
        </div>
    </div>
    <div style="margin:20px">
        <b-button class="level-right" v-if="answer.owner._id == $store.state.loggedUser" @click.prevent="deleteComment()" type="is-danger ">delete</b-button>
    </div>

  </footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['answer'],
    name: 'answerCard',
    methods:{
        
      upvote(){
        axios({
            method: 'PATCH',
            url: `${this.$store.state.server}/answers/upvote/${this.answer._id}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .then(({data})=>{
          console.log('sukses')
            this.$store.dispatch('getAllPosts')
        })
        .catch(err=>{
            this.$buefy.snackbar.open({
                message: 'Please Log In',
                type: 'danger',
                position: 'is-top',             
            })
        })
      },
      downvote(){
        axios({
            method: 'PATCH',
            url: `${this.$store.state.server}/answers/downvote/${this.answer._id}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .then(({data})=>{
            this.$store.dispatch('getAllPosts')
        })
        .catch(err=>{
            this.$buefy.snackbar.open({
                message: 'Please Log In',
                type: 'danger',
                position: 'is-top',             
            })
        })
      },
      deleteComment(){
        axios({
              method: 'DELETE',
              url: `${this.$store.state.server}/answers/${this.$route.params.id}/${this.answer._id}`,
              headers: {
                  access_token: localStorage.getItem('access_token')
              }
          })
          .then(({data})=>{
              this.$store.dispatch('getAllPosts')
          })
          .catch(err=>{
              this.$buefy.snackbar.open({
                message: 'Something went wrong, please try again later',
                type: 'danger',
                position: 'is-top',             
            })
          })
      }
    }
    ,
    computed:{
        date(){
            let dt = new Date(this.answer.created_at)
            return dt.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })
        },
        user(){
            return this.$store.state.loggedUser
        }
    }
}
</script>

<style>

</style>