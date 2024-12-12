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
                const response = await axios.get(`http://localhost:3000/database/query?queryName=ActivityData`); // Replace "ActivityData with queryName you want"
                //response.data = makes an array of objects from the response
                //.map() = creates a new arrray with the shortened names as specified on the left hand side of the request

                this.activityInfo = response.data.map (activity => ({
                    routename: activity.route_name,
                    username: activity.username,
                    distance: activity.distance_traveled,
                    timeElapsed: activity.time_elapsed,
                    modeOfTransport: activity.mode_of_transport

                })) ;  // Store the response data in activities

                console.log(this.activityInfo); //debugging
                

            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        }
    },
};
</script>

<template>
  <div class="text-center">
    <h2 class="text-xl font-bold mb-4">Activity Data</h2>
    <ul>
      <li
        v-for="activity in activityInfo"
        :key="activity.activity_id"
        class="p-4 rounded mb-2 bg-speedDemon-darkBlue border-speedDemon-red border-x-speedDemon-lightBlue border-4 border-double"
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
              class="italic text-2xl uppercase text-speedDemon-lightBlue flex justify-center items-center"
              >{{ activity.routename }}</strong
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
      </li>
    </ul>
  </div>
</template>

