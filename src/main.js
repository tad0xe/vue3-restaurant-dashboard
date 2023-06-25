import {
    createApp
} from 'vue'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";
import router from './router'
import store from './store'
import Notifications from '@kyvg/vue3-notification'




import vue3GoogleLogin from 'vue3-google-login'


store.commit('loadCartFromStorage'); // Load cart data from localStorage

import VueSweetalert2 from "vue-sweetalert2";


createApp(App).use(store,'apexchart', Notifications,VueSweetalert2, VueApexCharts,vue3GoogleLogin, {
     }).use(router).mount('#app')