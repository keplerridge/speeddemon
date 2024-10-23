<template>
    <div>
        <h1>Activity Data</h1>
        <ul>
            <li v-for="activity in activities" :key="activity.log_id">
                <p>Location: {{ activity.location }}</p>
                <p>Distance: {{ activity.distance }}</p>
                <p>Mode of Transport: {{ activity.mode_of_transport }}</p>
                <p>Time: {{ activity.time }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            activities: []  // This will hold the activities fetched from the database
        };
    },
    created() {
        this.fetchData();  // Call fetchData when the component is created
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/activity');
                this.activities = response.data;  // Store the response data in activities
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        }
    }
};
</script>