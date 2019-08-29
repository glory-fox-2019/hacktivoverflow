<template>
  <div class="form">
    <form @submit.prevent="postAnswer">
      <div class="input-grup">
        <label for="answer">Your Answer:</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          v-model="answer">
        </textarea>
      </div>
      <div class="input-grup">
        <button type="submit" class="btn primary">POST</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '@/api/server.js'

export default {
  name: 'FormAnswer',
  data() {
    return {
      answer: ''
    }
  },
  methods: {
    postAnswer() {
      axios.post('/answer/create', {
        content: this.answer,
        question: this.$route.params.id
      },{
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }
  }
}
</script>

<style scoped>

.form{
  border-bottom: 1px solid rgb(179, 179, 179);
  padding: 20px;
  margin-bottom: 20px;
}
.input-grup{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.input-grup button{
  align-self: flex-start;
}
.input-grup label{
  font-weight: bold;
}
.input-grup textarea{
  padding: 10px;
  font-size: 14pt;
}

</style>