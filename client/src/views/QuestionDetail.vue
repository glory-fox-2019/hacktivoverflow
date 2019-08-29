<template>
    <b-row class="justify-content-center mt-5 pt-5">
        <b-col cols="8">
            <b-row>
                <b-col cols="2">
                    <b-row class="justify-content-center">
                    <a @click="upvote(checkUpvote)" v-bind:class="{ 'text-primary': checkUpvote }">
                        <h4 class="p-0 m-0"><font-awesome-icon icon="chevron-up"></font-awesome-icon></h4>
                    </a>
                    </b-row>
                    <b-row class="justify-content-center">
                    <h4 class="p-0 m-0">{{ detail.upvotes.length - detail.downvotes.length }}</h4>
                    </b-row>
                    <b-row class="justify-content-center">
                    <a @click="downvote(checkDownvote)" v-bind:class="{ 'text-primary': checkDownvote }">
                        <h4 class="p-0 m-0"><font-awesome-icon icon="chevron-down"></font-awesome-icon></h4>
                    </a>
                    </b-row>
                </b-col>
                <b-col class="p-0">
                    <div class="text-justify">
                        <b-row>
                            <b-col>
                                <h2>{{ detail.title}}</h2>
                            </b-col>
                            <b-col class="text-right mr-3">
                                <h5 class="text-muted">
                                    <b-button variant="white">
                                        <font-awesome-icon @click="editQuestion()" icon="edit"></font-awesome-icon>
                                    </b-button>
                                    <b-button variant="white">
                                        <font-awesome-icon @click="deleteQuestion()" icon="trash" class="ml-3"></font-awesome-icon>
                                    </b-button>
                                </h5>
                            </b-col>
                        </b-row>
                        <sup><span class="text-muted">Asked </span>{{ formattedDate }}</sup>
                        <hr class="mt-0">
                        <span v-html="detail.content"></span>
                        </div>
                        <div class="mt-2">
                            <b-badge @click="$store.commit('SEARCHBYTAG',t.name)"
                            v-for="t in detail.tags" :key="t._id" class="mr-1" variant="primary">{{ t.name }}</b-badge>
                        </div>
                        <div class="d-flex justify-content-end">
                        <div>
                            <b-row class="pr-4">
                            <sup class="text-left mb-2"><span class="text-muted">Asked </span>{{ formattedDate }}</sup>
                            </b-row>
                            <b-row class="pr-4 align-items-center">
                            <div class="px-2 mr-2" style="background-color: black; color: white;">{{ detail.author.username[0].toUpperCase() }}</div>
                            <sub>{{ detail.author.username }}</sub>
                            </b-row>
                        </div>
                        </div>
                        <div>
                    </div>
                    <hr>
                    <AnswerItem v-for="a in answers" :key="a._id" :detail="a"></AnswerItem>
                    <AddAnswerForm class="px-4 my-4 pb-5"></AddAnswerForm>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import AddAnswerForm from '@/components/AddAnswerForm.vue';
import AnswerItem from '@/components/AnswerItem.vue';
import { mapState } from 'vuex';

export default {
    name: 'QuestionDetail',
    data() {
        return {

        }
    },
    components: {
        AddAnswerForm,
        AnswerItem,
    },
    created(){
        this.$store.dispatch('fetchOneQuestion', this.$route.params.id)
        this.$store.dispatch('fetchAnswers', this.$route.params.id)
    },
    computed: {
        ...mapState({
            detail: state => state.question.question
        }),
        answers() {
            return this.$store.state.answer.answers
        },
        formattedDate(){
            let date = new Date(this.detail.createdAt)
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
                ];

            return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
        },
        // checkUpvote(){
        //     let status = this.detail.upvotes.includes(localStorage.getItem('id'))

        //     return status
        // },
        // checkDownvote(){
        //     let status = this.detail.downvotes.includes(localStorage.getItem('id'))
        //     return status
        // }
    },
    methods: {
        deleteQuestion(){
            this.$store.dispatch('deleteQuestion', this.$route.params.id)
            .then(() => {
                this.$router.push('/');
            })
            .catch(console.log)
        },
        upvote(bool){
            if(bool){
                this.$store.dispatch('cancelVoteQuestion', this.$route.params.id)
                .then(() => {
                    this.$store.dispatch('fetchOneQuestion', this.$route.params.id)
                })
                .catch(console.log)
            } else {
                this.$store.dispatch('upvoteQuestion', this.$route.params.id)
                .then(() => {
                    this.$store.dispatch('fetchOneQuestion', this.$route.params.id)
                })
                .catch(console.log)
            }
        },
        downvote(bool){
            if(bool){
                this.$store.dispatch('cancelVoteQuestion', this.$route.params.id)
                .then(() => {
                    this.$store.dispatch('fetchOneQuestion', this.$route.params.id)
                })
                .catch(console.log)
            } else {   
                this.$store.dispatch('downvoteQuestion', this.$route.params.id)
                .then(() => {
                    this.$store.dispatch('fetchOneQuestion', this.$route.params.id)
                })
                .catch(console.log)
            }
        },
    }
}
</script>

<style>

</style>