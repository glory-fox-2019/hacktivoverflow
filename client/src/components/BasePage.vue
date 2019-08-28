<template>
<div class="base d-flex">
    <div>
        <div class="side-nav col-md-2">
            <ul>
                <li><i class="fas fa-home"></i> Home</li>
                <li><i class="fas fa-list-alt"></i> My Question</li>
                <li><i class="fas fa-plus-circle"></i> Add Question</li>
                <!-- <li><i class="fas fa-star mr-3"></i>favourite</li> -->
                <!-- <li><i class="fas fa-sign-out-alt mr-3"></i>Logout</li> -->
            </ul>
        </div>
        <div style="width:200px;"></div>
    </div>
    <div class="mt-5 col-md-7" style="padding:0;">
        <h2 class="pl-4">All Question</h2>
        <p class="pl-4">{{questions.length}} question</p>
        <hr>
        <div v-for="ask in questions" :key="ask.id">
            <Task :asks="ask" /> <!-- ini task -->
        </div>

    </div>
    <div class="base-header mt-5 col-md-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis saepe eveniet natus expedita laboriosam. Nobis aliquam possimus iste doloribus. Amet cupiditate enim nisi distinctio sed culpa unde minus aut voluptatum?
    </div>
</div>
</template>

<script>

import {mapState} from 'vuex';
import Task from '@/components/Task.vue';

export default {
    name: 'basepage',
    components: {
        Task,
    },
    computed: {
        ...mapState(['questions'])
    },
    methods: {
    },
    created() {
        this.$store.dispatch('getQuestion');
    }
};
</script>

<style>
.base {
    margin-top: 3rem;
}
.row {
    margin: 0;
    padding: 0;
}
.side-nav{
    position: fixed;
    margin: 0;
    padding: 0rem;
    border-right: 1px solid silver;
    height: 100vh;
}
.side-nav ul {
    margin-top: 2rem;
}
.side-nav li {
    list-style: none;
    padding: .5rem;
    text-align: left;
}
.side-nav li:hover {
    text-shadow: 0 0 5px #82848b;
    /* margin-left: 3px; */
};
</style>