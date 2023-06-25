<template>
  <div>
    <div
      class="p-4"
      style="background:#FBFBFB"
    >
      <div class="container-fluid">
        <div class="row page-titles mx-0">
          <div class="col-sm-6 p-md-0">
            <div class="welcome-text">
              <h4>Hi, welcome back!</h4>
              <p class="mb-0">Your business dashboard template</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6"
            v-for="product in products"
            :key="product._id"
          >
            <div class="card border-0">

              <div class="card-body">
                <div class="new-arrival-product">
                  <div class="new-arrivals-img-contnent">
                    <router-link
                      :to="`/product/${product._id}`"
                      @click="handleClick(product._id)"
                      class="text-white"
                    >
                      <img
                        class="img-fluid"
                        :src="product.photos[0]"
                        alt=""
                      />
                    </router-link>
                  </div>
                  <div class="new-arrival-content text-center mt-3">
                    <h4>{{ product.title }}</h4>
                    <template v-for="star in 5">
                      <i
                        class="fa fa-star text-orange"
                        v-if="star <= product.overallRating"
                      ></i>
                      <i
                        class="fa fa-star-half-o text-orange"
                        v-else-if="star - 0.5 === product.overallRating"
                      ></i>
                      <i
                        class="fa fa-star-o text-orange"
                        v-else
                      ></i>
                    </template>
                    <br>

                    <span class="price">${{ product.price }}</span>
                    <br>
                    <a
                      href="#"
                      class="btn btn-primary light btn-sm btn-rounded px-4"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Like"
                    >
                      <i
                        class="fa fa-heart-o primary scale5"
                        @click="onLikeProduct(product.id)"
                      ></i>
                    </a>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      products: [],
      product: {},
      isLiked: false
    };
  },
  computed: {
    ...mapGetters(["getProducts"]),
    products() {
      return this.getProducts;
    }
  },
  mounted() {
    this.$store.dispatch("fetchProducts");
  },
  methods: {
    // Import the required action

    onLikeProduct(productId) {
      // Import the required action and useNotification function

      this.likeProducts(productId) // Dispatch the action with the productId
        .then(res => {
          this.isLiked = true; // Update the isLiked state after successful like
         // console.log(`Liked product with ID: ${productId}`);
          if (res.status === 'success') {
            console.
      this.$notify({
        title: 'Liked',
        message: `Liked product with ID: ${productId}`,
        type: 'success'
      });
    }
        })
        .catch(error => {});
    },
    ...mapActions(["incrementViews", "likeProducts"]),
    handleClick(productId) {
      this.incrementViews(productId);
    }
  }
};
</script>

<style>
.card {
  border-radius: 16px;
}
</style>
