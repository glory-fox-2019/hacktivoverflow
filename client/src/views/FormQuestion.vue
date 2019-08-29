<template>
  <div class="my-container">
    <h4 style="margin-bottom: 40px;">ASK QUESTION</h4>
    <form action @submit.prevent="submitQuestion">
      <div class="form-group">
        <label for="title" style="text-align: left; display: block">Title:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Title"
          v-model="newQuestion.title"
          required
        />
      </div>
      <div class="form-group">
        <label for="content" style="text-align: left; display: block">Question:</label>
        <textarea
          name="content"
          id="contentQuestion"
          cols="77"
          rows="10"
          placeholder="Enter your question..."
          class="contentQuestion form-control"
          v-model="newQuestion.content"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="tag" style="text-align: left; display: block">Tags:</label>
        <div class="row">
          <div class="col-5" style="padding-right:2px">
            <input
              type="text"
              placeholder="Eg. Javascript"
              class="form-control"
              v-model="tagValue"
            />
            <small
              style="text-align: left; display: block; font-size:12px;"
            >*if you want to include more than one tag, add one by one</small>
          </div>
          <div class="col-1" style="padding-left: 0px;">
            <button type="button" class="btn btn-outline-dark" @click.prevent="addTag">Add</button>
          </div>
          <div class="col-5" style="font-size:15px;" v-if="newQuestion.tags">
            <small
              class="tags"
              style="background-color: rgba(0,0,0,0.4)"
              v-for="(tag,i) in newQuestion.tags"
              :key="i"
            >{{tag}}</small>
          </div>
        </div>
      </div>
      <button style="margin-top:25px" type="submit" class="btn btn-outline-secondary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newQuestion: {
        title: "",
        content: "",
        tags: []
      },
      tagValue: ""
    };
  },
  methods: {
    addTag() {
      if (!this.newQuestion.tags) this.newQuestion.tags = [];
      this.newQuestion.tags.push(this.tagValue.trim().toLowerCase());
      this.tagValue = "";
    },
    submitQuestion() {
      this.$store.dispatch('createQuestion', this.newQuestion)
      this.newQuestion = {}
    }
  }
};
</script>

<style scoped>
.my-container {
  padding-top: 30px;
  padding-right: 400px;
  padding-left: 400px;
}

.contentQuestion {
  display: block;
  overflow: auto;
  resize: none;
  box-shadow: none;
  outline: none;
}

.tags {
  background-color: rgb(187, 170, 170);
  border-radius: 4px;
  box-shadow: 3px 4px 5px -3px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 10px;
}
</style>