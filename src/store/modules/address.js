// address.js

import axios from "axios";
import axiosInstance from "@/helpers/axiosInstance";

const state = {
    country: "",
    fullName: "",
    users: [],
    user: null,
    addresses: [],
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    deliveryInstructions: "",
    securityCode: "",
    usersWithAddresses: [],
    error: null,
};

const mutations = {
    SET_USERS_WITH_ADDRESSES(state, users) {
        state.usersWithAddresses = users;
      },
      setError(state, error) {
        state.error = error;
      },
    setAddressField(state, {
        field,
        value
    }) {
        state[field] = value;
    },
    clearAddressFields(state) {
        for (const field in state) {
            state[field] = "";
        }
    },
    setAddresses(state, addresses) {
        state.addresses = addresses;
      },
    setMessage: (state, message) => (state.message = message),
    removeAddress: (state, index) => state.addresses.splice(index, 1),

};

const actions = {
    fetchAddresses({ commit }) {
        return new Promise((resolve, reject) => {
          axiosInstance.get('/address')
            .then(response => {
              const addresses = response.data.addresses;
              commit('setAddresses', addresses);
              resolve(addresses);
            })
            .catch(error => {
              console.error(error);
              reject(error);
            });
        });
      },
      fetchUsersWithAddresses({ commit }) {
        return axiosInstance
          .get("/users-with-addresses")
          .then((response) => {
            const users = response.data.users;
            commit("SET_USERS_WITH_ADDRESSES", users);
            return users;
          })
          .catch((error) => {
            commit("setError", error.response.data.message);
            return Promise.reject(error.response.data.message);
          });
      },


    deleteAddress({
        commit,
        rootState
    }, {
        id,
        index
    }) {
        const token = localStorage.getItem("token");
        axios
            .delete(`https://restaurant-n54j.onrender.com/api/addresses/${id}`, {
                headers: {
                    Authorization: "Bearer" + token,
                    "x-access-token": token,
                },
            })
            .then((response) => {
                commit("setMessage", response.message);
                commit("removeAddress", index);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    setDefaultAddress({
        commit,
        rootState
    }, id) {
        const token = localStorage.getItem("token");
        axios
            .put(
                `https://restaurant-n54j.onrender.com/api/addresses/set/default`, {
                    id: id
                }, {
                    headers: {
                        Authorization: "Bearer" + token,
                        "x-access-token": token,
                    },
                }
            )
            .then((res) => {
                commit("setMessage", res.data.message);
            })
            .catch((error) => {
                commit("setMessage", error.message);
                console.log(error);
            });
    },
    addAddress({
        state
    }) {
        // const token = localStorage.getItem("token");
        return axiosInstance
            .post("/addresses", {
                country: state.country,
                fullName: state.fullName,
                streetAddress: state.streetAddress1 + " " + state.streetAddress2,
                city: state.city,
                state: state.state,
                zipCode: state.zipCode,
                phoneNumber: state.phoneNumber,
                deliverInstructions: state.deliveryInstructions,
                securityCode: state.securityCode
            }, {

            })
            .then(response => {
                // Handle successful response if needed
              //  console.log(response);
            })
            .catch(error => {
                // Handle error if needed
              //  console.log(error);
            });
    },
    clearAddressFields({
        commit
    }) {
        commit("clearAddressFields");
    }
};

const getters = {
    addresses: state => state.addresses,
    getUsersWithAddresses: (state) => {
        return state.usersWithAddresses;
      },
      error: (state) => {
        return state.error;
      },

};


export default {
 //   namespaced: true,
    state,
    mutations,
    actions,
    getters
};