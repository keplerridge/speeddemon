<template>
  <div class="activity-details max-w-6xl mx-auto my-10">
    <h1 class="text-3xl font-semibold text-center mb-6">Activity Details</h1>

    <div class="flex flex-col md:flex-row">
      <!-- Left Column for Activity Details -->
      <div
        class="flex-1 mb-6 md:mb-0 md:pr-6 md:max-w-2xl md:text-center md:mt-10"
      >
        <!-- Display Username -->
        <div class="activity-item mb-4">
          <strong class="text-lg font-medium text-speedDemon-lightBlue">
            Username:
          </strong>
          <span class="ml-2 text-white">{{ activityInfo.username }}</span>
        </div>

        <!-- Display Coordinates -->
        <div class="activity-item mb-4">
          <strong class="text-lg font-medium text-speedDemon-lightBlue">
            Start Location:
          </strong>
          <span class="ml-2 text-white">
            {{ activityInfo.start_point }}, {{ activityInfo.startLong }}
          </span>
        </div>

        <div class="activity-item mb-4">
          <strong class="text-lg font-medium text-speedDemon-lightBlue">
            End Location:
          </strong>
          <span class="ml-2 text-white">
            {{ activityInfo.end_point }}, {{ activityInfo.endLong }}
          </span>
        </div>

        <!-- Display Time Elapsed -->
        <div class="activity-item mb-4">
          <strong class="text-lg font-medium text-speedDemon-lightBlue">
            Time Elapsed:
          </strong>
          <span class="ml-2 text-white">{{ activityInfo.time_elapsed }}</span>
        </div>

        <!-- Display Mode of Transport -->
        <div class="activity-item mb-4">
          <strong class="text-lg font-medium text-speedDemon-lightBlue">
            Mode of Transport:
          </strong>
          <span class="ml-2 text-white">
            {{ activityInfo.mode_of_transport }}
          </span>
        </div>
      </div>

      <!-- Right Column for Map -->
      <div class="flex-1">
        <RouteMap
          :startLat="activityInfo.startLat"
          :startLong="activityInfo.startLong"
          :endLat="activityInfo.endLat"
          :endLong="activityInfo.endLong"
          :modeOfTransport="activityInfo.modeOfTransport"
        />
      </div>
    </div>
  </div>
</template>

<script>
// Import the RouteMap component
import RouteMap from "../components/RouteMap.vue";
import axios from "axios";

export default {
  name: "ActivityDetails",
  components: {
    RouteMap, // Register the RouteMap component
  },
  data() {
    return {
      activityInfo: {}, // Store the activity data
    };
  },
  created() {
    // Fetch activity details based on the 'id' route parameter
    this.fetchActivityDetails();
  },
  methods: {
    async fetchActivityDetails() {
      try {
        const activityId = this.$route.params.id; // Get the id from the URL
        console.log(`activity ID = ${activityId}`);

        // Fetch all the activity data
        const response = await axios.get(
          `http://localhost:3000/database/query?queryName=ActivityData`
        );

        // Filter the data based on the activityId
        const filteredData = response.data.filter(
          (item) => item.log_id == activityId
        );

        if (filteredData.length > 0) {
          this.activityInfo = filteredData[0];
          console.log(
            " the data issss________________" + this.activityInfo.start_point
          ); // Assuming `id` is unique, take the first matching item
        } else {
          console.error("No activity found for the given ID");
        }
      } catch (error) {
        console.error("Error fetching activity details:", error);
      }
    },
  },
};
</script>
