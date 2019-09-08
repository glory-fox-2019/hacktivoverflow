<template>
  <div class="card flex-col mt-3" style="width:100%;">

          <!-- <router-link :to="'/question/'+question._id" > -->
          <div class="" style="display:flex;justify-content:row">
          <div class="ml-2 mr-2 mt-4" style="width:18%">
          <div ><i class="fas fa-arrow-up"></i></div>
          <p>{{totalVotes(question)}}</p>
          <div ><i class="fas fa-arrow-down"></i></div>
          </div>
          <div @click="gotoQuestionDetail" class="card-body">
          <h5 class="card-title">{{question.title}}</h5>
          <br>
          <p class="card-text text-justify">{{question.description}}</p>
          <p style="font-size:13px">by {{question.UserId.username}}</p>
          <p style="font-size:13px">{{getDate}}</p>
          <!-- <p>on  -->
              </div>
          </div>
          <!-- </router-link> -->
          <div v-if="isUser" class="card-footer" style="display-flex;justify-content:space-around;">

             <div class="row">
            <div class="col-3">

            </div>

             <div class="col-8">
                  <button v-if="isUser"  @click="isQuestionModalActive = true" class="btn btn-warning">edit</button> |||

                 <button @click="deleteQuestion"    v-if="isUser" class="btn btn-warning">delete</button>
            </div>
             </div>
        </div>

              <!-- Form untuk edit modal      -->

  <b-modal title="Submit your answer" id="modal-Edit" v-model="isQuestionModalActive">
      <!-- <h4>Input your answer for this question</h4> -->
      <b-form @submit.prevent="editQuestion" id="EditQuestionForm">
        <b-form-group label="Enter your title" label-for="title">
          <b-form-input type="text" v-model="formEditQuestion.title"  :value="question.title" required></b-form-input>
        </b-form-group>
        <b-form-group label="question" label-for="description">
           <textarea v-model="formEditQuestion.description" placeholder="answer" class="form-control" rows="3" ></textarea>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" data-dismiss="modal" type="submit" form="EditQuestionForm">Confirm</b-button>
      </div>
    </b-modal>

        </div>

</template>

<script>
export default {
  name: 'card',
  props: {
    question: Object,
    isUser: Boolean
  },
  data () {
    return {
      isQuestionModalActive: false,
      formEditQuestion: {
        title: this.question.title,
        description: this.question.description
      }

    }
  },
  methods: {

    upvote (QuestionID) {
      let id = QuestionID
      this.$store.dispatch('Upvote', id)
    },
    downvote (QuestionID) {
      let id = QuestionID
      this.$store.dispatch('Downvote', id)
    },
    gotoQuestionDetail () {
      this.$router.push(`/question/${this.question._id}`)
    },
    editQuestion () {
      let title = this.formEditQuestion.title
      let description = this.formEditQuestion.description
      let id = this.question._id
      this.$store.dispatch('editQuestion', { title, description, id })
        .then(() => {
          this.isQuestionModalActive = false
        })
    },
    deleteQuestion () {
      let id = this.question._id

      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then(result => {
          if (result.value) {
            this.$store.dispatch('deleteQuestion', id)
          }
        })
    },
    totalVotes (question) {
      return question.upvotes.length - question.downvotes.length
    }

  },
  computed: {
    getDate () {
      return new Date(this.question.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  mounted () {

  }

}
</script>

<style>

</style>
