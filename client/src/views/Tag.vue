<template>
  <div>
    <!-- <input v-model="search" class="form-control mr-sm-2 mb-2" type="search" placeholder="Search your post by title..."
      aria-label="Search"> -->
    <div v-for="question in tagId" :key="question._id" class="card mb-3">
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
      tags: []
    }
  },
  methods: {
    detail(id){
      this.$router.push(`/post/${id}`)
    },
    myQuestion(){
      // ax({
      //   url: `/tags/find/${this.$route.params.id}`,
      //   method: 'get',
      //   headers: {
      //     token: localStorage.getItem('token')
      //   }
      // })
      //   .then(({data})=>{
      //     console.log(data)
      //     this.tags = data
      //   })
      //   .catch((err)=>{
      //     console.log(err)
      //   })
    }
  },
  created(){
    // this.myQuestion()
  },
  computed: {
    tagId () {
      return this.$store.state.tagId
    }
  },
}
</script>

<style scoped>
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