
<script>
import axios from "axios";
import ApexCharts from "apexcharts";

export default {
  methods: {
    trackVisit() {
      axios.get("https://api.ipify.org?format=json").then(response => {
        const ipAddress = response.data.ip;
        const count = 1; // Set the count value (can be dynamic based on your logic)
        const data = {
          ipAddress, // Set the IP address if needed
          userAgent: navigator.userAgent, // Get the user agent from the browser
          count,
          url: window.location.href
        };

        axios
          .post("https://restaurant-n54j.onrender.com/api/visit", data)
          .then(response => {
            // Handle the response
           // console.log(response.data.message);
          })
          .catch(error => {
            // Handle the error
            console.error(error);
          });
      });
    }
  },
  mounted() {
    this.trackVisit();
  }
};
</script>
