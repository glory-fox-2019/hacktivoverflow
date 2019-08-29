<template>
  <div class="container">
    <div class="row">
      <!-- <div class="col-md-4 col-lg-2 col-12" v-if="Object.keys(user).length > 0">
        <div class="card watched-tags">
          <div class="title">
            <h4>Watched Tags</h4>
          </div>
          <div class="tag--container">
            <div class="tag" v-for="(tag,index) in edit.tags.value" :key="index">{{ tag }} <a @click="deleteTag(index)">&times;</a></div>
          </div>
        </div>
      </div> -->
      <div class="col">
        <div class="card">
          <div id="newest-question">
            <div class="title">
              <span v-if="!search.input">
                Newest Question
              </span>
              <span v-else>
                Search Question: {{ search.input }}
              </span>
            </div>
            <div class="question--list">
              <div v-if="!search.input">
                <Question-List-Item v-for="question in questions" :key="question._id" :question="question"></Question-List-Item>
              </div>
              <div v-else>
                <Question-List-Item v-for="question in search.questions" :key="question._id" :question="question"></Question-List-Item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionListItem from '@/components/QuestionListItem'
import { mapState, mapActions } from 'vuex'

export default {
  components: { QuestionListItem },
  data () {
    return {

    }
  },
  created () {
    this.fetchQuestions()
  },
  computed: {
    ...mapState(['questions', 'search', 'user'])
  },
  methods: {
    ...mapActions(['fetchQuestions'])
  }
}
</script>

<style>

</style>
