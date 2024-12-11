<template>
  <div
    class="max-w-lg mx-auto p-6 border-2 border-speedDemon-lightBlue rounded-xl shadow-xl space-y-6 text-center"
  >
    <!-- Stopwatch Heading -->
    <h2 class="text-3xl font-bold text-yellow-500">Location & Time Tracking</h2>

    <!-- Timer Display -->
    <p class="text-6xl font-mono text-white py-4 rounded-lg">
      {{ timeFormatted }}
    </p>

    <!-- Mode of Transport Input -->
    <div class="flex flex-col items-center space-y-2">
      <label for="mode" class="text-lg font-semibold text-gray-300"
        >Mode of Transport:</label
      >
      <input
        v-model="modeOfTransport"
        type="text"
        id="mode"
        placeholder="Enter mode of transport"
        class="p-2 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
    <div>
      <label for="mode" class="text-lg font-semibold text-gray-300"
      >Route Name: </label>
      <input
        v-model="routeName"
        type="text"
        id="mode"
        placeholder="Enter name of route"
        class="p-2 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>

    <!-- Control Buttons -->
    <div class="flex justify-center gap-4">
      <button
        @click="start"
        class="px-6 py-2 bg-speedDemon-lightBlue text-white rounded-lg hover:bg-speedDemon-lightBlue focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Start
      </button>
      <button
        @click="stop"
        class="px-6 py-2 bg-speedDemon-red text-white rounded-lg hover:bg-speedDemon-red focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Stop
      </button>
      <button
        @click="save"
        class="px-6 py-2 bg-speedDemon-darkBlue text-white rounded-lg hover:bg-speedDemon-darkBlue focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Save
      </button>
      <button
        @click="deleteTimer"
        class="px-6 py-2 border-2 border-speedDemon-red text-white rounded-lg"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from '../stores/store';
import { onMounted } from "vue";
let universalUsername = "";

export default {
  setup() {
    const userStore = useUserStore();
    console.log('Username in Timer:', userStore.username); // Debug the value here.
    return { userStore };
  },
  data() {
    return {
      time: 0, // Add this line to define 'time' property
      interval: null,
      startCoords: { lat: null, lng: null },
      stopCoords: { lat: null, lng: null },
      modeOfTransport: '',
      routeName: '',
    };
  },
  computed: {
    timeFormatted() {
      const hours = Math.floor(this.time / 3600000) % 10;
      const minutes = Math.floor(this.time / 60000) % 60;
      const seconds = Math.floor(this.time / 1000) % 60;
      const milliseconds = Math.floor(this.time % 1000);

      return `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(
        seconds
      )}.${this.padMilliseconds(milliseconds)}`;
    },
  },
  methods: {
    padTime(value) {
      return String(value).padStart(2, "0");
    },
    padMilliseconds(value) {
      return String(value).padStart(3, "0");
    },
    start() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.time += 10;
        }, 10);
        this.fetchLocation("start"); // Capture location when starting
      }
    },
    stop() {
      clearInterval(this.interval);
      this.interval = null;
      this.fetchLocation("stop"); // Capture location when stopping
    },
    save() {
      // Save only latitude and longitude to the database
      this.saveToDatabase({
        startCoords: this.startCoords,
        stopCoords: this.stopCoords,
        time: this.timeFormatted,
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
          if (action === "start") {
            this.startCoords = { lat: latitude, lng: longitude };
            console.log("Start Coordinates captured:", this.startCoords);
          } else if (action === "stop") {
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

      console.log(this.userStore.username);
      // debugger;

      console.log("Sending Data to Database", {
        userName: this.userStore.username,
        startLat,
        startLong,
        endLat,
        endLong,
        timeElapsed: data.time,
        modeOfTransport: this.modeOfTransport,
        routeName: this.routeName,
      });

      axios
        .post("http://localhost:3000/database/insertActivityLog", {
          userName: this.userStore.username,
          startLat,
          startLong,
          endLat,
          endLong,
          timeElapsed: data.time,
          modeOfTransport: this.modeOfTransport,
          routeName: this.routeName,
        })

        .then((response) => {
          console.log("Data saved to the database successfully:",response.data);
        })
        .catch((error) => {
          console.error("Error saving data to the database:", error);
        });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
