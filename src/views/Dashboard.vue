//
<script>
import ActivityCard from "../components/ActivityCard.vue";

export default {
  name: "Dashboard",
  components: {
    ActivityCard,
  },
};
</script>

<template>
  <h1 class="text-5xl text-slate-100 text-center p-3">Public Dashboard</h1>
  <h3 class="text-3xl text-slate-100 text-center">View Recent Speed Demons</h3>
  <main class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    <ActivityCard />
  </main>
</template>
