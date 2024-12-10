<script>
  import { useUserStore } from '../stores/store';
  import { useRouter } from 'vue-router';

  export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    
    userStore.clearUser();

    setTimeout(() => {
      router.push('/');
    }, 1000)
  }
};
</script>

<template>
  <h1 class="text-5xl text-slate-100 text-center mt-10 italic">
    Logging you out...
  </h1>
  <main></main>
</template>
