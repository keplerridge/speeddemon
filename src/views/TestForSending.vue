<template>
    <div>
      <form @submit.prevent="submitActivityData">
        <input v-model="userName" type="text" placeholder="Username" required />
        <input v-model="userEmail" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input v-model="startLat" type="number" placeholder="Start Latitude" required />
        <input v-model="startLong" type="number" placeholder="Start Longitude" required />
        <input v-model="endLat" type="number" placeholder="End Latitude" required />
        <input v-model="endLong" type="number" placeholder="End Longitude" required />
        <input v-model="startTime" type="datetime-local" required />
        <input v-model="endTime" type="datetime-local" required />
        <input v-model="modeOfTransport" type="text" placeholder="Mode of Transport" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userName: '',
      userEmail: '',
      password: '',
      startLat: null,
      startLong: null,
      endLat: null,
      endLong: null,
      startTime: '',
      endTime: '',
      modeOfTransport: ''
    };
  },
  methods: {
    async submitActivityData() {
      try {
        const data = {
          userName: this.userName,
          userEmail: this.userEmail,
          password: this.password,
          startLat: this.startLat,
          startLong: this.startLong,
          endLat: this.endLat,
          endLong: this.endLong,
          startTime: this.startTime,
          endTime: this.endTime,
          modeOfTransport: this.modeOfTransport
        };

        const response = await axios.post('http://localhost:3000/database/insert', data);

        if (response.status === 200) {
          alert('Data inserted successfully');
        }
      } catch (error) {
        console.error('Error inserting data:', error);
        alert('Failed to insert data');
      }
    }
  }
};
</script>