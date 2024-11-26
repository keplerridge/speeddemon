

<script>
import axios from 'axios';

export default {
    name: 'ActivityCard',
    data() {
        return {
            activityInfo: []  // This will hold the activities fetched from the database
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
                    username: activity.username,
                    email: activity.email,
                    password: activity.password,
                    distance: activity.distance_traveled,
                    timeElapsed: activity.time_elapsed,
                    modeOfTransport: activity.mode_of_transport
                })) ;  // Store the response data in activities
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        }
    }
};
</script>

<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Activity Data</h2>
        <ul>
            <li
                v-for="activity in activityInfo"
                :key="activity.id"
                class="p-4 border rounded mb-2">
                <p><strong>Username:</strong> {{ activity.username }}</p>
                <p><strong>Distance:</strong> {{ activity.distance }}</p>
                <p><strong>Time:</strong> {{ activity.timeElapsed }}</p>
                <p><strong>Mode of Transport:</strong> {{ activity.modeOfTransport }}</p>
            </li>
        </ul>
    </div>
</template>