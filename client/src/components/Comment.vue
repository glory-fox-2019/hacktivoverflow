<template>
  <div class="comment col-12 col-md-9">
    <div class="comment--list">
      <div class="comment--list__item" v-for="comment in comments" :key="comment._id">
        <span class="comment--list__item--text">{{comment.text}}</span>
        <span class="comment--list__item--detail"> - {{ comment.user.name }} | A hour ago</span>
      </div>
    </div>
    <div class="comment--action">
      <form>
        <input type="text" placeholder="Add comment...">
        <button>Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comments']
}
</script>

<style>

</style>