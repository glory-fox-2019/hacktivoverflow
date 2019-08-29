<template>
<div>
    <div>
        <b-button type="is-info" @click.prevent="posting()">ASK A QUESTION</b-button>
    </div>
    <div v-if="isPosting">
        <div id="boxForm" class="box" style="margin-top:20px">
            <b-input v-model="title" placeholder="Question Title... "></b-input>

            
            <froala :tag="'textarea'" :config="config" v-model="content" ></froala>
            <b-field label="Add some Tags">
                <b-taginput
                    v-model="tags"
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
                <b-button @click.prevent="cancel()" type="is-info">Cancel</b-button>
                <b-button @click.prevent="submitQuestion()" type="is-primary">Post the Question</b-button>

            </div>
        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios'
import VueFroala from 'vue-froala-wysiwyg';

export default {
  name: 'questionForm',
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
        isPosting: false,
        content: '',
        title: '',
        tags: [],

    }
  },
  methods:{
        getFilteredTags(text) {
            this.filteredTags = this.data.filter((option) => {
                return option
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        },
        posting(){
            this.isPosting = !this.isPosting
        },
        cancel(){
            this.isPosting =false
        },
        submitQuestion(){
            const payload = {
                title: this.title,
                tags: this.tags,
                content: this.content,
            }
            axios({
                method: 'POST',
                url: `${this.$store.state.server}/questions`,
                data: payload,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data})=>{
                this.title =""
                this.tags =[],
                this.content =""
                this.isPosting= false
                this.$store.dispatch('getAllPosts')                
                this.$buefy.snackbar.open({
                    message: 'Your Question has been posted',
                    type: 'is-info',
                    position: 'is-top',             
                })
            })
            .catch(err=>{
                this.title =""
                this.tags =[],
                this.content =""
                this.$buefy.snackbar.open({
                    message: 'Something went wrong, please try again later',
                    type: 'danger',
                    position: 'is-top',             
                })
            })
        }
  }
}
</script>

<style>
    #boxForm{
        box-shadow: 0 0 20px #86608E 
    }
</style>