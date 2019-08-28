<template>
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
</template>

<script>
export default {

}
</script>

<style>
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