<template>
    <div>
        <h1>Activity Data</h1>
        <ul>
            <li v-for="activity in activities" :key="activity.log_id">
                <p>Username: {{ activity.username }}</p>
                <p>Distance: {{ activity.distance }}</p>
                <p>Time: {{ activity.timeElapsed }}</p>
                <p>Mode of Transport: {{ activity.modeOfTransport }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
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
                const response = await axios.get('http://localhost:3000/database/activityInfo');
                //response.data = makes an array of objects from the response
                //.map() = creates a new arrray with the shortened names as specified on the left hand side of the request
                this.acitivityInfo = response.data.map (activity => ({
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