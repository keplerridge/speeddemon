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
  <main class="gap-4 p-4 mb-14 md:flex md:flex-wrap md:h-2xl">
    <ActivityCard />
  </main>
</template>
