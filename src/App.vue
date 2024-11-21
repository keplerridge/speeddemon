<script>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue"; // Ensure the path is correct
import Footer from "./components/Footer.vue";
import ActivityCard from "./components/ActivityCard.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    ActivityCard
  },
};
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>
