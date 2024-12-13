<template>
  <div class="auth-container">
    <h2>Register User</h2>
    <form @submit.prevent="registerUser">
      <div class="input-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter username"
          class="auth-input"
        />
      </div>
      <div class="input-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter email"
          class="auth-input"
        />
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter password"
          class="auth-input"
        />
      </div>
      <button type="submit" class="auth-button">Register</button>
    </form>
    <p v-if="errorMessage" class="auth-error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    registerUser() {
      if (!this.username || !this.email || !this.password) {
        this.errorMessage = "All fields are required.";
        return;
      }
      // Add your API call or other registration logic here
      this.errorMessage = ""; // Clear error message on success
    },
  },
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1c1c1c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #fff;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #ff9900;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #ff9900;
}

.auth-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #2b2b2b;
  color: #fff;
}

.auth-input::placeholder {
  color: #888;
}

.auth-input:focus {
  border-color: #ff9900;
  outline: none;
  box-shadow: 0 0 5px rgba(255, 153, 0, 0.8);
}

.auth-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #ff9900;
  color: #fff;
  cursor: pointer;
}

.auth-button:hover {
  background-color: #e68a00;
}

.auth-error {
  margin-top: 15px;
  font-size: 14px;
  color: #ff4d4d;
}
</style>
