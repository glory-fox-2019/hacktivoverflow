<template>
<b-col class="sidebar pr-0">
  <b-card no-body class="p-2">
        <b-card no-body>
            <div class="p-2 pt-3">
                <span>Popular Tags</span>
            </div>
            <hr class="my-1">

            <div class="px-3 pt-1 pb-3">
                <b-badge @click="$store.commit('SEARCHBYTAG',t)" v-for="(t,i) in $store.state.popularTags" :key="i" class="mr-1" variant="primary">{{ t }}</b-badge>
            </div>
        </b-card>
      <br>
        <WatchedTags/>
  </b-card>
</b-col>
</template>

<script>
import WatchedTags from '@/components/WatchedTags.vue';

export default {
    components: {
        WatchedTags,
    }
}
</script>

<style>
.sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
}
</style>