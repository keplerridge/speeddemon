<template>
  <div class="activity-details p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-semibold text-center mb-6">Activity Details</h1>

    <!-- Display Username -->
    <div class="activity-item mb-4">
      <strong class="text-lg font-medium text-speedDemon-lightBlue"
        >User Name:</strong
      >
      <span class="ml-2 text-white">{{ activityInfo.username }}</span>
    </div>

    <!-- Display Coordinates -->
    <div class="activity-item mb-4">
      <strong class="text-lg font-medium text-speedDemon-lightBlue"
        >Start Location:</strong
      >
      <span class="ml-2 text-white">{{ activityInfo.start_point }}</span>
    </div>

    <div class="activity-item mb-4">
      <strong class="text-lg font-medium text-speedDemon-lightBlue"
        >End Location:</strong
      >
      <span class="ml-2 text-white">{{ activityInfo.end_point }}</span>
    </div>

    <!-- Display Time Elapsed -->
    <div class="activity-item mb-4">
      <strong class="text-lg font-medium text-speedDemon-lightBlue"
        >Time Elapsed:</strong
      >
      <span class="ml-2 text-white">{{ activityInfo.time_elapsed }}</span>
    </div>

    <!-- Display Mode of Transport -->
    <div class="activity-item mb-4">
      <strong class="text-lg font-medium text-speedDemon-lightBlue"
        >Mode of Transport:</strong
      >
      <span class="ml-2 text-white">{{ activityInfo.mode_of_transport }}</span>
    </div>

    <!-- Route Map Component -->
    <div v-if="activityInfo.start_point && activityInfo.end_point">
      <RouteMap
        :startPoint="activityInfo.start_point"
        :endPoint="activityInfo.end_point"
      />
    </div>
  </div>
</template>

<script>
import RouteMap from "../components/RouteMap.vue";
import axios from "axios";

export default {
  name: "ActivityDetails",
  components: {
    RouteMap,
  },
  data() {
    return {
      activityInfo: {},
    };
  },
  created() {
    this.fetchActivityDetails();
  },
  methods: {
    async fetchActivityDetails() {
      try {
        const activityId = this.$route.params.id;
        console.log(`activity ID = ${activityId}`);

        const response = await axios.get(
          `http://localhost:3000/database/query?queryName=ActivityData`
        );

        const filteredData = response.data.filter(
          (item) => item.log_id == activityId
        );

        if (filteredData.length > 0) {
          this.activityInfo = filteredData[0];
          // Log start_point and end_point
          console.log("Start Point:", this.activityInfo.start_point);
          console.log("End Point:", this.activityInfo.end_point);
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
