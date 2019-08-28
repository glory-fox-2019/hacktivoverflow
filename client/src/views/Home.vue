<template>
  <div>
    <div class="ui grid container" style="margin-top: 2rem;">
      <div class="eleven wide column">
        <div class="ui divided items">
          <div class="item" v-for="q in questions" :key="q._id">
            <div class="content">
              <div class="ui left floated small basic buttons" style="margin-right: 1.2rem;">
                <button class="ui button ktk" @click="goToQ(q._id)">
                  {{ q.upvotes.length - q.downvotes.length }}
                  <br>
                  <br>Votes:
                </button>
                <button class="ui button ktk" @click="goToQ(q._id)">
                  {{ q.answers.length }}
                  <br>
                  <br>Answers:
                </button>
              </div>
              <a @click="goToQ(q._id)" class="header">{{ q.title }}</a>
              <div class="extra">
                <div
                  class="ui tiny teal label"
                  v-for="(tag, index) in q.tags"
                  :key="index"
                  @click="$store.dispatch('filterQ', '/questions?tags=' + tag)"
                >{{ tag }}</div>
                <div class="ui right floated">{{ q.owner.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="five wide column">
        <div>
          <router-link
            to="/new-question"
            class="ui fluid teal button"
            style="margin-bottom: 1rem;"
          >Ask Question</router-link>
        </div>
        <div v-show="isLogin">
          <WatchTag />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WatchTag from '@/components/WatchTag'
export default {
  name: 'home',
  data () {
    return {}
  },
  components: {
    WatchTag
  },
  created () {
    this.$store.dispatch('getAllQ')

    if (this.isLogin) {
      this.$store.dispatch('getMyTag')
    }
  },
  computed: {
    questions () {
      return this.$store.state.questions
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    goToQ (id) {
      this.$router.push(`questions/${id}`)
    }
  }
}
</script>

<style>
.ktk {
  width: 90px;
}
</style>
