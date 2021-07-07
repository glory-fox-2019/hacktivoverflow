<template>
  <div class="home d-flex">
    <Sidebar class="col-2" />
    <transition name="fade">
      <router-view class="view-home ml-auto col-8" />
    </transition>
    <Rightbar
      class="rightbar col-2"
      :style="{transform: 'translateX(' + transform +'%)'}"
      :buttonPosition="buttonPosition"
      :rotate="rotate"
      @rightbar="rightbar"
    />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Rightbar from "@/components/Rightbar.vue";

export default {
  name: "home",
  data() {
    return {
      transform: 100,
      buttonPosition: -350,
      rotate: 0
    };
  },
  components: {
    Sidebar,
    Rightbar
  },
  methods: {
    rightbar() {
      console.log("masuk");
      if (this.transform == 100) {
        this.buttonPosition = 0;
        this.transform = 0;
        this.rotate = 180;
      } else {
        this.buttonPosition = -350;
        this.transform = 100;
        this.rotate = 0;
      }
    }
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter {
  opacity: 0;
}

.home {
  overflow: hidden;
}

.view-home {
  width: 100%;
}

.col-2 {
  flex-grow: 1;
  transition: all 400ms ease;
}
</style>
