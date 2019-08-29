<template>
    <div class="card" style="width:95%">
        <div class = "card mb-4" style="background-color : rgba(218, 216, 216, 0.198)">
            <div class = "row">
                <div class = "col-sm mr-5 mb-5 ml-5 mt-5">
                    <div class = "card mb-4">
                        <div class = "card-body">
                            <input type="text" placeholder = "Title..." style="width : 100%; height: 40px; text-align:left" v-model="inputTitle">
                        </div>
                    </div>
                    <div class = "card mb-2">
                        <div class = "card-body">
                            <wysiwyg v-model="inputContent" style="text-align:left"></wysiwyg>
                        </div>

                    </div>

                    <div class = "card mb-4">
                        <div class = "card-body">
                            <input type="submit" value = "Update Your Answer" style="width : 100%; height: 40px; background-color:rgb(255, 116, 0); color:white" v-on:click = "editPost">
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
  
</template>

<script>
import axios from 'axios'
const baseUrl = "http://localhost:3000/api"
export default {
    created () {
        axios.get(baseUrl + '/answers/' + this.$route.params.id)
        .then(({ data }) => {
        console.log(data);
          this.inputTitle = data.title
          this.inputContent = data.description
          this.QuestionId = data.QuestionId
        })
        .catch(err => {
          console.log(err)
        })
    },
    data () {
        return{
            inputTitle: '',
            inputContent: '',
            QuestionId: ''
        }
    },
    methods: {
        editPost () {
            this.$store.dispatch('editAnswer',{id:this.$route.params.id, data: {title: this.inputTitle, description: this.inputContent}})
            this.$router.push('/'+this.QuestionId)
        }
    }

}
</script>

<style>

</style>