<template>
  <div>
    <b-row align="left" style="min-height: 200px;">
      <b-col cols="2">
        <div class="vote" align="center">
          <i class="fas fa-thumbs-up icon-vote"></i>
          <h3 class="mt-4 mb-4">{{data.upvotes.length - data.downvotes.length}}</h3>
          <i class="far fa-thumbs-down icon-vote"></i>
        </div>
      </b-col>
      <b-col cols="10" >
        <p style="min-height: 100px;">
            {{data.description}}
        </p>
        <span>Answered By : {{data.owner.username}}</span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
    props: ['data']
};
</script>

<style>
</style>