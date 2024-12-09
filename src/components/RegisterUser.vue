<template>
    <div class="register-form">
      <h1>Register User</h1>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="user.username"
            required
            placeholder="Enter username"
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="user.email"
            required
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="user.password"
            required
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div v-if="message" :class="messageClass">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          username: '',
          email: '',
          password: '',
        },
        message: '',
        messageClass: '',
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await fetch('http://localhost:3000/database/insertUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.user),
          });
  
          const data = await response.json();
          if (response.ok) {
            this.message = data.message;
            this.messageClass = 'success-message';
            this.clearForm();
          } else {
            this.message = data.message || 'Registration failed.';
            this.messageClass = 'error-message';
          }
        } catch (error) {
          console.error('Error:', error);
          this.message = 'An error occurred while registering the user.';
          this.messageClass = 'error-message';
        }
      },
      clearForm() {
        this.user = {
          username: '',
          email: '',
          password: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .register-form {
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
  