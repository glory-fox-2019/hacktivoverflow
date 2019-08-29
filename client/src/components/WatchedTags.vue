<template>
  <b-card no-body>
      <div class="p-2 pt-3">
          <font-awesome-icon icon="eye"></font-awesome-icon>
          <span> Watched Tags</span>
          <b-button class="btn-sm" @click="$store.commit('WATCHEDTAGSFILTER', $store.state.user.watchedTags)">See Watched Tags</b-button>
      </div>
      <hr class="my-1">

      <b-row class="px-3 py-1 ml-1 " v-for="(t,i) in $store.state.user.watchedTags" :key="i">
          <b-badge @click="$store.commit('SEARCHBYTAG',t)" class="ml-1" variant="primary">{{ t }}</b-badge>
          <b-badge @click="$store.commit('removeWatchedTags',t)" class="mr-1" variant="light">x</b-badge>
      </b-row>

      <tags-input class="p-3 btn-sm"></tags-input>
  </b-card>
</template>

<script>
export default {

}
</script>

<style>

</style>