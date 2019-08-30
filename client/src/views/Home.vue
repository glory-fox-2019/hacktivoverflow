<template>
  <div>
    <!-- <input v-model="search" class="form-control mr-sm-2 mb-2" type="search" placeholder="Discover post by title..."
      aria-label="Search"> -->
    <tags-input element-id="tags"
      v-model="search">
      <!-- :existing-tags="available"
      :typeahead="true"> -->
    </tags-input>
    <div v-for="question in questions" :key="question._id" class="card mb-3 mt-2">
      <div class="row">
        <div class="col-sm-2 d-flex flex-colum justify-content-center">
          <b-input-group class="d-flex flex-column justify-content-center align-items-center">
            <b-input-group-append>
              <a :class="{upvoteColorClass:question.upvotes.includes(UserId)}" @click.prevent="upVote(question._id)" class="vote">&#x02C4;</a>
            </b-input-group-append>

            <a>{{question.upvotes.length - question.downvotes.length}}</a>
            <!-- <b-btn variant="outline-secondary">{{question.upvotes.length - question.downvotes.length}}</b-btn> -->
          
            <b-input-group-prepend>
              <a :class="{downvoteColorClass:question.downvotes.includes(UserId)}" @click.prevent="downVote(question._id)" class="vote">	&#x02C5;</a>
              <!-- <b-btn type="submit" @click="downvote(question._id)" variant="outline-secondary">&#8681;</b-btn> -->
            </b-input-group-prepend>
          </b-input-group>
        </div>

        <div class="col-sm-9">
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
              <a @click="detail(question._id)" class="nav-font mr-2"> &#128220; See full version </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ax from '../../config/axios'

  export default {
    components: {
      'tags-input': VoerroTagsInput
    },
    data(){
      return {
        search: [],
        vote: "",
        num: 0,
        upvoteColor: false,
        downvoteColor: false,
        tags: []
      }
    },
    methods: {
      detail(id){
        this.$router.push(`/post/${id}`)
      },
      getAllQuestion () {
        this.$store.dispatch('getAllQuestion')
      },
      upVote(id){
        console.log('masuk upvote', id)
        if (this.downvoteColor === true){
          this.downvoteColor = false
        }
        else if (this.downvoteColor === false){
          this.upvoteColor = true
        }

        ax({
          url: `/questions/upvotes/${id}`,
          method: 'post',
          headers: {
            token: localStorage.getItem('token')
          }
     
        })
          .then(({data})=>{
            console.log('berhasil')
            this.getAllQuestion()
          })
          .catch((err)=>{
            console.log(err)
          })

      },
      downVote(id){
        console.log('masuk downvote', id)
        if (this.upvoteColor === true){
          this.upvoteColor = false
        }else if (this.upvoteColor === false){
          this.downvoteColor = true
        }

        ax({
          url: `/questions/downvotes/${id}`,
          method: 'post',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data})=>{
            console.log('berhasil')
            this.getAllQuestion()
          })
          .catch((err)=>{
            console.log(err)
          })
  
      }
    },
    computed: {
      questions () {
        return this.$store.state.allQuestion
      },
      checkUpVote(){
        console.log(this.questions)
        let check = this.questions.upvotes.includes(
          localStorage.getItem('_id')
        )
        return check
      },
      UserId() {
        return localStorage.getItem('_id')
      }
    },
    created(){
      this.getAllQuestion()
    },

    watch: {
      search: function (newVal, oldVal) {
        // console.log('ini old val', oldVal, 'ini new val', newVal)
        if (newVal.length>0){
          let arr = []
          for (let value of newVal){
            arr.push(value.value)
          }
          this.tags = arr

          // this.create.tags = arr
          // console.log(arr)
          ax({
            url: `/questions/tag`,
            method: `post`,
            data: this.tags
          })
            .then(({ data }) => {
              this.$store.commit('GETALLQUESTION', data)
              // console.log(data)
    
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          this.getAllQuestion()
        }
      }
    },
  }
</script>

<style scoped>
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
  .upvoteColorClass{
    background-color: red
  }
  .downvoteColorClass{
    background-color: red
  }
</style>