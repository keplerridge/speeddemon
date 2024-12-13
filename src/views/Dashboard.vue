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
  <main class="mb-20">
    <h1 class="text-5xl text-speedDemon-lightBlue text-center p-3">
      Public Dashboard
    </h1>

    <h3 class="text-3xl text-speedDemon-lightBlue text-center">
      View Recent Speed Demons
    </h3>
    <ActivityCard />
  </main>
</template>
