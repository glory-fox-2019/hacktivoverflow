<template>
<div>

  <!-- ===== Modal Edit Answer ===== -->
  <div>
    <b-modal size="xl" class="modal" ref="modal-edit" id="modal-edit" title="Edit Reply" hide-footer >
      <div class="modal-body">
        <div class="container-fluid">
          <form @submit.prevent="submitEdit()" class="form d-flex flex-column">
            <b-form-textarea
              id="textarea"
              v-model="edit.content"
              placeholder="Enter something..."
              rows="3"
              max-rows="6">
            </b-form-textarea>

            <button type="submit" class="btn btn-primary mt-2" style="width: 20%">Submit</button>
          </form>
          
        </div>
      </div>
    </b-modal>
  </div>

  <div class="card">
    <!-- <div class="card-header">
      Featured
    </div> -->
    
    <div class="card-body">
      <h5 class="title card-title">{{question.title}}</h5>
      <a class="moment">By: {{question.UserId.name}} | </a>
      <a class="moment">{{question.updatedAt | moment('from')}}</a>
      <p class="content card-text mt-4">{{question.content}}</p>


    <div class="mt-4">
      <h5 class="title card-title">Reply</h5>
      <form @submit.prevent="answerQuestion()" class="form d-flex flex-column">
        <b-form-textarea
          id="textarea"
          v-model="answer.content"
          placeholder="Enter something..."
          rows="3"
          max-rows="6">
        </b-form-textarea>

        <button type="submit" class="btn btn-primary mt-2" style="width: 20%">Submit</button>
      </form>
    </div>

      <div class="card-body">
        <!-- <h5 class="card-title">Reply</h5>
        <p class="card-text">{{question.content}}</p> -->
        <div v-for="answer in question.AnswerId" :key="answer._id" class="card mb-3">
          
          <div class="row">

            <div class="line col-sm-2 d-flex flex-column justify-content-center">
              <b-input-group class="d-flex flex-column justify-content-center align-items-center">
                <b-input-group-append>
                  <a @click.prevent="upvotes(answer._id)" class="vote">&#x02C4;</a>
                  <!-- <b-btn type="submit" @click="upvote(question._id)" variant="outline-secondary">&#8679;</b-btn> -->
                </b-input-group-append>

                <a>{{answer.upvotes.length - answer.downvotes.length}}</a>
                <!-- <b-btn variant="outline-secondary">{{question.upvotes.length - question.downvotes.length}}</b-btn> -->
              
                <b-input-group-prepend>
                  <a @click.prevent="downvotes(answer._id)" class="vote">	&#x02C5;</a>
                  <!-- <b-btn type="submit" @click="downvote(question._id)" variant="outline-secondary">&#8681;</b-btn> -->
                </b-input-group-prepend>
              </b-input-group>
            </div>

            <div class="col-sm-9">

              <div class="card-body">    
                <div class="d-flex flex-column">
                  <a class="moment">{{answer.UserId.name}}</a>
                  <a class="moment-sub">{{answer.updatedAt | moment('from')}}</a>
                  <!-- <a @click="questionDetails(question._id)" class="nav-font mr-2"> &#128220; See full version </a> -->
                </div>
                <h5 class="card-title content mt-3">{{answer.content}}</h5>
                
                <div class="text-right">
                  <a v-if="$store.state.loginEmail == answer.UserId.email" @click.prevent="editAnswer(answer._id)" class="nav-font mr-2"> &#10000; Edit </a>
                  <a v-if="$store.state.loginEmail == answer.UserId.email" @click.prevent="deleteAnswer(answer._id)" class="nav-font"> &#128465; Delete</a>
                </div>
              </div>
            </div>

          </div>

        </div>
        
      </div>
 
    </div>
  </div>

  
</div>
</template>

<script>
import ax from '../../config/axios'
import Swal from 'sweetalert2'

export default {
  data(){
    return {
      question: {
        UserId : {}
      },
      answer: {
        content: ''
      },
      edit: {
        _id: '',
        content: ''
      },
    }
  },
  methods: {
    editAnswer(id){
      ax({
        url: `/answers/find/${id}`,
        method: `get`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.edit._id = data._id
          this.edit.content = data.content
          this.$refs['modal-edit'].show()
        })
        .catch((err)=>{
          console.log(err)
        })
      
    },
    submitEdit(){
      console.log('masuk edit', this.edit._id)
      ax({
        url: `/answers/${this.edit._id}`,
        method: `patch`,
        data: this.edit,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.$refs['modal-edit'].hide()
          this.refresh()
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Reply editted',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    deleteAnswer(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          ax({
            url: `/answers/${id}`,
            method: `delete`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({data})=>{
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Login success',
                showConfirmButton: false,
                timer: 1500
              })
              this.refresh()
            })
            .catch((err)=>{
              console.log(err)
            })

        }
      })
    },
    upvotes(id){
      ax({
        url: `/answers/upvotes/${id}`,
        method: `post`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.refresh()
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    downvotes(id){
      ax({
        url: `/answers/downvotes/${id}`,
        method: `post`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.refresh()
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    refresh(){
      ax({
        url: `/questions/detail/${this.$route.params.id}`,
        method: `get`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          // console.log(data)
          this.answer.console = ''
          this.question = data
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    answerQuestion(){
      ax({
        url: `/answers/create/${this.$route.params.id}`,
        method: `post`,
        data: this.answer,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.refresh()
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Reply created',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err)=>{
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${(err.response.data.message)}`,
          })
          
        })
    }
  },
  created(){
    this.refresh()
    console.log('======',this.$store.state.loginEmail)
  }
}
</script>

<style scoped>
  .line{
    border: none;
    background-color: transparent;
    outline: none;
    text-align: center;
    /* border-bottom: 1px solid rgb(165, 165, 165);
    margin-bottom: 10px; */
    font-family: 'Roboto Condensed', sans-serif;
  }
  .vote{
    font-size: 30px;
    font-family: 'Righteous', cursive !important;
    cursor: pointer !important;
    transition: 0.2s !important;
    color: black !important;
  }
  .vote:hover{
    font-family: 'Oswald', sans-serif;
    cursor: pointer;
    font-weight: bold;
    font-size: 33px;
    color: #6AC9EC;
  }
  .author{
    font-family: 'Anton', sans-serif;
  }
  .title{
    font-family: 'Oswald', sans-serif;
    font-size: 32px
  }
  .content{
    font-family: 'Roboto Condensed', sans-serif;
  }
  .tagName {
    background-color: bisque;
    padding: 0 15px;
    border-radius: 10px
  }
  .moment{
    color: black !important;
    font-size: 20px;
    font-family: 'Oswald', sans-serif;
  }
  .moment-sub{
    color: black !important;
    font-size: 13px;
    font-family: 'Roboto Condensed', sans-serif;
  }
  .nav-font {
    font-family: 'Righteous', cursive !important;
    cursor: pointer !important;
    transition: 0.2s !important;
    color: black !important;
  }
  .nav-font:hover {
    font-family: 'Oswald', sans-serif;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    color: #6AC9EC;
  }
</style>