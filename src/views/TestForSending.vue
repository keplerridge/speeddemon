//To see this in action, add /TestForSending at the end of your URL



<template>
  <div>
    <h2>User Information</h2>
    <input v-model="userName" placeholder="Username" />
    <input v-model="userEmail" placeholder="Email" type="email" />
    <input v-model="password" placeholder="Password" type="password" />
    <button @click="submitUserData">Submit User Data</button>

    <h2>Activity Log</h2>
    <input v-model.number="startLat" placeholder="Start Latitude" type="number" />
    <input v-model.number="startLong" placeholder="Start Longitude" type="number" />
    <input v-model.number="endLat" placeholder="End Latitude" type="number" />
    <input v-model.number="endLong" placeholder="End Longitude" type="number" />
    <input v-model="startTime" placeholder="Start Time (YYYY-MM-DD HH:MM:SS)" />
    <input v-model="endTime" placeholder="End Time (YYYY-MM-DD HH:MM:SS)" />
    <input v-model="modeOfTransport" placeholder="Mode of Transport" />
    <button @click="submitActivityLogData">Submit Activity Log</button>
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

    //Specifically submits users data
    async submitUserData() {
      try {

        //Creates an array containing this info
        const userData = {
          userName: this.userName,
          userEmail: this.userEmail,
          password: this.password
        };

        //Puts information at that temporary /database/insertUser address 
        const response = await axios.post('http://localhost:3000/database/insertUser', userData);

        if (response.status === 200) {
          alert('User data inserted successfully');
        }
      } catch (error) {
        console.error('Error inserting user data:', error);
        alert('Failed to insert user data');
      }
    },

    //Specifically submits aciticty log data
    async submitActivityLogData() {
      try {
        const activityData = {
          userName: this.userName,
          startLat: this.startLat,
          startLong: this.startLong,
          endLat: this.endLat,
          endLong: this.endLong,
          startTime: this.startTime,
          endTime: this.endTime,
          modeOfTransport: this.modeOfTransport
        };
        
        //temporarily sends info to the /database/insertActivityLog location
        const response = await axios.post('http://localhost:3000/database/insertActivityLog', activityData);

        if (response.status === 200) {
          alert('Activity log inserted successfully');
        }
      } catch (error) {
        console.error('Error inserting activity log:', error);
        alert('Failed to insert activity log');
      }
    }
  }
};
</script>