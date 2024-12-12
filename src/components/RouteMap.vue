<template>
  <div>
    <div ref="map" style="height: 400px; width: 100%"></div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "RouteMap",
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      // Load the Google Maps script using the API key from environment variables
      const loader = new Loader({
        apiKey: import.meta.env.VITE_MAPS_API_KEY, // Use the correct environment variable
        version: "weekly",
        libraries: ["places"],
      });
      await loader.load();

      // Coordinates for Rexburg and Idaho Falls (default example)
      const rexburg = { lat: 43.8225, lng: -111.7894 };
      const idahoFalls = { lat: 43.4666, lng: -112.0358 };

      // Initialize the map
      const map = new google.maps.Map(this.$refs.map, {
        center: rexburg, // Start at Rexburg
        zoom: 10,
      });

      // Create a directions service and renderer
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      // Calculate and display the route
      this.calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        rexburg,
        idahoFalls
      );
    },
    calculateAndDisplayRoute(
      directionsService,
      directionsRenderer,
      start,
      end
    ) {
      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    },
  },
};
</script>

<style scoped>
/* Customize map container styling here */
</style>
