<template>
  <div id="boxFormAnswer">
    <div class="card" style="padding: 20px">
      <froala :tag="'textarea'" :config="config" v-model="content" ></froala>
      <b-button style="margin: 20px" type="is-info"
        @click.prevent="submit()"
      >
        submit
      </b-button>

    </div>
  </div>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';
import axios from 'axios'

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
      content: ''
    }
  },
  methods:{
    submit(){
      const payload = {
        content : this.content
      }
      axios({
          method: 'POST',
          url: `${this.$store.state.server}/answers/${this.$route.params.id}`,
          headers: {
              access_token: localStorage.getItem('access_token')
          },
          data: payload,
      })
      .then(({data})=>{
          this.$store.dispatch('getAllPosts')
          this.content=""
          this.$buefy.snackbar.open({
              message: 'Thank you for answering. Your Answer has been posted',
              type: 'is-info',
              position: 'is-top',             
          })
      })
      .catch(err=>{
          this.$buefy.snackbar.open({
              message: 'Something went wrong, please try again later',
              type: 'danger',
              position: 'is-top',             
          })
      })
    },
    
  }
}
</script>

<style>
#boxFormAnswer{
    box-shadow: 0 0 20px #86608E 
}
</style>