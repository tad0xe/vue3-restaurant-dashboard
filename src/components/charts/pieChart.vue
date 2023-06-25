<template>
  <div>
    <!-- Filter buttons -->
    <div>
      <div class="card-header border-0 pb-0 d-sm-flex d-block">
        <div>
          <h4 class="card-title mb-1">Orders Summary</h4>
          <small class="mb-0">Lorem ipsum dolor sit amet, consectetur</small>
        </div>
        <div class="card-action card-tabs mt-3 mt-sm-0">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: filter === 'monthly' }"
                @click="setFilter('monthly')"
                role="tab"
              >
                Monthly
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: filter === 'weekly' }"
                @click="setFilter('weekly')"
                role="tab"
              >
                Weekly
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: filter === 'daily' }"
                @click="setFilter('daily')"
                role="tab"
              >
                Today
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-body orders-summary">
        <div class="d-flex order-manage p-3 align-items-center mb-4">
          <a class="btn fs-22 py-1 btn-success px-4 mr-3">{{ filteredNewOrderCount }}</a>
           <div>
    <div class="mb-0 header-title text-sm">New Orders <i class="fa fa-circle text-success ml-1 fs-15"></i></div>
  </div>
  <router-link to="/dash?activeTab=orders" class="ml-auto text-primary font-w500 text-sm">
    Manage orders <i class="ti-angle-right ml-1"></i>
  </router-link>
        </div>
        <div class="row">
          <div class="col-sm-4 mb-4">
            <div class="border px-3 py-3 rounded-xl">
              <h2 class="fs-32 font-w600 counter"> {{ filteredOnDeliveryCount }}</h2>
              <p class="fs-16 mb-0">On Delivery</p>
            </div>
          </div>
          <div class="col-sm-4 mb-4">
            <div class="border px-3 py-3 rounded-xl">
              <h2 class="fs-32 font-w600 counter"> {{ filteredDeliveredCount }}</h2>
              <p class="fs-16 mb-0">Delivered</p>
            </div>
          </div>
          <div class="col-sm-4 mb-4">
            <div class="border px-3 py-3 rounded-xl">
              <h2 class="fs-32 font-w600 counter">{{ filteredCancelledCount }}</h2>
              <p class="fs-16 mb-0">Canceled</p>
            </div>
          </div>
        </div>
        <div>
          <div class="col-sm-4">
            <apexchart
              width="500"
              type="pie"
              :options="chartOptions"
              :series="chartSeries"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    ...mapGetters(["getOrders"]),
    filteredNewOrderCount() {
      return this.filteredData.filter((order) => order.status === "New Order").length;
    },
    filteredDeliveredCount() {
      return this.filteredData.filter((order) => order.status === "delivered").length;
    },
    filteredCancelledCount() {
      return this.filteredData.filter((order) => order.status === "cancelled").length;
    },
    filteredOnDeliveryCount() {
      return this.filteredData.filter((order) => order.status === "on Delivery").length;
    },
    filteredData() {
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

      if (this.filter === "daily") {
        const filteredOrders = this.getOrders.filter(
          (order) =>
            new Date(order.created_at).toISOString().substr(0, 10) ===
            today.toISOString().substr(0, 10)
        );
       // console.log("Filtered Orders (Daily):", filteredOrders);
        return filteredOrders;
      } else if (this.filter === "weekly") {
        const filteredOrders = this.getOrders.filter(
          (order) =>
            new Date(order.created_at).getTime() >= weekAgo.getTime() &&
            new Date(order.created_at).getTime() <= today.getTime()
        );
        //console.log("Filtered Orders (Weekly):", filteredOrders);
        return filteredOrders;
      } else if (this.filter === "monthly") {
        const filteredOrders = this.getOrders.filter(
          (order) =>
            new Date(order.created_at).getTime() >= monthAgo.getTime() &&
            new Date(order.created_at).getTime() <= today.getTime()
        );
        //console.log("Filtered Orders (Monthly):", filteredOrders);
        return filteredOrders;
      }
    },
chartOptions() {
  return {
    labels: ["Delivered", "Cancelled", "On Delivery"],
    responsive: [
      {
        breakpoint: 576, // Breakpoint for small screens (e.g., mobile devices)
        options: {
          chart: {
            width: "100%"
          }
        }
      },
      {
        breakpoint: 768, // Breakpoint for medium screens (e.g., tablets)
        options: {
          chart: {
            width: "80%"
          }
        }
      },
      {
        breakpoint: undefined, // Default options for all other screens
        options: {
          chart: {
            width: "60%"
          }
        }
      }
    ]
  };
},

    chartSeries() {
      const statusCount = {
        delivered: 0,
        cancelled: 0,
        onDelivery: 0,
      };

      this.filteredData.forEach((order) => {
        if (order.status === "delivered") {
          statusCount.delivered++;
        } else if (order.status === "cancelled") {
          statusCount.cancelled++;
        } else if (order.status === "on Delivery") {
          statusCount.onDelivery++;
        }
      });

      return Object.values(statusCount);
    },
  },
  data() {
    return {
      filter: "monthly",
    };
  },
  watch: {
    filter() {
      this.updateChart();
    },
    getOrders() {
      this.updateChart();
    },
  },
  mounted() {
    this.$store.dispatch("fetchOrders");
  },
  methods: {
    setFilter(filter) {
      this.filter = filter;
    },
    updateChart() {
      // The chart is automatically updated via computed properties
    },
  },
};
</script>
