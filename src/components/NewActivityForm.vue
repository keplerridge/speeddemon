<script>
export default {
  name: "NewActivityForm",
  data() {
    return {
      title: "",
      transportation: "",
      transportationDetails: "",
      routeDetails: "",
      distance: "12 miles",
      time: "6 min",
    };
  },
  methods: {
    submitForm() {
      // Prepare the data payload
      const newActivity = {
        title: this.title,
        transportation: this.transportation,
        transportationDetails: this.transportationDetails,
        routeDetails: this.routeDetails,
        distance: this.distance,
        time: this.time,
      };

      // Log or send to an API endpoint (placeholder example here)
      console.log("Submitting new activity:", newActivity);
      // When the DB is ready, use `fetch` or Axios to send data to server
      // axios.post('/api/activities', newActivity);
    },
  },
};
</script>

<template>
  <div class="bg-slate-700 text-white rounded-md p-2 text-center max-w-96">
    <h2 class="text-2xl">Enter Activity Details</h2>
    <form @submit.prevent="submitForm">
      <textarea
        v-model="title"
        class="w-72 mt-1 text-black text-xl rounded-md p-1"
        maxlength="36"
        placeholder="Enter the title for this route"
      ></textarea>
      <h3 class="text-2xl">
        {{ distance }} <span class="text-xl">in</span> {{ time }}
      </h3>
      <textarea
        v-model="transportation"
        class="w-72 mt-1 text-black text-md rounded-md p-1"
        maxlength="36"
        placeholder="Enter name for the mode of transportation. e.g Dirtbike"
      ></textarea>
      <textarea
        v-model="transportationDetails"
        class="w-72 h-20 mt-1 text-black rounded-md p-1"
        maxlength="150"
        placeholder="Enter transportation details e.g 2024 Honda CRF45RX stock"
      ></textarea>
      <textarea
        v-model="routeDetails"
        class="w-72 mt-1 h-32 text-black rounded-md p-1"
        maxlength="250"
        placeholder="Enter route details, directions, or tips"
      ></textarea>
      <input
        class="w-52 mt-1 border-2 rounded-full p-2 hover:text-white hover:bg-yellow-500"
        type="submit"
        value="Submit Activity"
      />
    </form>
  </div>
</template>
