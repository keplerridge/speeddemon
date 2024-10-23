<script>
defineProps({
  title: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  transportation: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ distance }}</p>
    <p>{{ transportation }}</p>
    <p>{{ distance }}</p>
  </div>
</template>
