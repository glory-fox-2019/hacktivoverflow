<template>
  <footer class="p-4 shadow-lg p-3 bg-white rounded sticky-bot">
    <div class="d-flex align-items-center">
      <h4>Contact Us On</h4>
    </div>
    <div class="contactBox">
      <ul class="contactList mt-3 pl-0">
        <li>
          <a href="#" @click.prevent>
            <i class="fab fa-twitter"></i> Twitter
          </a>
        </li>
        <li>
          <a href="#" @click.prevent>
            <i class="fab fa-facebook-f"></i> Facebook
          </a>
        </li>
        <li>
          <a href="#" @click.prevent>
            <i class="fab fa-instagram"></i> Instagram
          </a>
        </li>
        <li>
          <a href="#" @click.prevent>
            <i class="fab fa-linkedin-in"></i> LinkedIn
          </a>
        </li>
        <li>
          <a href="#" @click.prevent>
            <i class="fas fa-envelope"></i> Email
          </a>
        </li>
      </ul>
    </div>
    <div id="copyrights">
      <h6>Personal Project</h6>
      <p>Made by Ardi Pratama © 2019</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  components: {}
};
</script>

<style scoped>
h4 {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #1e4a7d;
}
footer {
  /* position: fixed; */
  height: 100px;
  bottom: 0;
  width: 100%;
  background-color: white;
  color: #1e4a7d;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contactList {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
}

.contactList li a {
  color: #1e4a7d;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  transition: 0.3s all;
}

.contactList li a:hover {
  font-size: 18px;
  color: #1e4a7d;
  transition: 0.3s all;
}

.contactBox {
  width: 70%;
}

#copyrights {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>