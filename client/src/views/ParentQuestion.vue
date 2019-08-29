<template>
  <b-row>
        <b-col cols="3">
          <b-row class="pt-5 mb-5 border" style="height: 100vh;" align="right">
            <b-col cols="12">
             <router-link to="/question/collection">
             <h4 class="border-bottom mb-3" v-if="isLogin"> <i class="fas fa-user-circle"></i> My Question </h4>
             </router-link>
             <router-link to="/question">
             <h4 class="border-bottom mb-3"><i class="fas fa-globe-asia"></i> Explore </h4>
             </router-link>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="9">
          <router-view class="pt-5 mb-5"/>
        </b-col>
      </b-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isLogin']),
  },
};
</script>

<style>

</style>
