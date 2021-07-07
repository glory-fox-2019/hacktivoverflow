<template>
  <a href @click.prevent>
    <div class="tag-card d-flex px-2 align-items-center mr-2 mb-2">
      <i class="fas fa-tag mr-2"></i>
      <span class="name mr-2">{{tag.name}}</span>
      <span class="count d-flex justify-content-center align-items-center">{{tag.count}}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: ["tag"]
};
</script>

<style scoped>
a {
  text-decoration: none !important;
}
.tag-card {
  background-color: rgb(216, 216, 216);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.486);
  padding-top: 3px;
  padding-bottom: 3px;
}
.name {
  font-family: "Times New Roman", Times, serif;
  font-size: 12px;
}
.count {
  background-color: rgb(121, 121, 121);
  width: 16px;
  height: 16px;
  border-radius: 100%;
  font-size: 9px;
  color: rgb(226, 226, 226);
}

i {
  font-size: 10px;
}
</style>