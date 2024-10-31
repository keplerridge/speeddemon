<template>
    <header>
      <nav>
        <ul>
          <li><a href="/Log-out">Log-out</a></li>
          <li><a href="/New-route">New-route</a></li>
          <li><a href="/Dashboard">Dashboard</a></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: "HeaderComponent",
  };
  </script>
  
  <style scoped>
  header {
    background-color: #333;
    padding: 1rem;
    color: white;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  
  nav a {
    color: white;
    text-decoration: none;
  }
  </style>
  