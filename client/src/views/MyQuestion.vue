<template>
  <div>
    <!-- ===== Modal Edit Question ===== -->
    <div>
      <b-modal size="xl" class="modal" ref="modal-edit-question" id="modal-edit-question" title="Edit Post" hide-footer hide-header>
        <div class="modal-body">
          <div class="container-fluid">
            <h5 class="mb-4">Edit Post</h5>
            <form @submit.prevent="submitEditQuestion()" class="form d-flex flex-column">
              <input v-model="edit.title" type="text" placeholder="Input title" class="form">
              <tags-input element-id="tags"
              v-model="tags"
              class="form">
              <!-- :existing-tags="available"
              :typeahead="true"> -->
              </tags-input>
              <b-form-textarea
                id="textarea"
                v-model="edit.content"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                class="form">
              </b-form-textarea>
        
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>            
          </div>
        </div>
      </b-modal>
    </div>

    <!-- <input v-model="search" class="form-control mr-sm-2 mb-2" type="search" placeholder="Search your post by title..."
      aria-label="Search"> -->
    <div v-for="question in questions" :key="question._id" class="card mb-3">
      <div class="row">
        <div class="col-sm-12">
          <div class="card-body">
            <!-- <h5 class="card-title author">{{question.UserId.name}}</h5> -->
            <h5 class="card-title title">{{question.title}}</h5>
            <h5 class="card-title content">{{question.content}}</h5>
            <div class="d-flex">
              <p v-for="(tag) in question.tags" :key="tag._id" class="tagName mr-3">{{tag.name}}</p>
            </div>

            
            <div class="d-flex">
              <a class="moment mr-2">{{question.updatedAt | moment('from')}}</a>
              <a class="moment mr-2"> | By: {{question.UserId.name}}</a>
              <a class="moment mr-2"> | Total Reply: {{question.AnswerId.length}}</a>
              <!-- <a @click="questionDetails(question._id)" class="nav-font mr-2"> &#128220; See full version </a> -->
            </div>
            <div class="text-right">
              <a @click.prevent="detail(question._id)" class="nav-font mr-2"> &#128220; See full version </a>
              <a @click.prevent="editQuestion(question._id)" class="nav-font mr-2"> &#10000; Edit </a>
              <a @click.prevent="deleteQuestion(question._id)" class="nav-font"> &#128465; Delete</a>
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
  components: {
    'tags-input': VoerroTagsInput
  },
  data(){
    return {
      search: '',
      edit: {
        _id: '',
        title: '',
        content: '',
        tags: []
      },
      tags: []
    }
  },
  methods: {
    detail(id){
        this.$router.push(`/post/${id}`)
    },
    editQuestion(id){
      ax({
        url: `/questions/detail/${id}`,
        method: `get`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.edit._id = data._id
          this.edit.title = data.title
          this.edit.content = data.content
          let arr = []
          for (let value of data.tags){
            arr.push({
              key: value.name,
              value: value.name
            })
          }
          this.tags = arr
          this.$refs['modal-edit-question'].show()
          
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    submitEditQuestion(){
      console.log('masuk submit edit', this.edit._id)
      let arr = []
      for (let i=0; i<this.tags.length; i++){
        arr.push(this.tags[i].value)
      }
      this.edit.tags = arr
      ax({
        url: `/questions/${this.edit._id}`,
        method: `patch`,
        data: this.edit,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          console.log(data)
          this.myQuestion()
          this.$store.dispatch('listTag')
          this.$refs['modal-edit-question'].hide()
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Question Updated',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    deleteQuestion(id){
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
            url: `/questions/${id}`,
            method: `delete`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({data})=>{
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Post deleted',
                showConfirmButton: false,
                timer: 1500
              })
              this.myQuestion()
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      })
      
    },
    myQuestion(){
      this.$store.dispatch('myQuestion')
    }
  },
  created(){
    this.myQuestion()
  },
  computed: {
    questions () {
      return this.$store.state.myQuestion
    }
  },
}
</script>

<style scoped>
  h5{
    font-family: 'Oswald', sans-serif;
  }
  .form{
    border: none !important;
    background-color: transparent !important;
    outline: none !important;
    text-align: left !important;
    border-bottom: 1px solid rgb(165, 165, 165) !important;
    margin-bottom: 10px !important;
    font-family: 'Roboto Condensed', sans-serif !important;
  }
  .author{
    font-family: 'Anton', sans-serif;
  }
  .title{
    font-family: 'Oswald', sans-serif;
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
    font-size: 15px;
    font-family: 'Oswald', sans-serif;
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