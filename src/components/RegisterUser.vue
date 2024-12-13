<template>
  <div class="register-container">
    <h2>Register User</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter username"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter email"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter password"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
.register-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #1c1c1c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #ff9900; /* Orange header color */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #ff9900; /* Match the orange color */
}

input.form-control {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: white; /* Ensure text color is visible */
  background-color: #1c1c1c; /* Set background color to white */
}

input.form-control::placeholder {
  color: #888; /* Slightly darker placeholder for visibility */
  opacity: 1; /* Ensure placeholder text is fully visible */
}

input.form-control:focus {
  border-color: #ff9900; /* Match orange color */
  outline: none;
  box-shadow: 0 0 3px rgba(255, 153, 0, 0.5); /* Orange glow */
}

button.btn {
  width: 100%;
  padding: 10px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button.btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
