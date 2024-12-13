<template>
  <div>
    <div
      ref="map"
      style="height: 400px; width: 100%"
      class="rounded mb-8"
    ></div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "RouteMap",
  props: {
    startPoint: {
      type: String,
      required: true,
    },
    endPoint: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    stringToObj(input) {
      const [lat, lng] = input.replace(/[()]/g, "").split(",");
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
    },

    async initMap() {
      const start = this.stringToObj(this.startPoint);
      const end = this.stringToObj(this.endPoint);

      const loader = new Loader({
        apiKey: import.meta.env.VITE_MAPS_API_KEY, // Use the correct environment variable
        version: "weekly",
        libraries: ["places"],
      });
      await loader.load();

      const map = new google.maps.Map(this.$refs.map, {
        center: start,
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      this.calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        start,
        end
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
