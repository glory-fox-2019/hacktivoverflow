<template>
<div>
  <div style="margin: 20px 200px 40px 200px" class="card">
      
    <header class="card-header">
        <p class="level card-header-title" v-if="!isEditing"> 
        {{question.title}}
        
         <b-button class="level-right" v-if="question.owner._id == $store.state.loggedUser" @click.prevent="edit()" type="is-info">edit</b-button>
         <b-button class="level-right" v-if="question.owner._id == $store.state.loggedUser" @click.prevent="deletePost()" type="is-danger ">delete</b-button>
        </p>
        
    </header>
    <div class="card-content columns"  >

        <div class="column is-2 votes">
            
        
            <div>
                <a>
                    <i v-if="question.upvotes.includes(user)" @click.prevent="upvote()" class="fas fa-arrow-alt-circle-up"></i>
                    <i v-else @click.prevent="upvote()" class="far fa-arrow-alt-circle-up"></i>
                </a>
            </div>
            <span> {{question.upvotes.length -question.downvotes.length}} </span>
            <div>
                <a>
                    <i v-if="question.downvotes.includes(user)" @click.prevent="downvote()" class="fas fa-arrow-alt-circle-down"></i>
                    <i v-else @click.prevent="downvote()" class="far fa-arrow-alt-circle-down"></i>
                </a>
            </div>
        </div>
        <div v-if="isEditing">
            <editForm 
            @finish="finish"
            ></editForm>
            <b-button type="is-danger" @click.prevent="cancel()"> cancel </b-button>
        </div>

        <div v-else class="content column" style="height:100%" >
        <p id="card-content">
           <froalaView v-model="question.content"></froalaView>           
        </p>
        <br>
        <div class="columns is-multiline" >
            <b-taglist v-for="(tag,index) in question.tags" :key="index" attached style="margin:10px">
                <b-tag type="is-primary">#</b-tag>
                <b-tag type="is-dark">{{tag}}</b-tag>
            </b-taglist>
        </div>
        
        </div>
    </div>
    <footer class="card-footer ">
        

        <div class="column">
            <time datetime="2016-1-1">{{date}}</time>
            <div>
                <strong style="color:blue       ">
                    {{question.owner.name}}

                </strong>
            </div>
        </div>

    </footer>
  </div>
  <div class="columns is-vcentered" style="height: 15vh; margin:0 ;">

    <h1 class="column">{{question.answers.length}} Answer(s)</h1>

  </div>
  <div  style="margin: 40px 200px 40px 200px">
    <answerCard 
    v-for="answer in question.answers" 
    :key="answer._id" 
    :answer="answer"
    ></answerCard>
  </div>
  <div v-if="$store.state.loggedUser" class="columns is-vcentered" style="height: 15vh; margin:0;">

    <h1 class="column">Post Your Answer </h1>

  </div>
  <div v-if="$store.state.loggedUser" style="margin: 40px 200px 40px 200px">
      <answerForm></answerForm>
  </div>
  <div class="columns is-vcentered" style="height: 15vh; margin:0;">

    <h1 class="column"></h1>

  </div>
</div>
</template>

<script>
import answerCard from '@/components/answerCard'
import answerForm from '@/components/answerForm'
import editForm from '@/components/editForm'
import axios from 'axios'
export default {
    name: 'detail',
    data(){
        return {
            isEditing: false,
        }
    },
    methods:{
        edit(){
            this.isEditing = true
        },
        cancel(){
            this.isEditing = false
        },
        finish(){
            this.isEditing = false
        },
        deletePost(){
            axios({
                method: 'DELETE',
                url: `${this.$store.state.server}/questions/${this.question._id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data})=>{
                this.$store.dispatch('getAllPosts')
                this.$router.push("/")
            })
            .catch(err=>{
                this.$buefy.snackbar.open({
                    message: 'Something went wrong, please try again later',
                    type: 'danger',
                    position: 'is-top',             
                })
            })
        },
        upvote(){
            axios({
                method: 'PATCH',
                url: `${this.$store.state.server}/questions/upvote/${this.question._id}`,
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
        downvote(){
            axios({
                method: 'PATCH',
                url: `${this.$store.state.server}/questions/downvote/${this.question._id}`,
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
        }
    },
    components:{
        answerCard,
        answerForm,
        editForm
    },
    computed:{
        question(){
            return this.$store.state.posts.find((e)=>{
                return e._id == this.$route.params.id
            })
        },
        date(){
            let dt = new Date(this.question.created_at)
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

<style scoped>
.votes{
    font-size: 25px
}

</style>