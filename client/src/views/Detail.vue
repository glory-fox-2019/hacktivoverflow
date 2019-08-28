<template>
  <v-container v-if="dataReady" fluid class="d-flex justify-center">
    <v-card width="920" class="pa-5 mt-12" flat>
      <v-row>
        <v-col id="left" cols="1" class="pa-0 d-flex flex-column">
          <v-icon large color="blue-grey lighten-3"
          @click="upVote">expand_less</v-icon>
            <h2 class="text-center">
              {{ oneData.up_votes.length - oneData.down_votes.length }}
            </h2>
          <v-icon large color="blue-grey lighten-3"
          @click="downVote">expand_more</v-icon>
          <v-icon color="blue-grey lighten-2" class="mt-9">star</v-icon>
        </v-col>
        <v-col cols="11">
          <v-card-title class="pt-0 display-1">{{ oneData.title }}</v-card-title>
          <v-card-text class="subtitle-1">{{ oneData.text }}</v-card-text>
          <v-card-text>
            <Comment/>
          </v-card-text>
        </v-col>
      </v-row>
      <v-expand-transition>
        <v-card-text v-show="answerField">
          <v-textarea v-model="answer.text" relative>
            <template v-slot:label>
              <div>
                Your answer . . .
              </div>
            </template>
          </v-textarea>
        </v-card-text>
      </v-expand-transition>
      <v-card-actions class="d-flex justify-end">
        <v-expand-x-transition>
          <v-btn color="error" large depressed
          @click="answerField = false" v-show="answerField">Cancel</v-btn>
        </v-expand-x-transition>

        <v-btn color="primary" large depressed 
        @click="submitAnswer">Answer</v-btn>
      </v-card-actions>
      <v-row>
        <Answer/>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Answer from '@/components/Answer.vue';
import Comment from '@/components/Comment.vue';
import { mapState } from 'vuex';

export default {
  computed: mapState(['questionBundle']),
  components: {
    Answer,
    Comment,
  },
  data: () => ({
    dataReady: false,
    answerField: false,
    answer: {
      text: '',
    },
    oneData: {}
  }),
  created() {
    this.$store.dispatch('getOneQuestion', this.$route.params.id)
      .then(data => {
        this.oneData = data;
        this.dataReady = true;
      })
  },
  methods: {
    upVote() {
      this.$store.dispatch('upVote', this.$route.params.id)
        .then(_ => {
          return this.$store.dispatch('getOneQuestion', this.$route.params.id)
        })
        .then(data => {
          this.oneData = data;
          this.dataReady = true;
        })
        .catch(msg => {
          this.$swal(msg);
        })
    },
    downVote() {
      this.$store.dispatch('downVote', this.$route.params.id)
        .then(_ => {
          return this.$store.dispatch('getOneQuestion', this.$route.params.id)
        })
        .then(data => {
          this.oneData = data;
          this.dataReady = true;
        })
        .catch(msg => {
          this.$swal(msg);
        })
    },
    submitAnswer() {
      if (!this.answerField) {
        this.answerField = true;
      } else {
        let payload = {
          question_id : this.$route.params.id,
          text: this.answer.text,
        }
        this.$store.dispatch('answerQuestion', payload)
          .then(msg => {
            this.$swal(msg);
          })
          .catch(msg => {
            console.log(msg);
          })
      }
    }
  }
}
</script>

<style scoped>
  #left .v-icon:nth-child(1):hover, 
  #left .v-icon:nth-child(3):hover {
    cursor: pointer;
    color: rgb(46, 46, 46) !important;
  }
</style>
