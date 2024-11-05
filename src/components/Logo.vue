<template>
  <header>
    <img :src="logo" alt="/Users/scottkishpaugh/Documents/Speed_demon_logo" />
    <!-- Other header content -->
  </header>
</template>

<script>
export default {
  data() {
    return {
      logo: require('/Users/scottkishpaugh/Documents/Speed_demon_logo') // Path to the logo file
    };
  }
};
</script>

<style scoped>
/* Optional: Add styling for your logo */
img {
  height: 50px; /* Adjust size as needed */
}