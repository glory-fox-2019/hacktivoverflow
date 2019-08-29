<template>
  <b-container>
        <b-row>
            <b-col>
                <h1>
                Questions
                </h1>
                <b-button v-if="$store.state.question.filterTag" variant="primary" class="btn-sm">
                    {{ $store.state.question.filterTag }}
                    <b-badge @click="$store.commit('REMOVEFILTER')">x</b-badge>
                </b-button>
                <b-button v-if="$store.state.question.filterWatchedTags" variant="primary" class="btn-sm">
                    Watched Tags Questions
                    <b-badge @click="$store.commit('REMOVEFILTER')">x</b-badge>
                </b-button>

            </b-col>
            <b-col>
                <div class="d-flex justify-content-end">
                <router-link to="/ask">
                    <b-button variant="primary">Ask Question</b-button>
                </router-link>
                </div>
            </b-col>
        </b-row>
        <div class="border-top border-bottom px-3 mt-4">
        <b-row
          v-for="el in $store.state.question.questions" :key="el._id"
          class="border-bottom py-3 mt-1" style="border-color: #dddddd;">
            <b-col cols="2">
                <b-row>
                    <b-col cols="11" class="text-center">
                        <h6>{{ el.upvotes.length - el.downvotes.length }}</h6>
                        <sup>Votes</sup>
                    </b-col>
                    <b-col>

                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-row>
                <router-link :to="'/questions/' + el._id" class="text-justify">
                {{ el.title }}
                </router-link>
                </b-row>
                <b-row class="mt-2">
                    <b-col class="p-0">
                        <a href="#" v-for="t in el.tags" :key="t._id" @click="searchByTag(t.name)">
                        <b-badge class="mr-1" variant="primary">{{ t.name }}</b-badge>
                        </a>
                    </b-col>
                    <b-col class="text-right">
                        <sub><span class="text-muted">asked </span> by <a href="#">{{ el.author.username }}</a></sub>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        </div>
  </b-container>
</template>

<script>
export default {
    methods: {
        searchByTag(tag){
            this.$store.commit('SEARCHBYTAG',tag)
        }
    }
}
</script>

<style>

</style>