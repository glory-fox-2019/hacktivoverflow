<template>
<div>
    <div>
        <div style="margin-top:20px">
            <b-input v-model="editForm.title" placeholder="Question Title... "> </b-input>

            
            <froala :tag="'textarea'" :config="config" v-model="editForm.content" ></froala>
            <b-field label="Add some Tags">
                <b-taginput
                    v-model="editForm.tags"
                    :data="filteredTags"
                    autocomplete
                    :allow-new="allowNew"
                    field="user.first_name"
                    icon="label"
                    placeholder="Add a tag"
                    @typing="getFilteredTags"
                    @submit="submitTag()">
                </b-taginput>
            </b-field>
            <div class="level">
                <b-button @click.prevent="submitEdit()" type="is-primary">Submit Edit</b-button>

            </div>
        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios'
import VueFroala from 'vue-froala-wysiwyg';

export default {
  name: 'editForm',
  data () {
    return {
        config: {
            events: {
            'froalaEditor.initialized': function () {
                console.log('initialized')
            }
            }
        },
        filteredTags: [],
        allowNew: true,
        data:[
            'javascript',
            'android',
            'vue',
            'vuex'
        ],
        editForm:{
            id: '',
            content: '',
            title: '',
            tags: [],
        }        
    }
  },
  computed:{
      editQuestion(){
          return this.$store.state.posts.find((e)=>{
                return e._id == this.$route.params.id
           })
      }
  },
  created(){
      this.editForm = {...this.editQuestion}
  }
  ,
  watch:{
      editQuestion(){
          this.editForm = {...this.editQuestion}
      }
  }
  ,
  methods:{
        getFilteredTags(text) {
            this.filteredTags = this.data.filter((option) => {
                return option
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        },
        submitEdit(){
            const payload = {
                title: this.editForm.title,
                tags: this.editForm.tags,
                content: this.editForm.content,
            }
            axios({
                method: 'PATCH',
                url: `${this.$store.state.server}/questions/${this.editForm._id}`,
                data: payload,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data})=>{
                this.$store.dispatch('getAllPosts')
                this.$buefy.snackbar.open({
                    message: 'Your Question has been updated',
                    type: 'is-info',
                    position: 'is-top',             
                }) 
                this.$emit('finish')     
            })
            .catch(err=>{
                this.$buefy.snackbar.open({
                    message: 'Something went wrong, please try again later',
                    type: 'danger',
                    position: 'is-top',             
                })
            })
        }
  },
}
</script>

<style>
    #boxForm{
        box-shadow: 0 0 20px #86608E 
    }
</style>