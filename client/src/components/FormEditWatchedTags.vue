<template>
  <div class="form-watched-tag">
    <b-modal id="edit-watched-tags" title="BootstrapVue" @show="openModal()">
      <div class="header" slot="modal-header">
        <h4>Watched Tags</h4>
      </div>
      <div class="body">
        <form>
          <!-- ============= email -->
          <label for>Watched Tags:</label>
          <tags-input
            element-id="tags"
            v-model="selectedTags"
            :existing-tags="existingTags"
            :typeahead="true"
          ></tags-input>
        </form>
      </div>
      <div class="foter" slot="modal-footer">
        <button class="btn btn-primary mr-2" @click="setWatchedTags()">OK</button>
        <button class="btn btn-danger" @click="cancel()">Cancel</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "@/apis/server.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      formWatchedTags: {
        tags: []
      },
      selectedTags: [],
      existingTags: []
    };
  },
  methods: {
    openModal() {
      // console.log('modal openend')
      this.getAllTags()
      this.$store
        .dispatch("fetchLoggedUser")
        .then(user => {
          this.selectedTags = [];
          for (let i = 0; i < user.watchedTags.length; i++) {
            this.selectedTags.push({ value: user.watchedTags[i].name });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      this.$bvModal.hide("edit-watched-tags");
    },
    setWatchedTags() {
      this.$store
        .dispatch("setWatchedTags", this.formWatchedTags.tags)
        .then(data => {
          this.$bvModal.hide("edit-watched-tags");
          this.$store
            .dispatch("fetchLoggedUser")
            .then(user => {
              let newWatchId = [];
              for (let i = 0; i < this.user.watchedTags.length; i++) {
                newWatchId.push(this.user.watchedTags[i]._id);
              }
              this.$store.dispatch("fetchWatchedQuestions", newWatchId);
              this.$router.push("/watch-list");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllTags() {
      axios({
        method: "get",
        url: `/tags`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.existingTags = [];
          for (let i = 0; i < data.length; i++) {
            this.existingTags.push({ value: data[i].name });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {
    selectedTags() {
      this.formWatchedTags.tags = [];
      let nameOnly = [];
      for (let i = 0; i < this.existingTags.length; i++) {
        nameOnly.push(this.existingTags[i].value);
      }

      for (let i = 0; i < this.selectedTags.length; i++) {
        if (nameOnly.includes(this.selectedTags[i].value)) {
          console.log(this.selectedTags[i].value, "masuk");
          this.formWatchedTags.tags.push(this.selectedTags[i].value);
        } else {
          this.selectedTags.pop();
        }
      }
    }
  },
  created() {
    this.getAllTags();
    this.$store
      .dispatch("fetchLoggedUser")
      .then(user => {
        for (let i = 0; i < user.watchedTags.length; i++) {
          this.selectedTags.push({ value: user.watchedTags[i].name });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>