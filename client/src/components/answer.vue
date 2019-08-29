<template>
  <div class="card flex-col mt-3" style="width:100%">
    <!-- <router-link :to="'/question/'+question._id" > -->
    <div class="" style="display:flex;justify-content:row">
      <div class="ml-2 mr-2 mt-4" style="width:18%">
          <div @click="upvote(theanswer)"><i class="fas fa-arrow-up"></i></div>
          <p>{{totalVotes()}}</p>
          <div @click="downvote(theanswer)"><i class="fas fa-arrow-down"></i></div>
          </div>
    <div class="card-body">
      <h5 class="card-title">{{theanswer.title}}</h5>
      <p class="card-text text-justify">{{theanswer.description}}</p>
      <p style="font-size:13px">{{theanswer.UserId.username}}</p>
      <p style="font-size:13px">{{getDate(theanswer.createdAt)}}</p>
      <!-- <p>on  -->
    </div>
    </div>
    <div v-if="isUser" class="card-footer" style="display-flex;justify-content:space-around;"> 
             
             <div class="row">
            <div class="col-3">
                
            </div> 
             
             <div class="col-8">
                  <button v-if="isUser"  @click="isEditModalActive = true" class="btn btn-warning">edit</button> |||
            
                 <button  v-if="isUser" @click="deleteAnswer" class="btn btn-warning">delete</button>
            </div>
             </div>
        </div>
    <!-- </router-link> -->
  <!-- Form untuk edit modal -->

     <b-modal title="Submit your answer" id="modal-Edit" v-model="isEditModalActive" >
      <!-- <h4>Input your answer for this question</h4> -->
      <b-form @submit.prevent="editAnswer" id="editFormForm">
        <b-form-group label="Enter your title" label-for="title">
          <b-form-input v-model="formEditAnswer.title" type="text"   required></b-form-input>
        </b-form-group>
        <b-form-group label="answer" label-for="description">
           <textarea  v-model="formEditAnswer.description"   class="form-control" rows="3"  ></textarea>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" data-dismiss="modal" type="submit" form="editFormForm">Confirm</b-button>
      </div>
    </b-modal>   






  </div>
</template>

<script>
export default {
  name: "answer",
  props: {
    theanswer: Object,
    isUser : Boolean,
  },
  data(){
    return{
      isEditModalActive : false,
      formEditAnswer : {
        title : this.theanswer.title,
        description : this.theanswer.description
      }

    }
  },

  methods: {

    totalVotes(){

      return this.theanswer.upvotes.length - this.theanswer.downvotes.length

    },
    editAnswer(){

      let payload = this.formEditAnswer
      payload.id = this.theanswer._id
      this.$swal.showLoading()
      this.$store.dispatch("editAnswer",payload)
      .then(()=>{
        this.isEditModalActive = false
      })

    },
    deleteAnswer(){

      let id = this.theanswer._id

      this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
      })
      .then(result=>{
        if(result.value){
          this.$store.dispatch("deleteAnswer", id)
        }
      })

    }
  ,
    upvote(answer) {
      let id = answer._id
      let QuestionId = answer.QuestionId
      let payload = {id,QuestionId}
      this.$store.dispatch("upvoteAnswer", payload);
    },
    downvote(answer) {
      let QuestionId = answer.QuestionId
      let id = answer._id
      let payload = {QuestionId,id}
      this.$store.dispatch("downvoteAnswer", payload);
    },

    getDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }
};
</script>

<style>
</style>
