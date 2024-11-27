//Specifically 

<script>
import axios from 'axios';
export default{
    data() {
        return {
            startPosition: null,
            endPosition:  null,
            timeElapsed: '',
            modeOfTransport: ''
        };
    },
    methods: {
        async submitUserData() {
        try {

            //Creates an array containing this info
            const userData = {
                userName: this.userName,
                startPosition: this.startPosition,
                endPosition: this.endPosition,
                timeElapsed: this.timeElapsed,
                modeOfTransport: this.modeOfTransport
            };

            //Puts information at that temporary /database/insertUser address 
            const response = await axios.post('http://localhost:3000/database/insertUser', userData);

            if (response.status === 200) {
                alert('User data inserted successfully');
            }

        } catch (error) {
            console.error('Error inserting user data:', error);
            alert('Failed to insert user data');
            }
        }
    }   
}
</script>