<template>
  <div class="rightbar pt-5 mb-4">
    <button
      class="trigger-rightbar"
      @click.prevent="rightbar()"
      :style="{transform: 'translateX(' + (buttonPosition) +'%) rotate('+ rotate +'deg)'}"
    >
      <i class="fas fa-chevron-left"></i>
    </button>
    <h4 class="mt-3 mb-4">Most Used Tags</h4>
    <div class="tagslist d-flex flex-wrap p-2 mb-3">
      <TagCard v-for="tag in tagsMoreThanZero" :key="tag._id" :tag="tag" />
    </div>
  </div>
</template>

<script>
import axios from "@/apis/server.js";
import TagCard from "@/components/TagCard.vue";

export default {
  props: ["buttonPosition", "rotate"],
  data() {
    return {
      tagsMoreThanZero: []
    };
  },
  components: {
    TagCard
  },
  methods: {
    rightbar() {
      this.$emit("rightbar");
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
          let filter = data.filter(tag => tag.count > 0);
          let limited = [];
          for (let i = 0; i < filter.length; i++) {
            if (limited.length == 10) {
              break;
            }
            limited.push(filter[i]);
          }
          this.tagsMoreThanZero = limited;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getAllTags();
  }
};
</script>

<style scoped>
.tagslist {
  background-color: rgb(255, 210, 155);
  border-radius: 5px;
}

.rightbar {
  height: 100%;
  border-radius: 7px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.432);
  position: relative;
  top: 10px;
}

.trigger-rightbar {
  position: relative;
}

button {
  transition: all 400ms ease;
  background-color: rgb(230, 230, 230);
  border: 2px solid grey;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  outline: none !important;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.411);
}

i {
  color: grey;
  font-size: 30px;
}

h4 {
  font-family: "Oswald";
}
</style>