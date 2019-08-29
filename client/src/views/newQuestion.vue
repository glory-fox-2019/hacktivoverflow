<template>
    <div class="card" style="width:95%">
        <div class = "card mb-4" style="background-color : rgba(218, 216, 216, 0.198)">
            <div class = "row">
                <div class = "col-sm mr-5 mb-5 ml-5 mt-5">
                    <div class = "card mb-4">
                        <div class = "card-body">
                            <input type="text" placeholder = "Title..." style="width : 100%; height: 40px; text-align:left" v-model="inputTitle">
                        </div>
                    </div>
                    <div class = "card mb-2">
                        <div class = "card-body">
                            <wysiwyg v-model="inputContent" style="text-align:left"></wysiwyg>
                        </div>

                    </div>

                    <div class = "card mb-4">
                        <div class = "card-body">
                            <input type="submit" value = "Publish Question" style="width : 100%; height: 40px; background-color:rgb(255, 116, 0); color:white" v-on:click = "newPost">
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            inputTitle: "",
            inputContent: ""
        }
    },
    methods: {
        newPost () {
            let payload = {
                title: this.inputTitle,
                description: this.inputContent
            }
            this.$store.dispatch('createQuestion',payload)
            this.$store.dispatch('fetch_question')
            this.$router.push('/')
        }
    }

}
</script>

<style>

</style>