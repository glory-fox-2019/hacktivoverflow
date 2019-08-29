<template>
  <div class="quest-card d-flex justify-content-start mb-5">
    <div class="quest-info d-flex flex-column justify-content-center align-items-center p-3">
      <div class="quest-like d-flex flex-column justify-content-center align-items-center p-2 mb-2">
        <button class="btn" @click.prevent="vote('0', info._id)">
          <i class="fas fa-heart"></i>
        </button>
        <p class="m-0">{{info.upvotes.length - info.downvotes.length}}</p>
        <h6>Votes</h6>
        <button class="btn" @click.prevent="vote('1', info._id)">
          <i class="fas fa-heart-broken"></i>
        </button>
      </div>
    </div>
    <div class="quest-content p-3 d-flex flex-column justify-content-between" style="width:100%">
      <div class="quest-quest d-flex flex-column align">
        <p>{{info.answer}}</p>
      </div>
      <div class="quest-maker d-flex justify-content-around align-items-center">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  methods: {
    vote(value, id,) {
      const QuestionId = this.$route.params.id;
      const data = {
        value,
        id,
        QuestionId
      };
      this.$store.dispatch('voteAnswer', data);
    }
  },
  created() {
    //   console.log(this.info);
  }
};
</script>

<style scoped>
.quest-card {
  border: 1px solid black;
  border-radius: 5px;
}
.quest-like {
  border: 1px solid black;
  border-radius: 5px;
}
.quest-answer {
  border: 1px solid black;
  border-radius: 5px;
}
.quest-quest hr {
  width: 100%;
  border: 1px solid black;
}
h6,
h4,
p {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}
button {
  width: 100%;
  border: 2px solid black;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  transition: 0.5s all;
}
button:hover {
  color: whitesmoke;
  border: 2px solid #0b2d54;
  background-color: #0b2d54;
  transition: 0.5s all;
}
</style>