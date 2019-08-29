<template>
  <b-col
    cols="12"
    sm="8"
    md="6"
    lg="6"
    offset-sm="2"
    offset-md="3"
    offset-lg="3"
    class="base-create"
  >
    <b-card class="p-3 w-100">
      <h4>Ask a Question</h4>
      <b-alert v-model="errorCreate" variant="danger" dismissible>{{errorMessage}}</b-alert>
      <b-row>
        <b-col cols="12">
          <b-form @submit.prevent="createQuestion"> 
            <b-form-group id="input-group-1" label="Title :" label-for="title">
              <b-form-input
                id="title"
                type="text"
                v-model="form.title"
                required
                placeholder="Enter title"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Description" label-for="description">
              <b-form-textarea
                id="description"
                v-model="form.description"
                required
                placeholder="Enter Description"
                rows="8"
              ></b-form-textarea>
            </b-form-group>
            <b-button variant="success" v-if="!isProc" type="submit">Login</b-button>
            <div class="text-center" v-if="isProc">
              <b-spinner label="Spinning"></b-spinner>
              <b-spinner type="grow" label="Spinning"></b-spinner>
              <b-spinner variant="primary" label="Spinning"></b-spinner>
              <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
              <b-spinner variant="success" label="Spinning"></b-spinner>
              <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-card>
  </b-col>
</template>

<script>
import axios from "../api/config";

export default {
  data() {
    return {
      errorMessage: "Ini Error",
      errorCreate: false,
      isProc: false,
      form: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
    createQuestion() {
      const token = localStorage.getItem("token");
      this.isProc = true;
      const input = this.form;
      axios({
        method: "post",
        url: "/question/create",
        data: input,
        headers: { token }
      })
        .then(({ data }) => {
          this.isProc = false;
          this.makeToast('Sucessfully created','Create','primary')
          this.$router.push(`/question/${data._id}`);
        })
        .catch(err => {
            console.log(err.response)
            this.isProc = false;
            this.errorCreate = true;
            this.errorMessage = err.response.data.message
        });
    },
    makeToast(content,title,variant){
        console.log('make toast')
        this.$bvToast.toast(content, {
            title: title,
            variant: variant,
            solid: true
          });
    }
  }
};
</script>

<style scoped>
.base-create {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: left;
  margin: auto;
}
</style>