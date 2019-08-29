<template>
    <b-card no-body style="width: 100%; height: 18vh" class="border-top-0 border-left-0 border-right-0 border-dark rounded-0">
    <div v-if="condition" style="margin: 0; display:flex; flex-direction: row-reverse; align-items:center;">
        <i class="fas fa-minus" style="color: red; font-size: 20px; cursor: pointer;" @click.prevent="deleteQuestion(question._id)"></i>
        <i class="fas fa-edit" style="margin-right: 10px; color: green; cursor: pointer;" v-b-modal="`${question._id}`"></i>
    </div>
      <b-row no-gutters class="mt-2">
        <b-col cols="4" style="height: 100%; font-size: 30px; display:flex; justify-content: space-around; align-items: center; color: #676a6b;">
            <div style="height: 100%;">
                <p style="text-align: center; margin: 0; font-size: 15px;">{{ question.totalvotes }}</p>
                <p style="font-size: 15px;">votes</p>
            </div>
            <div style="height: 100%;">
                <p style="text-align: center; margin: 0; font-size: 15px;">{{ question.answer.length }}</p>
                <p style="font-size: 15px;">answers</p>
            </div>
        </b-col>
        <b-col cols="8" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between:">
            <div style="width: 100%;">
                <b-link style="color: #40a8db;" :to="`/dashboard/${question._id}`">{{ question.title }}</b-link>
            </div>
            <div style="width: 100%; color: #676a6b; font-size: 13px; display: flex; flex-direction: row-reverse; margin-top: 30px; ">
                <p style="margin: 0;">by: {{ question.user.username }}</p>
                <p style="margin: 0; margin-right: 10px;">update {{ moment(question.updatedAt).fromNow() }}</p>
            </div>
        </b-col>
      </b-row>
      <b-modal :id="question._id" size="lg" title="Edit Question:">
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
          <template slot="modal-footer">
              <b-button variant="success" style="width: 10%;" @click.prevent="editQuestion(question._id)">Edit</b-button>
          </template>
      </b-modal>
    </b-card>
</template>

<script>
import moment from 'moment'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            moment,
            condition: this.status,
            form: {
                title: this.question.title,
                description: this.question.description
            }
        }
    },
    methods: {
        deleteQuestion (id) {
            Swal.fire({
                title: 'Delete this Question ?',
                text: "You won't be able to revert this!",
                type: 'question',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#1ebf19',
                confirmButtonText: 'Confirm',
            })
            .then(result => {
                if (result.value) {
                    this.$store.dispatch('deleteUserQuestion', id)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        editQuestion (id) {
            const payload = {
                id: id,
                title: this.form.title,
                description: this.form.description
            }
            Swal.fire({
                title: 'Edit this Article ?',
                text: "You won't be able to revert this!",
                type: 'question',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#1ebf19',
                confirmButtonText: 'Confirm',
            })
            .then(result => {
                if (result.value) {
                    this.$store.dispatch('editQuestion', payload)
                    this.$bvModal.hide(`${id}`)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    props: {
        question: Object,
        status: Boolean
    }
}
</script>

<style scoped>

</style>