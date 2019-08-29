<template>
    <div class="card ml-5">
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><router-link to="/"  class="link">Home</router-link></li>
            <li class="list-group-item"><router-link to="/new" class="link">New Question</router-link></li>
            <li class="list-group-item"><router-link to="/myquestion" class="link">My Question</router-link></li>
        </ul>

    </div>
</template>

<script>
export default {

}
</script>

<style>
.link{
    color:rgb(255, 116, 0)
}
</style>