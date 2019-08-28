<template>
  <div>
    <h5 class="ui top attached header">
      Watched Tags
      <button class="ui tiny right floated icon basic button">
        <i class="edit icon" @click="editMyTag"></i>
      </button>
    </h5>
    <div class="ui segment attached">
      <div class="ui small tags" v-if="!editTag">
        <a
          class="ui teal tag small label"
          v-for="(tag, index) in myTags"
          :key="index"
          @click="$store.dispatch('filterQ', '/questions?tags=' + tag)"
        >{{ tag }}</a>
      </div>
      <div class="ui small tags" v-if="editTag">
        <div class="ui teal tag small label" v-for="(tag, index) in newTags" :key="index">
          {{ tag }}
          <i class="close icon" @click="removeTag(tag)"></i>
        </div>
      </div>
      <div v-show="editTag">
        <div class="ui right labeled left icon small input" style="margin-top: 1rem;">
          <i class="tags icon"></i>
          <input type="text" placeholder="Enter tags" v-model="newTag" @keyup.enter.space="addTag">
          <a class="ui tag small label">Add Tag</a>
        </div>
        <button class="ui basic button" style="margin-top: .7rem;" @click="cancelEdit">Cancel</button>
        <button class="ui teal button" style="margin-top: .7rem;" @click="updateMyTag">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import backend from '@/api/backend'
export default {
  name: 'WatchTag',
  data () {
    return {
      newTag: '',
      newTags: [],
      editTag: false
    }
  },
  created () {
  },
  computed: {
    myTags () {
      return this.$store.state.myTags
    }
  },
  methods: {
    addTag () {
      if (this.newTags.indexOf(this.newTag) < 0 && this.newTag !== ' ') {
        this.newTags.push(this.newTag)
      }
      this.newTag = ''
    },
    removeTag (v) {
      this.newTag = this.newTag.replace(/ /g, '')
      this.newTags = this.newTags.filter(tag => tag !== v)
    },
    editMyTag () {
      this.newTags = [...this.myTags]
      this.editTag = true
    },
    updateMyTag () {
      backend
        .patch(
          '/',
          {
            watch_tag: this.newTags
          },
          {
            headers: {
              accesstoken: localStorage.getItem('accesstoken')
            }
          }
        )
        .then(({ data }) => {
          this.$store.commit('storeTag', data.watch_tag)
          this.editTag = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancelEdit () {
      this.newTag = ''
      this.newTags = []
      this.editTag = false
    }
  }
}
</script>

<style>
</style>
