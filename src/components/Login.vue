<template>
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username or Email:</label>
          <input
            type="text"
            id="username"
            v-model="credentials.username"
            required
            placeholder="Enter username or email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            required
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div v-if="message" :class="messageClass">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '../stores/store';
  import bcrypt from 'bcryptjs';
  
  export default {
    data() {
      return {
        credentials: {
          username: '',
          password: '',
        },
        message: '',
        messageClass: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          // First, fetch the user data based on username/email
          const response = await fetch(
            `http://localhost:3000/database/getUser?input=${this.credentials.username}`
          );
          const data = await response.json();
  
          if (response.ok) {
            // Compare the hashed password stored in the database with the entered password
            const passwordMatch = await bcrypt.compare(
              this.credentials.password, // The plaintext password entered by the user
              data.password // The hashed password stored in the database
            );
  
            if (passwordMatch) {
              this.message = 'Login successful.';
              this.messageClass = 'success-message';
              this.clearForm();

              const userStore = useUserStore();
              userStore.setUser(data.username, data.user_id)
              console.log(data);
              console.log(userStore.username);

              this.$router.push('/dashboard');
            } else {
              this.message = 'Invalid password.';
              this.messageClass = 'error-message';
            }
          } else {
            this.message = data.message || 'User not found.';
            this.messageClass = 'error-message';
          }
        } catch (error) {
          console.error('Error:', error);
          this.message = 'An error occurred while logging in.';
          this.messageClass = 'error-message';
        }
      },
      clearForm() {
        this.credentials = {
          username: '',
          password: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .success-message {
    color: green;
    margin-top: 15px;
  }
  
  .error-message {
    color: red;
    margin-top: 15px;
  }
  </style>
  