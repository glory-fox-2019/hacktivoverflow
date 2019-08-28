<template>
  <div class="home container">
    <loginRegisterForm v-if="!$store.state.isLogin"></loginRegisterForm>
    <div v-if="$store.state.isLogin" class="container-fluid">
        <div class="row mt-4">
            <div class="col">
         
            </div>
        </div>
        <div class="row">
            <div class="col-8" style="border:2px solid black">

                <div class="content-section">
                  <div class="row" style="display:flex;justify-content:space-around;">
                <div>
                    <h2>all question</h2>
                </div>
                <div> 
                  <button @click="isQuestionModalActive = true"  class="btn btn-warning">create new Question</button>
                </div>

                  </div>
                    
                    <cardList></cardList>
                </div>
            </div>
            <sidebar></sidebar>
        </div>
    </div>

  <!-- Form untuk create question -->
  <b-modal title="Submit your answer" id="modal-create" v-model="isQuestionModalActive">
      <!-- <h4>Input your answer for this question</h4> -->
      <b-form @submit.prevent="createQuestion" id="createQuestionForm">
        <b-form-group label="Enter your title" label-for="title">
          <b-form-input type="text" v-model="formcreateQuestion.title" placeholder="title" required></b-form-input>
        </b-form-group>
        <b-form-group label="answer" label-for="description">
           <textarea v-model="formcreateQuestion.description" placeholder="answer" class="form-control" rows="3" ></textarea>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" data-dismiss="modal" type="submit" form="createQuestionForm">Confirm</b-button>
      </div>
    </b-modal>




  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import loginRegisterForm from '@/components/LoginRegisterForm.vue'
import sidebar from "@/components/sidebar.vue"
// import card from '@/components/card.vue'
import cardList from '@/components/cardList'
export default {
  name: 'home',
  components: {
    HelloWorld,
    loginRegisterForm,
    cardList,
    sidebar
  },
  data(){
    return{
      isQuestionModalActive : false,
      formcreateQuestion : {
        title : "",
        description : ""
      }

    }
  }
  ,

  methods : {
    createQuestion(){
      this.$store.dispatch("createQuestion", this.formcreateQuestion)
      this.isQuestionModalActive = false

    }

  },
  computed : {



    

  },
  mounted(){
  

  },

  created(){

    if (localStorage.getItem("token")){
      this.$store.commit("LOGIN_STATUS", true)
    }
    else{
      this.$store.commit("LOGIN_STATUS", false)
    }

  }


}
</script>
