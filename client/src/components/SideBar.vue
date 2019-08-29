<template>
  <div class="side-nav d-flex flex-column">
    <a @click.prevent="toHome">Home</a>
    <a @click.prevent="toMyQuestion">My Question</a>
    <ul>
      <!-- <li>Home</li> -->
      <!-- <li>Add Question</li> -->
      <!-- <li><i class="fas fa-star mr-3"></i>favourite</li> -->
      <!-- <li><i class="fas fa-sign-out-alt mr-3"></i>Logout</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    toMyQuestion() {
      this.$router.push('/myquestion')
    },
    toHome() {
      this.$router.push('/')
    }
  },
};
</script>

<style>
.side-nav {
  margin-top: 2rem;
  margin-left: 2rem;
}
a {
  cursor: pointer;
  padding: .5rem 0 0.5rem 0;
}
</style>