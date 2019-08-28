<template>
    <b-card no-body style="width: 100%; height: 15vh" class="border-top-0 border-left-0 border-right-0 border-dark rounded-0">
      <b-row no-gutters class="mt-2">
        <b-col cols="4" style="height: 100%; font-size: 30px; display:flex; justify-content: space-around; align-items: center; color: #676a6b;">
            <div style="height: 100%;">
                <p style="text-align: center; margin: 0; font-size: 15px;">{{ question.totalvotes }}</p>
                <p style="font-size: 15px;">votes</p>
            </div>
            <div style="height: 100%;">
                <p style="text-align: center; margin: 0; font-size: 15px;">{{ question.answer.length }}</p>
                <p style="font-size: 15px;">answers</p>
            </div>
        </b-col>
        <b-col cols="8" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between:">
            <div style="width: 100%;">
                <b-link style="color: #40a8db;" :to="`/dashboard/${question._id}`">{{ question.title }}</b-link>
            </div>
            <div style="width: 100%; color: #676a6b; font-size: 13px; display: flex; flex-direction: row-reverse; margin-top: 30px; ">
                <p style="margin: 0;">by: {{ question.user.username }}</p>
                <p style="margin: 0; margin-right: 10px;">modified {{ moment(question.updatedAt).fromNow() }}</p>
            </div>
        </b-col>
      </b-row>
    </b-card>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            moment
        }
    },
    props: {
        question: Object
    }
}
</script>

<style scoped>

</style>