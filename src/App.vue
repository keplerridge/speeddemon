<script>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue"; // Ensure the path is correct
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>
