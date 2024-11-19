<template>
    <button @click="goBack" class="back-button">
      ⬅️ Back
    </button>
  </template>
  
  <script>
  export default {
    name: "BackButton",
    methods: {
      goBack() {
        this.$router.go(-1); // Goes back one step in history
      }
    }
  };
  </script>
  
  <style scoped>
  .back-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .back-button:hover {
    background-color: #45a049;
  }
  </style>
