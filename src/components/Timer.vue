<template>
  <div class="stopwatch-container">
    <h2>Stopwatch</h2>
    <p>{{ timeFormatted }}</p>
    <div class="button-container">
      <button @click="start">Start</button>
      <button @click="stop">Stop</button>
      <button @click="save">Save</button> <!-- Save and reset -->
      <button @click="deleteTimer">Delete</button> <!-- Reset without saving -->
    </div>
  </div>
</template>
  
<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        time: 0,
        interval: null,
        startLocation: null, // to store the starting location
        stopLocation: null,  // to store the stopping location
      };
    },
    computed: {
      timeFormatted() {
        const hours = Math.floor(this.time / 3600000) % 10;
        const minutes = Math.floor(this.time / 60000) % 60;
        const seconds = Math.floor(this.time / 1000) % 60;
        const milliseconds = Math.floor(this.time % 1000);

        return `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}.${this.padMilliseconds(milliseconds)}`;
      },
    },
    methods: {
      padTime(value) {
        return String(value).padStart(2, '0');
      },
      padMilliseconds(value) {
        return String(value).padStart(3, '0');
      },
      start() {
        if (!this.interval) {
          this.interval = setInterval(() => {
            this.time += 10;
          }, 10);
          this.fetchLocation('start'); // Capture location when starting
        }
      },
      stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.fetchLocation('stop'); // Capture location when stopping
      },
      save() {
        // Placeholder for saving functionality
        console.log("Save button clicked - implement save functionality here");
        console.log("Start Location:", this.startLocation);
        console.log("Stop Location:", this.stopLocation);
        
        // Reset after saving
        this.reset();
      },
      deleteTimer() {
        // Simply reset without saving
        console.log("Delete button clicked - stopwatch reset without saving");
        this.reset();
      },
      reset() {
        // Clears the stopwatch and location data
        clearInterval(this.interval);
        this.interval = null;
        this.time = 0;
        this.startLocation = null;
        this.stopLocation = null;
      },
      fetchLocation(action) {
        const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // Grab API key

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            axios
              .get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
              )
              .then((response) => {
                const location = response.data.results[0].formatted_address;
                if (action === 'start') {
                  this.startLocation = location; // Store location when starting
                  console.log("Start Location captured:", this.startLocation);
                } else if (action === 'stop') {
                  this.stopLocation = location; // Store location when stopping
                  console.log("Stop Location captured:", this.stopLocation);
                }
              })
              .catch((error) => {
                console.error("Error fetching location:", error);
              });
          });
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      },
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
  };
</script>
  
<style scoped>
  .stopwatch-container {
    border: 2px solid black;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-container {
    display: flex;
    justify-content: center;
  }

  button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
  }
</style>
  