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
        time: 0, // Add this line to define 'time' property
        interval: null,
        startCoords: { lat: null, lng: null },
        stopCoords: { lat: null, lng: null },
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
        // Save only latitude and longitude to the database
        this.saveToDatabase({
          startCoords: this.startCoords,
          stopCoords: this.stopCoords,
          time: this.timeFormatted
        });



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
        this.startCoords = { lat: null, lng: null };
        this.stopCoords = { lat: null, lng: null };
      },
      fetchLocation(action) {
        const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // Grab API key

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            
            // Store raw coordinates without the formatted address
            if (action === 'start') {
              this.startCoords = { lat: latitude, lng: longitude };
              console.log("Start Coordinates captured:", this.startCoords);
            } else if (action === 'stop') {
              this.stopCoords = { lat: latitude, lng: longitude };
              console.log("Stop Coordinates captured:", this.stopCoords);
            }
          });
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      },

      //send lat and lang individually so database can format its own custom LatLang data type
      saveToDatabase(data) {
        const startLat = data.startCoords.lat;
        const startLong = data.startCoords.lng;

        const endLat = data.stopCoords.lat;
        const endLong = data.stopCoords.lng;

        console.log( 'Sending Data to Database', {
          userName: 'amy',  //NEED TO GET ACTUAL USERNAME
          startLat,
          startLong,
          endLat,
          endLong,
          timeElapsed: data.time,
          modeOfTransport: 'car' });

        axios.post('http://localhost:3000/database/insertActivityLog', {
          userName: 'kayden',  //NEED TO GET ACTUAL USERNAME
          startLat,
          startLong,
          endLat,
          endLong,
          timeElapsed: data.time,
          modeOfTransport: 'car'  //NEED TO GET USER INPUT SOMEHOW
        })

      
          .then(response => {
            console.log("Data saved to the database successfully:", response.data);
          })
          .catch(error => {
            console.error("Error saving data to the database:", error);
          });
      }
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
