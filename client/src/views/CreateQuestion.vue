<template>
<div>
    <b-form-group
      label="Title:"
      label-for="input-1"
      style="width: 100%">
      <b-form-input
        id="input-1"
        type="text"
        required
        v-model="form.title"
        placeholder="Insert Title here.."></b-form-input>
    </b-form-group>
    <wysiwyg id="wysiwyg" v-model="form.description"></wysiwyg>
    <b-button style="width: 20%; margin-top: 20px;" variant="success" @click.prevent="submitQuestion">Submit</b-button>
</div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
        submitQuestion () {
            const payload = {
                title: this.form.title,
                description: this.form.description
            }
            this.$store.dispatch('createQuestion', payload)
        }
    }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>