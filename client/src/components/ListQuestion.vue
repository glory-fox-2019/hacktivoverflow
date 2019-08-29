<template>
  <div class="row">
    <div class="col-4">
      <div class="d-flex justify-content-center response" style="margin-top: 40px">
        <div style="color: rgba(0,0,0,0.6)">
          <div>{{question.AnswerId.length}}</div>
          <div>Answer</div>
        </div>
        <div style="padding-left: 20px; color: rgba(0,0,0,0.6)">
          <div>{{question.upvote.length}}</div>
          <div>Upvote</div>
        </div>
        <div style="padding-left: 20px; color: rgba(0,0,0,0.6)">
          <div>{{question.downvote.length}}</div>
          <div>Downvote</div>
        </div>
      </div>
    </div>
    <div class="col-8">
      <div>
        <div
          class="d-flex justify-content-start title"
          style="border-bottom: 1px solid rgba(0,0,0,0.6); cursor: pointer;"
          @click.prevent="clickDetail(question._id)"
        >
          <p
            v-if="question.title.length > 50"
            style="margin-bottom: 5px; font-size: 18px; font-weight: 600; color: rgba(0,0,0,0.8); text-align: left;"
          >{{question.title.slice(0, 50)}}...</p>
          <p
            v-else
            style="margin-bottom: 5px; font-size: 18px; font-weight: 600; color: rgba(0,0,0,0.8)"
          >{{question.title}}</p>
        </div>
        <div class="d-flex justify-content-start content">
          <p v-if="question.content.length > 200">{{ question.content.slice(0, 200) }}...</p>
          <p v-else>{{question.content}}</p>
        </div>
        <div class="row" style="margin-left: 0px; width:29em">
          <div
            class="d-flex justify-content-between"
            v-for="(tag, i) in question.tags"
            :key="i"
            style="margin-right: 12px; font-size: 12px; color: rgba(0,0,0,0.6);"
          >
            <p class="tags" style="padding: 5px;padding-right: 15px;padding-left: 15px; corsor:pointer" @click.prevent="clickTag(tag)">{{tag}}</p>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <div class="flex-column" style="font-size: 14px; color: rgba(0,0,0,0.6)">
            <div
              style="margin-bottom: 5px; text-align: right; cursor: pointer"
              v-if="question.UserId._id == userData._id"
            >
              <i class="far fa-edit" @click.prevent="clickEditQuestion(question._id)"></i> |
              <i @click.prevent="clickDeleteQuestion(question._id)" class="far fa-trash-alt"></i>
            </div>
            <div>
              <p style="margin-bottom: 5px; text-align: right">{{question.UserId.username}}</p>
            </div>
            <div>
              <p>{{ question.createdAt | moment}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moments from "../helpers/moment";
import moment from "moment";
import { mapState } from 'vuex'

export default {
  props: ["question"],
  data() {
    return {};
  },
  methods: {
    clickDetail(questionId) {
      this.$router.push(`/question/${questionId}`);
    },
    clickEditQuestion(questionId) {
      this.$router.push(`/edit/${questionId}`)
    },
    clickDeleteQuestion(questionId) {
      this.$store.dispatch('deleteQuestion', questionId)
    },
    clickTag(isTag) {
      this.$store.dispatch('filteringTag', isTag)
    }
  },
  computed: {
    ...mapState(["userData"])
  },
  filters: {
    moment: function(date) {
      return moment(date).format("lll");
    }
  }
};
</script>

<style>
.response {
  font-size: 15px;
}

.list-group li {
  display: flex;
  justify-content: space-between;
}

.content {
  text-align: justify;
  margin-top: 15px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
}

.tags {
  background-color: rgb(187, 170, 170);
  border-radius: 4px;
  box-shadow: 3px 4px 5px -3px rgba(0, 0, 0, 0.75);
  cursor: pointer;
}
</style>