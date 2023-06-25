<template>
  <div class="contet-body">
    <div class="continer-fluid">
      <div class="row page-titles mx-0">
        <div class="col-sm-6 p-md-0">
          <div class="welcome-text">
            <h4>Hi, welcome back!</h4>
            <p class="mb-0">Your business dashboard template</p>
          </div>
        </div>
        <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="javascript:void(0)">Layout</a></li>
            <li class="breadcrumb-item active"><a href="javascript:void(0)">Blank</a></li>
          </ol>
        </div>
      </div>
      <div class="row">
        <div
          class="col-lg-12 col-xl-6"
          v-for="product in products"
          :key="product._id"
        >
          <div class="card">
            <div class="card-body">
              <div class="row m-b-30">
                <div class="col-md-5 col-xxl-12">
                  <div class="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
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
                  </div>
                </div>
                <div class="col-md-7 col-xxl-12">
                  <div class="new-arrival-content position-relative">
                    <h4>{{ product.title }}</h4>

                    <br>

                    <span class="price">${{ product.price }}</span>
                    <br>
                       <p>Availability: <span class="item">{{product.availability ? 'In stock' : 'Out of stock'}} <i class="fa fa-shopping-basket"></i></span></p>

                    <p>Product code: <span class="item">0405689</span> </p>
                    <p>Brand: <span class="item">Lee</span></p>
                    <p class="text-content">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.</p>
                    <div class="comment-review star-rating text-right">
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
                      <span class="ml-3 text-dark">{{product.reviews.length}} reviews</span>
                    </div>
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
      this.likeProducts(productId) // Dispatch the action with the productId
        .then(() => {
          this.isLiked = true; // Update the isLiked state after successful like
          console.log(`Liked product with ID: ${productId}`);
        })
        .catch(error => {
          console.error(error);
        });
    },
    ...mapActions(["incrementViews", "likeProducts"]),
    handleClick(productId) {
      this.incrementViews(productId);
    }
  }
};
</script>