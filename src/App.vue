<template>
  <div id="app">
    <Header />
    <RouterView /> <!-- Main app view where routes are rendered -->
    <Footer />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue'; // Ensure the path is correct
import Footer from './components/Footer.vue';
import ActivityCard from './components/ActivityCard.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ActivityCard
  },
  mounted() {
    // Add event listener to clear storage when the user is about to leave the app or close the tab
    window.addEventListener('beforeunload', this.clearStorage);
  },
  beforeDestroy() {
    // Clean up the event listener when the component is destroyed
    window.removeEventListener('beforeunload', this.clearStorage);
  },
  methods: {
    clearStorage() {
      // Clear localStorage when the user leaves the app
      localStorage.removeItem('username');
      localStorage.removeItem('user_id');
      console.log('Storage cleared');
    },
  },
};
</script>
