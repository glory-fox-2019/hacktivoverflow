<template>
<div>
    <b-card no-body style="width: 100%;" class="border-top-0 border-left-0 border-right-0 border-dark rounded-0">
        <div v-if="condition == 'voteAnswer' && question.user._id == userId" style="margin: 0; display:flex; flex-direction: row-reverse; align-items:center;">
            <i class="fas fa-edit" style="color: green; cursor: pointer;" v-b-modal="`${question._id}`"></i>
        </div>
      <b-row no-gutters class="mt-2" style="margin-bottom: 4px;">
        <b-col cols="2" style="height: 100px; font-size: 30px; display:flex; flex-direction: column; justify-content: center; align-items: center; color: #676a6b;">
            <i class="fas fa-angle-up" style="cursor: pointer; font-size: 40px;" @click.prevent="vote('upvotes')" :style="upVote ? {color: '#40a8db'} : {color: '#676a6b'}"></i>
            <p style="margin: 0; font-size: 20px;">{{ question.totalvotes }}</p>
            <i class="fas fa-angle-down" style="cursor: pointer; font-size: 40px;" @click.prevent="vote('downvotes')" :style="downVote ? {color: '#40a8db'} : {color: '#676a6b'}"></i>
        </b-col>
        <b-col cols="10" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between:">
            <div style="width: 100%;">
                <p style="color: black; margin: 0; font-size: 18px;">{{ question.title }}</p>
            </div>
            <div style="width: 100%; color: #676a6b; font-size: 15px; display: flex; margin-top: 30px; ">
                <p></p>
                <br>
                <p style="margin: 0;" v-html="question.description"></p>
            </div>
            <div style="width: 100%; color: #676a6b; font-size: 13px; display: flex; flex-direction: row-reverse; margin-top: 20px; justify-content: space-between;">
                <p style="margin: 0;">by: {{ question.user && question.user.username }}</p>
                <p style="margin: 0; margin-right: 10px;">create {{ moment(question.createdAt).fromNow() }}</p>
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
              <b-button variant="success" style="width: 10%;" @click.prevent="reAnswer(question._id)">Edit</b-button>
          </template>
      </b-modal>
    </b-card>
</div>
</template>

<script>
import moment from 'moment'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            condition: this.status,
            moment,
            form: {
                title: this.question.title,
                description: this.question.description
            }
        }
    },
    props: {
        question: Object,
        status: String
    },
    methods: {
        vote(votes) {
            this.$store.dispatch(this.condition, {
                id: this.question._id,
                vote: votes
            })
        },
        reAnswer(id) {
            const payload = {
                id: id,
                question: this.$route.params.id,
                title: this.form.title,
                description: this.form.description
            }
            Swal.fire({
                title: 'Edit this answer ?',
                type: 'question',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#1ebf19',
                confirmButtonText: 'Confirm',
            })
            .then(result => {
                if (result.value) {
                    this.$store.dispatch('editAnswer', payload)
                    this.$bvModal.hide(`${id}`)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    computed: {
        upVote () {
            if (this.question.upvotes) {
                return this.question.upvotes.find((el) => { return el == localStorage.id})
            }
        },
        downVote() {
            if (this.question.downvotes) {
                return this.question.downvotes.find((el) => { return el == localStorage.id})
            }
        },
        userId() {
            return localStorage.id
        }
    }
}
</script>

<style scoped>
i:hover {
    color: #40a8db;
}
</style>