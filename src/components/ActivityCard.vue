<script>
import axios from "axios";

export default {
  name: "ActivityCard",
  data() {
    return {
      activityInfo: [], // This will hold the activities fetched from the database
    };
  },

  //Calls Methods defined in Methods: {}
  created() {
    this.fetchData();
  },

  //Defines Methods for use to be called in created(){}
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/database/query?queryName=ActivityData`
        ); // Replace "ActivityData with queryName you want"
        //response.data = makes an array of objects from the response
        //.map() = creates a new arrray with the shortened names as specified on the left hand side of the request
        this.activityInfo = response.data.map((activity) => ({
          activity_id: activity.log_id,
          username: activity.username,
          email: activity.email,
          password: activity.password,
          distance: activity.distance_traveled,
          timeElapsed: activity.time_elapsed,
          modeOfTransport: activity.mode_of_transport,
          routeName: activity.route_name,
        })); // Store the response data in activities
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    },
  },
};
</script>

<template>
  <div class="mt-5">
    <div class="flex flex-wrap justify-center gap-4">
      <div
        v-for="activity in activityInfo"
        :key="activity.activity_id"
        class="p-4 rounded mb-2 bg-speedDemon-darkBlue border-speedDemon-red border-x-speedDemon-lightBlue border-4 border-double w-72"
      >
        <!-- Wrap in a router-link for navigation -->
        <router-link
          :to="{
            name: 'activity-details',
            params: { id: activity.activity_id },
          }"
        >
          <p>
            <strong
              class="italic text-2xl uppercase text-speedDemon-lightBlue flex justify-center text-center"
              >{{ activity.routeName }}</strong
            >
          </p>
          <p>
            <strong
              class="italic underline text-lg uppercase text-speedDemon-orange"
              >Username:</strong
            >
            {{ activity.username }}
          </p>
          <p>
            <strong
              class="italic underline text-lg uppercase text-speedDemon-orange"
              >Distance:</strong
            >
            {{ activity.distance }}
          </p>
          <p>
            <strong
              class="italic underline text-lg uppercase text-speedDemon-orange"
              >Time:</strong
            >
            {{ activity.timeElapsed }}
          </p>
          <p>
            <strong
              class="italic underline text-lg uppercase text-speedDemon-orange"
              >Mode of Transport:</strong
            >
            {{ activity.modeOfTransport }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>
