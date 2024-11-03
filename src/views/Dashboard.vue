<script>
import NewActivityForm from "../components/NewActivityForm.vue";

export default {
  components: {
    NewActivityForm, // Register it here
  },
};
</script>

<template>
  <h1 class="text-5xl text-slate-100">Dashboard</h1>
  <main>
    <NewActivityForm />
    <!-- Now it should render correctly -->
  </main>
</template>
