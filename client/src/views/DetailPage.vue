<template>
  <b-container>
    <b-row align="left">
      <b-col cols="12" class="m-3 border-bottom">
        <b-row>
          <b-col cols="11">
            <h1 v-if="!edited">{{question.title}}</h1>
            <b-form-input
              type="text"
              v-if="edited"
              v-model="question.title"
              style="font-size:20px;"
            ></b-form-input>
            <div>
              <span class="mr-5">Asked by : {{question.owner.username}}</span>
              <span class="mr-5">Replies : {{question.answer.length}}</span>
            </div>
          </b-col>
          <b-col cols="1" v-if="isEdit">
            <i
              class="fas fa-ellipsis-v mt-2"
              id="popover-edit"
              style="font-size: 25px; cursor: pointer;"
            ></i>
            <b-popover
              target="popover-edit"
              placement="leftbottom"
              title="Edit Menu"
              triggers="hover focus click"
            >
              <b-button variant="primary" class="mr-1" @click.prevent="editData">Edit</b-button>
              <b-button variant="danger" @click.prevent="deleteData">Delete</b-button>
            </b-popover>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" class="m-3 border-bottom" style="min-height: 200px;">
        <b-row align="left">
          <b-col cols="2">
            <div class="vote" align="center">
              <i :class="up" @click.prevent="vote('upvotes')" style="cursor: pointer;"></i>
              <h3 class="mt-4 mb-4" >{{question.upvotes.length - question.downvotes.length}}</h3>
              <i :class="down" @click.prevent="vote('downvotes')" style="cursor: pointer;"></i>
            </div>
          </b-col>
          <b-col cols="10">
            <p v-if="!edited">{{question.description}}</p>
            <div v-if="edited">
              <b-form-textarea rows="8" v-model="question.description"></b-form-textarea>
              <b-button variant="primary" @click.prevent="updateData">Update</b-button>
              <b-button variant="danger" @click.prevent="cancelEdit">Cancel</b-button>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" class="m-3 border-bottom">
        <h5>{{question.answer.length}} Answer</h5>
      </b-col>
      <b-col cols="12">
        <answer v-for="answer in question.answer" :key="answer._id" :data="answer"></answer>
      </b-col>
      <b-col cols="12">
        <h5 class="m-3 border-bottom">Your Answer</h5>
        <b-form class="m-3">
          <b-form-group label="Input your answer">
            <b-form-textarea
              id="textarea-rows"
              v-model="newAnswer"
              placeholder="Your answer"
              rows="8"
            ></b-form-textarea>
          </b-form-group>
          <b-button variant="primary" @click.prevent="createAnswer" align="right">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import answer from "../components/Answer.vue";
import axios from "../api/config";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      question: {
        owner: {},
        answer: [],
        upvotes: [],
        downvotes: []
      },
      newAnswer: "",
      isEdit: false,
      edited: false,
      up : 'far fa-thumbs-up',
      down : 'far fa-thumbs-down'
    };
  },
  components: {
    answer
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const { id } = this.$route.params;
      const userId = localStorage.getItem("id");
      axios({
        method: "get",
        url: `/question/find/${id}`
      })
        .then(({ data }) => {
          if (data.owner._id == userId) {
            this.isEdit = true;
          }
          this.question = data;
          this.checkVote(this.question.upvotes , this.question.downvotes)
        })
        .catch(console.log);
    },
    createAnswer() {
      if (!localStorage.token) {
        this.$router.push("/login");
      } else {
        const { id } = this.$route.params;
        const token = localStorage.getItem("token");
        axios({
          method: "post",
          url: `/answer/${id}`,
          data: { description: this.newAnswer },
          headers: { token }
        })
          .then(({ data }) => {
            this.question.answer.push(data);
          })
          .catch(err => {
            let payload = {
              variant: "danger",
              title: "Answer",
              content: err.response.data.message
            };
            this.makeToast(payload);
          });
      }
    },
    makeToast(payload) {
      this.$bvToast.toast(payload.content, {
        title: payload.title,
        variant: payload.variant,
        solid: true
      });
    },
    editData() {
      this.edited = true;
    },
    cancelEdit() {
      this.edited = false;
    },
    updateData() {
      const token = localStorage.getItem("token");
      const { id } = this.$route.params;
      if (this.question.title == "" || this.question.description == "") {
        let payload = {
          title: "Update",
          variant: "danger",
          content: "field cant blank!"
        };
        this.makeToast(payload);
        return;
      }
      axios({
        method: "patch",
        url: `/question/update/${id}`,
        data: {
          title: this.question.title,
          description: this.question.description
        },
        headers: { token }
      })
        .then(({ data }) => {
          this.edited = false;
          console.log(data);
        })
        .catch(err => {
          console.log(err.response);
          let payload = {
            title: "Update",
            variant: "danger",
            content: err.response.data.message
          };
          this.makeToast(payload);
        });
    },
    deleteData() {
      Swal.fire({
        title: "Want delete this question ?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.showLoading()
          this.confirmDelete()
        }
      });
    },
    confirmDelete(){
      const token = localStorage.getItem("token");
      const { id } = this.$route.params;
      axios({
        method:'delete',
        url: `/question/delete/${id}`,
        headers: {token}
      })
      .then(({ data }) => {
        let payload = {
          type : "success",
          title : "successfuly deleted"
        }
        this.$store.dispatch('alert', payload)
        this.$router.push('/question')
      })
      .catch(err => {
        let payload = {
          type : "error",
          title : err.response.data.message
        }
         this.$store.dispatch('alert', payload)
      })
    },
    checkVote(upvotes,downvotes){
      const id = localStorage.getItem('id')
      if (upvotes.indexOf(id) !== -1){
        this.up = 'fas fa-thumbs-up'
      }else {
        this.up = 'far fa-thumbs-up'
      }
      if (downvotes.indexOf(id) !== -1){
        this.down = 'fas fa-thumbs-down'
      } else{
        this.down = 'far fa-thumbs-down'
      }
    },
    vote(votetype){
      const { id } = this.$route.params
      const token = localStorage.token
      axios({
        url: `/question/votes/${id}`,
        method: `post`,
        data: {votetype},
        headers: {token}
      })
      .then(({ data }) =>{
        this.question.upvotes = data.upvotes;
        this.question.downvotes = data.downvotes;
        this.checkVote(this.question.upvotes , this.question.downvotes)
      })
      .catch(err => {
        let payload = {
          content : err.response.data.message,
          variant : 'danger',
          title : 'vote' 
        }
        this.makeToast(payload)
      })
    }
  },
};
</script>

<style>
.vote {
  display: flex;
  flex-direction: column;
  font-size: 30px;
  align-content: left;
  justify-content: left;
}
</style>