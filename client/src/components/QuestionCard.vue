<template>
  <div class="quest-card d-flex justify-content-start mb-5">
    <div class="quest-info d-flex flex-column justify-content-center align-items-around p-3">
      <div class="quest-like d-flex flex-column justify-content-center align-items-around p-2 mb-2">
        <!-- <button class="btn">
          <i class="fas fa-heart"></i>
        </button>-->

        <p class="m-0">{{quest.upvotes.length - quest.downvotes.length}}</p>
        <h6>Votes</h6>
        <!-- <button class="btn">
          <i class="fas fa-heart-broken"></i>
        </button>-->
      </div>
      <div class="quest-answer p-2">
        <p class="m-0">{{quest.answers.length}}</p>
        <h6>Answers</h6>
      </div>
    </div>
    <div class="quest-content p-3 d-flex flex-column justify-content-between" style="width:100%">
      <div class="quest-quest d-flex flex-column align">
        <h4 class="m-0">{{quest.title}}</h4>
        <hr class="m-0 mt-2 mb-2" />
        <p>{{quest.description}}</p>
      </div>
      <div class="quest-maker d-flex justify-content-around align-items-center">
        <!-- <router-link :to="`/edit/${info._id}`" class="btn">
          <button class="btn">
            <i class="fas fa-edit"></i>
          </button>
        </router-link> -->
        <router-link :to="`questions/${quest._id}`" style="width:50%">
          <button class="btn">Read</button>
        </router-link>
        <p class="m-0">Post By: {{quest.UserId.username}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["quest"]
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
  width: 80%;
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