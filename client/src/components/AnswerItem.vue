<template>
    <div style="background-color: #efefef;">
        <b-row class="pt-5 mt-0">
        <b-col cols="2">
            <b-row class="justify-content-center">
            <h4 class="p-0 m-0"><font-awesome-icon icon="chevron-up"></font-awesome-icon></h4>
            </b-row>
            <b-row class="justify-content-center">
            <h4 class="p-0 m-0">9</h4>
            </b-row>
            <b-row class="justify-content-center">
            <h4 class="p-0 m-0"><font-awesome-icon icon="chevron-down"></font-awesome-icon></h4>
            </b-row>
        </b-col>
        <b-col class="p-0">
            <div class="text-justify pr-4">
            <p v-html="detail.content"></p>
            </div>
            <div class="d-flex justify-content-end">
            <div class="pr-4">
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
        </b-col>
        </b-row>
        <hr class="mb-0">
    </div>
</template>

<script>
export default {
    props: ['detail'],
    computed: {
        formattedDate(){
            let date = new Date(this.detail.createdAt)
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
                ];

            return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
        },
    },
}
</script>

<style>

</style>