<template>
  <div id="nav">
    <div class="container">
      <div class="nav__brand">
        <router-link to="/">
          <span>Hacktiv<b>Overflow</b></span>
        </router-link>
      </div>
      <div class="nav__search">
        <input type="text" placeholder="Search Question">
      </div>
      <div class="nav--right">
        <div class="nav__account">
          <div class="nav__account__avatar"></div>
          <div class="nav__account__name">JustArya</div>
        </div>
        <div class="nav__action">
          <a href="javascript:void(0)" @click="logout">logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
