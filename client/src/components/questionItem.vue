<template>
    <div class = "card mb-4">
        <div class="row pl-0">
            <div class="col-sm-2">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{question.upvotes.length}}</h5>
                        <small>Upvotes</small>
                    </div>    
                </div>
            </div>
            <div class="col-sm-2">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{question.downvotes.length}}</h5>
                        <small>Downvotes</small>
                    </div>    
                </div>
            </div>
            <div class="col-sm">
                <div class="card">
                    <div class="card-body">
                        <router-link :to="'/' + question._id" class="link"><h5 class="card-title">{{question.title}}</h5></router-link>
                        <p class="card-text" v-html="question.description"/>
                        <small>asked by {{question.User.name}}</small> <br>
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["question"]

}
</script>

<style>
    .link{
        color:rgb(255, 116, 0)
    }

</style>