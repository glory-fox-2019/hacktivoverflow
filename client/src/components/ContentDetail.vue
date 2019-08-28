<template>
  <div class="answer__detail--container content__detail--container col-12 col-md-3">
    <div class="answer__detail content__detail">
      <div class="answer__detail__time content__detail__time">Asked {{ new Date(date) | moment("from", "now") }}</div>
      <div class="answer__detail__account content__detail__account">
        <div class="answer__detail__account__avatar content__detail__account__avatar"></div>
        <div class="answer__detail__account__name content__detail__account__name">
          <span>{{ user.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user', 'date']
}
</script>

<style>

</style>
