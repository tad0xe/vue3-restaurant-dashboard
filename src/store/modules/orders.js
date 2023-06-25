// store/index.js



import axiosInstance from "../../helpers/axiosInstance";


const state = {
    orders: [],

};
const mutations = {

    SET_ORDERS(state, orders) {
        state.orders = orders;
    },
};
const actions = {
    updateOrderStatus({ commit }, { orderId, status }) {
        return new Promise((resolve, reject) => {
          axiosInstance.put(`/order/${orderId}/update-status`, { status })
            .then(response => {
              const order = response.data.order;
              // Handle the updated order data as needed
              // For example, commit a mutation to update the order state in the store
              // commit('UPDATE_ORDER', order);

              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      },

    fetchOrders({
        commit
    }) {
        return axiosInstance
            .get('/orders')
            .then((response) => {
                commit('SET_ORDERS', response.data.products);
            })
            .catch((error) => {
                console.error(error);
            });
    },
};
const getters = {
    getOrders(state) {
        return state.orders;
    },
    getOrdersLength: state => state.orders.length,
    deliveredCount(state) {
        return state.orders.filter(order => order.status === "delivered").length
    },
    cancelledCount(state) {
        return state.orders.filter(order => order.status === "cancelled").length
    },
    onDeliveryCount(state) {
        return state.orders.filter(order => order.status === "on Delivery").length
    },

    totalPercent(state) {
        const totalOrders = state.orders.length;
        // console.log(state.products.products.length)
        return ((totalOrders / 100));

    },
    totalOrdersPrice: (state) => {
        let total = 0;
        state.orders.forEach((order) => {
            order.products.forEach((product) => {
                total += product.totalPrice
            });
        });
        return total;
    },

    totalOrdersPercentage: (state, getters) => {
        const totalOrders = getters.totalOrdersPrice;
        //const totalSales = getters.totalSales;
        return totalOrders / 100;
    },

};


export default {

    state,
    mutations,
    actions,
    getters
}