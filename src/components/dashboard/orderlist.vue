<template>
  <div class="content-ody">
    <!-- row -->
    <div class="container-flui">
      <div class="form-head d-flex mb-3 align-items-start">
        <div class="mr-auto d-none d-lg-block">
          <h2 class="text-black font-w600 mb-0">Orders</h2>
          <p class="mb-0">Here is your order list data</p>
        </div>

      </div>
      <div>
        <div class="filter row align-items-center">
          <div class="col-auto">
            <label for="statusFilter">Filter by Status:</label>
          </div>
          <div class="col-auto">
            <select
              id="statusFilter"
              v-model="selectedStatus"
              @change="applyFilters"
              class="form-select"
            >
              <option value="">All</option>
              <option value="New Order">New Order</option>
              <option value="on Delivery">On Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div class="col-auto">
            <input
              type="text"
              class="form-control"
              v-model="searchQuery"
              placeholder="Search by Order ID"
            >
          </div>
        </div>

        <div class="table-container">
          <table class="custom-table ">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Deliver to</th>
                <th>Amount</th>
                <th>Status Order</th>
                <th>Update Status</th>
              </tr>
            </thead>
              <tbody class="">
              <tr
                v-for="(order, index) in paginatedOrders"
                :key="order.id"
              >
                <td>{{ order._id }}</td>
                <td>{{ order.created_at }}</td>
                <td>{{ orderOwnerNames[order.owner] }}</td>
                <td>
                  {{ getUserAddress(order.owner)?.streetAddress || 'N/A' }}
                </td>
                <td>
                  <span
                    v-for="product in order.products"
                    :key="product.productID._id"
                  >
                    ${{ product.totalPrice }}
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-sm light fs-16"
                    :class="{
                  'btn-success': order.status === 'delivered',
                  'btn-danger': order.status === 'cancelled',
                  'btn-warning': order.status === 'New Order',
                  'btn-primary': order.status === 'on Delivery'
                }"
                    @click="updateOrderStatus(order._id)"
                  >
                    {{ order.status }}
                  </button>
                </td>
                <td>
                  <div class="dropdown ml-auto text-right">
                    <div
                      class="btn-link"
                      data-toggle="dropdown"
                    >
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                          ></rect>
                          <circle
                            fill="#000000"
                            cx="5"
                            cy="12"
                            r="2"
                          ></circle>
                          <circle
                            fill="#000000"
                            cx="12"
                            cy="12"
                            r="2"
                          ></circle>
                          <circle
                            fill="#000000"
                            cx="19"
                            cy="12"
                            r="2"
                          ></circle>
                        </g>
                      </svg>
                    </div>
                    <div class="dropdown-menu dropdown-menu-right">
                      <button
                        class="btn-success btn btn-sm light fs-4"
                        @click="updateOrderStatus(order._id, 'delivered')"
                      >
                        Delivered
                      </button>
                      <button
                        class="btn-primary btn btn-sm light fs-4"
                        @click="updateOrderStatus(order._id, 'on Delivery')"
                      >
                        On Delivery
                      </button>
                      <button
                        class="btn-danger btn btn-sm light fs-4"
                        @click="updateOrderStatus(order._id, 'cancelled')"
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button
            class="pagination-btn"
            :disabled="currentPage === 1"
            @click="prevPage"
          >Previous</button>
          <button
            v-for="page in totalPages"
            :key="page"
            class="pagination-btn"
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button
            class="pagination-btn"
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      selectedStatus: "", // Selected filter status
      searchQuery: "", // Search query
      currentPage: 1, // Current page number
      rowsPerPage: 10 // Number of rows per page
    };
  },
  computed: {
    userAddresses() {
      const userAddresses = {};
      const addresses = this.$store.getters.addresses;
      const ownerId = this.order && this.order.owner;

      if (ownerId) {
        for (const address of addresses) {
          if (address.user === ownerId) {
            userAddresses[ownerId] = address;
            break; // Stop the loop after finding the matching address
          }
        }
      }

      return userAddresses;
    },

    orderOwnerNames() {
      const orderOwnerNames = {};
      const users = this.$store.getters.getUsers;
      for (const user of users) {
        orderOwnerNames[user._id] = user.name;
      }
      return orderOwnerNames;
    },
    ...mapGetters(["getOrders", "addresses"]),
    filteredOrders() {
      // Filter orders based on selected status and search query
      return this.getOrders.filter(order => {
        const statusMatch = this.selectedStatus
          ? order.status.toLowerCase() === this.selectedStatus.toLowerCase()
          : true;
        const searchMatch = this.searchQuery
          ? order._id.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true;
        return statusMatch && searchMatch;
      });
    },
    paginatedOrders() {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      return this.filteredOrders.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.rowsPerPage);
    }
  },
  mounted() {
    this.$store.dispatch("fetchOrders");
    this.fetchAddresses();
  },
  methods: {
    getUserAddress(userId) {
      const addresses = this.$store.getters.addresses;
      const userAddress = addresses.find(address => address.user === userId);
      return userAddress || null;
    },
    ...mapActions(["updateOrderStatus", "fetchAddresses"]),
    updateOrderStatus(orderId, status) {
      // Dispatch the updateOrderStatus action from the Vuex store
      this.$store
        .dispatch("updateOrderStatus", { orderId, status })
        .then(() => {
        //  console.log("Order status updated successfully.");
        })
        .catch(error => {
          console.error("Error updating order status:", error);
        });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
    applyFilters() {
      this.currentPage = 1; // Reset to the first page when applying filters
    }
  }
};
</script>

<style>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.custom-table th,
.custom-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.custom-table th {
  background-color: #f5f5f5;
}

.custom-table td button {
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 4px;
}

.custom-table td .dropdown-menu {
  margin-top: 5px;
}

.custom-table td .dropdown-menu button {
  width: 100%;
  text-align: left;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination button {
  border: 1px solid #ccc;
  background-color: #fff;
  color: #000;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #007bff;
  color: #fff;
}

.filter {
  margin-bottom: 10px;
}

.filter label {
  margin-right: 5px;
}
.table-container {
  overflow-x: auto;
}

.scrollable-tbody {
  display: block;
  white-space: nowrap;
}
</style>
