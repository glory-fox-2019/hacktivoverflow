<template>
<div class="task-detail">
  <div class="detail d-flex align-item-center">
    <div class="col-ms-2 pl-4 pr-5 d-flex flex-column" style="height:50px; ">
      <i class="fas fa-chevron-up" @click.prevent="upvoteAnswer(answ._id)" style="font-size:15px; cursor:pointer;"></i>
      <a style="font-size:15px;">{{answ.upVote.length}}</a>
      <i class="fas fa-chevron-down" @click.prevent="downvoteAnswer(answ._id)" style="font-size:15px; cursor:pointer;"></i>
    </div>
    <div class="col-ms-10">
      <p>{{answ.content}}</p>
      <div class="d-flex justify-content-between">
        <div>
          <button class="mr-2" @click="editAnswer" data-toggle="modal" data-target="#Modal" data-whatever="@getbootstrap">Edit</button>
          <a @click.prevent="removeAnswer(answ._id)">Delete</a>
        </div>
        <div class="d-flex ml-5">
          <a>{{Moment(answ.createdAt).fromNow()}}</a>
          <!-- <button>{{this.user.name}}</button> -->
        </div>
      </div>
    </div>
  </div>

  <!-- modal edit answerr -->
  <div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Answer</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Your new answer:</label>
              <textarea v-model="newAnswer.content" class="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button @click="submitUpdateAnswer" type="button" class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex';
import Moment from 'moment';

export default {
  props: ['answ'],
  data() {
    return {
      Moment,
      user: {
        name: localStorage.name,
      },
      newAnswer: {
        id: '',
        content: '',
      },
    };
  },
  computed: {
    ...mapState(['answer']),
  },
  methods: {
    removeAnswer(id) {
      this.$store.dispatch('removeAnswer', id);
      this.$store.dispatch('getAnswer', this.$route.params.id);
    },
    editAnswer() {
      this.newAnswer.id = this.answ._id;
      this.newAnswer.content = this.answ.content;
    },
    submitUpdateAnswer() {
      this.$store.dispatch('submitUpdateAnswer', this.newAnswer);
      this.$store.dispatch('getAnswer', this.$route.params.id);
      $('#Modal').modal('hide');
    },
    upvoteAnswer(id) {
      this.$store.dispatch('upvoteAnswer', id);
      this.$store.dispatch('getAnswer', this.$route.params.id);
    },
    downvoteAnswer(id) {
      this.$store.dispatch('downvoteAnswer', id);
      this.$store.dispatch('getAnswer', this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch('getAnswer', this.$route.params.id);
  },
  
};
</script>

<style scoped>
.detail {
  display: flex;
  margin: 1rem;
};
i {
  height: 100px !important;
}

</style>