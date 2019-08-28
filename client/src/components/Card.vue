<template>
<div>
    <b-card no-body style="width: 100%;" class="border-top-0 border-left-0 border-right-0 border-dark rounded-0">
      <b-row no-gutters class="mt-2" style="margin-bottom: 4px;">
        <b-col cols="2" style="height: 100px; font-size: 30px; display:flex; flex-direction: column; justify-content: center; align-items: center; color: #676a6b;">
            <i class="fas fa-angle-up" style="cursor: pointer; font-size: 40px;"></i>
            <p style="margin: 0; font-size: 20px;">{{ question.totalvotes }}</p>
            <i class="fas fa-angle-down" style="cursor: pointer; font-size: 40px;"></i>
        </b-col>
        <b-col cols="10" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between:">
            <div style="width: 100%;">
                <b-link style="color: #40a8db;">{{ question.title }}</b-link>
            </div>
            <div style="width: 100%; color: #676a6b; font-size: 15px; display: flex; margin-top: 30px; ">
                <p></p>
                <br>
                <p style="margin: 0;">{{ question.description }}</p>
            </div>
        </b-col>
      </b-row>
    </b-card>
</div>
</template>

<script>
export default {
    props: {
        question: Object
    },
    methods: {
        test() {

        }
    }
}
</script>

<style>

</style>