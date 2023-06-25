<template>
  <div>
    <div>

      <div class="">
        <div class="container-fluid">
          <div class="row page-titles mx-0">
            <div class="col-sm-6 p-md-0">

            </div>
            <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/">Home</router-link>
                </li>
                <li class="breadcrumb-item active"><a href="javascript:void(0)">{{product.title}}</a></li>
              </ol>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-xl-3 ">
                      <!-- Tab panes -->
                      <div class="tab-content">
                        <div role="tabpanel" class="tab-pane fade show active custom-tab-pane" id="first">
  <img class="img-fluid"
    v-if="product && product.photos && product.photos.length > 0"
    :src="product.photos[0]"
    alt="">
</div>
                        <div
                          role="tabpanel"
                          class="tab-pane fade"
                          id="second"
                        >
                          <img
                            class="img-fluid"
                            v-if="product && product.photos && product.photos.length > 1"
                            :src="product.photos[1]"
                            alt=""
                          >
                        </div>
                        <div
                          role="tabpanel"
                          class="tab-pane fade"
                          id="third"
                        >
                          <img
                            class="img-fluid"
                            v-if="product && product.photos && product.photos.length > 2"
                            :src="product.photos[2]"
                            alt=""
                          >
                        </div>
                        <div
                          role="tabpanel"
                          class="tab-pane fade"
                          id="fourth"
                        >
                          <img
                            class="img-fluid"
                            v-if="product && product.photos && product.photos.length > 3"
                            :src="product.photos[3]"
                            alt=""
                          >
                        </div>
                      </div>

                      <div class="tab-slide-content new-arrival-product mb-4 mb-xl-0">
                        <!-- Nav tabs -->
                        <ul
                          class="nav slide-item-list mt-3"
                          role="tablist"
                        >
                          <li
                            role="presentation"
                            class="show"
                          >
                            <a
                              href="#first"
                              role="tab"
                              data-toggle="tab"
                            >
                              <img
                                class="img-fluid"
                                v-if="product && product.photos && product.photos.length > 0"
                                :src="product.photos[0]"
                                alt=""
                              >
                            </a>
                          </li>
                          <li role="presentation">
                            <a
                              href="#second"
                              role="tab"
                              data-toggle="tab"
                            ><img
                                class="img-fluid"
                                v-if="product && product.photos && product.photos.length > 0"
                                :src="product.photos[1]"
                                alt=""
                              ></a>
                          </li>
                          <li role="presentation">
                            <a
                              href="#third"
                              role="tab"
                              data-toggle="tab"
                            ><img
                                class="img-fluid"
                                v-if="product && product.photos && product.photos.length > 0"
                                :src="product.photos[3]"
                                alt=""
                              ></a>
                          </li>
                          <li role="presentation">
                            <a
                              href="#for"
                              role="tab"
                              data-toggle="tab"
                            ><img
                                class="img-fluid"
                                v-if="product && product.photos && product.photos.length > 0"
                                :src="product.photos[2]"
                                alt=""
                              ></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!--Tab slider End-->
                    <div class="col-xl-9 col-sm-12">
                      <div class="product-detail-content">
                        <!--Product details-->
                        <div class="new-arrival-content pr">
                          <h4>{{product.title}}</h4>
                          <div class="star-rating mb-2">
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
                            <span class="review-text">({{reviewsLength }}) / </span><a
                              class="product-review"
                              @click="openModal1"
                            >Write a review?</a>/<a
                              class=""
                              @click="openModal2"
                            >
                              view reviews</a>
                          </div>
                          <p class="price">${{product.price}}</p>
                          <p>Availability: <span class="item">{{product.availability ? 'In stock' : 'Out of stock'}} <i class="fa fa-shopping-basket"></i></span>

                          </p>
                          <p>Product code: <span class="item">0405689</span> </p>
                          <p>Brand: <span class="item">Lee</span></p>

                          <p class="text-content">{{product.description}}</p>

                          <div class="col-2 px-0">
                            <div>
                              <label for="quantity">Quantity:</label>
                              <input
                                type="number"
                                id="quantity"
                                v-model="quantity"
                                min="1"
                              />
                            </div>
                            <p class="text-content"> total Price: {{quantity * product.price}}</p>

                          </div>
                          <!-- Quantity End -->
                          <div v-if="user.address">
                            <h6>Delivery Details</h6>
                            <p>Street Address: {{ user.address.streetAddress }}</p>
                            <p>City: {{ user.address.city }}</p>
                            <p>number: {{ user.address.phoneNumber }}</p>
                            <!-- Display other address properties here -->
                          </div>
                          <!-- If user.address is null or undefined -->
                          <div v-else>
                            <h6>No Address Found</h6>
                            <p>Please add an address. <router-link
                                to="/profile"
                                class="ml-auto text-primary font-w500"
                              >Add address</router-link>
                            </p>
                          </div>
                          <spinner v-if="loading" />

                          <div class="payment-container pt-5">
                            <StripeElements
                              v-if="stripeLoaded"
                              v-slot="{ elements, instance }"
                              ref="elms"
                              :stripe-key="stripeKey"
                              :instance-options="instanceOptions"
                              :elements-options="elementsOptions"
                              class="stripe-elements"
                            >
                              <StripeElement
                                ref="card"
                                :elements="elements"
                                :options="cardOptions"
                                class="stripe-card"
                              />
                            </StripeElements>
                            <button
                              type="button"
                              class="pay-button"
                              :disabled="!product.availability"
                              :class="{ 'disabled-button': !product.availability }"
                              @click="pay"
                            >Pay</button>
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

      </div>
      <div>
        <div
          v-if="isModalOpen2"
          class="modal-overlay"
        >
          <div class="modal-container">
            <!-- Modal content -->
            <div class="custom-modal">
              <div class="modal-content-container">
                <div
                  v-for="review in product.reviews"
                  :key="review._id"
                >
                  <h4>headline: {{ review.headline }}</h4>
                  <p>body: {{ review.body }}</p>
                  <p>
                    Rating:
                    <div class="star-rating">
                      <template v-for="star in 5">
                        <i
                          class="fa fa-star"
                          :class="{ 'text-orange': star <= review.rating }"
                        ></i>
                      </template>
                    </div>
                  </p>
                  <p>User: {{ review.user }}</p>
                </div>
              </div>
              <button
                class="modal-close-btn btn-danger"
                @click="closeModal2"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          v-if="isModalOpen1"
          class="modal-overlay"
        >
          <div class="modal-container">
            <!-- Modal content -->
            <div class="custom-modal">
              <div class="modal-content-container">
                <div class="a-spacing-top-medium">
                  <h1 class="a-spacing-base">
                    <b>Create Review</b>
                  </h1>
                  <div class="row">
                    <!-- Content -->
                  </div>
                  <div class="a-spacing-top-medium"></div>
                  <hr>
                  <h4>{{ productTitle }}</h4>

                  <h2 class="a-spacing-base">Overall Rating</h2>
                  <div class="a-row">
                    <!-- Rating -->

                    <div>
                      <span
                        v-for="index in 5"
                        :key="index"
                        @click="setRating(index)"
                        :class="['star', { 'selected': index <= rating }]"
                      >
                        <i class="fa fa-star"></i>
                      </span>
                      <p>Selected Rating: {{ rating }}</p>
                    </div>

                  </div>
                  <div class="a-row a-spacing-top-large">

                  </div>
                  <div class="a-row a-spacing-top-medium">

                  </div>
                  <div class="a-spacing-top-large"></div>
                  <hr>
                  <!-- Headline -->
                  <div class="headline a-spacing-large">
                    <h2 class="a-spacing-base">Add a headline</h2>
                    <input
                      type="text "
                      class="a-input-text form-control"
                      style="width: 70%;"
                      placeholder="What's most important to know?"
                      v-model="headline"
                    >
                  </div>
                  <!-- Body -->
                  <div class="a-spacing-base">
                    <h2 class="a-spacing-base">Write your review</h2>
                    <textarea
                      class="form-control"
                      placeholder="What do you like or dislike? What did you see this product for?"
                      style="height:6em; width: 100%;"
                      v-model="body"
                    ></textarea>
                  </div>
                </div>

                <hr>
                <div class="a-spacing-top-medium">
                  <p style="font-size: 14px; font-weight: 700;">This is how you'll appear to other customers:</p>
                  <div class="media a-spacing-top-large">
                    <div class="media-left">
                      <img
                        src="/img/avatar.png"
                        class="img-fluid"
                        style="width: 50px;"
                      >
                    </div>
                    <div class="media-body pl-3 pt-2">
                      <input
                        type="text"
                        class="a-input-text form-control"
                        style="width: 100%;"
                        :value="name"
                      >
                    </div>
                  </div>
                </div>
                <div class="a-row a-spacing-top-medium">
                  <span class="a-color-tertiary">Don't worry, you can always change this on your profile</span>
                </div>
                <div class="a-row text-right a-spacing-top-large">
                  <button
                    class="btn-primary border-1 btn-sm"
                    @click="onAddReview"
                  >Submit</button>
                </div>
              </div>
              <button
                class="modal-close-btn btn-danger"
                @click="closeModal1"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>
<script>
import { StripeElements, StripeElement } from "vue-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { defineComponent, ref, onBeforeMount } from "vue";
import axios from "axios";
import Spinner from "@/components/spinner.vue";

import axiosInstance from "@/helpers/axiosInstance";
import review from "@/components/Review";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";

export default defineComponent({
  name: "CardOnly",
  components: {
    StripeElements,
    StripeElement,
    review,
    Spinner
  },

  data() {
    return {
      stripeKey:
        "pk_test_51KGqWkHCcyZvTrDrTmAbtZkngRWbP0FCvV3bgZnz8GXuleqD1fo1lRa5seDD3qKsk0irYLumaH3SeI5cILED3pwq00NR023dNZ",
      instanceOptions: {},
      elementsOptions: {},
      cardOptions: {
        value: {
          postalCode: "12345"
        }
      },
      rating: 0,
      quantity: 1,
      stripeLoaded: false,
      loading: false,
      totalPrice: null,
      isModalOpen1: false,
      isModalOpen2: false
    };
  },
  computed: {
    ...mapGetters(["getProduct", "getUser", "getToken", "getReviews"]),
    product() {
      return this.getProduct;
    },
    user() {
      return this.getUser;
    },
    reviewsLength() {
      const product = this.getProduct;
      if (product && product.reviews) {
        return product.reviews.length;
      }
      return 0;
    }
  },
  mounted() {
    const stripePromise = loadStripe(this.stripeKey);
    stripePromise.then(() => {
      this.stripeLoaded = true;
    });
    this.setActive("tab1");
    const productId = this.$route.params.id;
    this.fetchProduct(productId);
    this.fetchProductReviews(productId)
      .then(() => {
       // console.log("Reviews fetched successfully:", this.fetchProductReviews);
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
      });
  },
  methods: {
    pay() {
      this.loading = true;
      const cardElement = this.$refs.elms.elements.getElement("card");

      this.$refs.elms.instance
        .createToken(cardElement)
        .then(result => {
        //  console.log(result);
          const token = result.token;

          this.totalPrice = this.product ? this.product.price : null; // Assign product price to totalPrice if product is defined

          const paymentData = {
            token: token.id,
            totalPrice: this.product ? this.product.price * this.quantity : 0,
            productId: this.product ? this.product._id : null,
            quantity: this.quantity
          };

          // Perform your custom logic here using the paymentData

         // console.log("Payment data:", paymentData);

          // Call the function to send payment data to the server
          this.sendPaymentData(paymentData);
        })
        .catch(error => {
          //console.log(error);
          // Handle error
          // Display error message or redirect to an error page
        });
    },

    sendPaymentData(paymentData) {
      // const token = localStorage.getItem("token");

      axiosInstance
        .post("http://localhost:5000/api/pay", paymentData, {})
        .then(response => {
          //  console.log(response);
          this.loading = false;

          const totalPrice = this.product
            ? this.product.price * this.quantity
            : 0;
          Swal.fire("Payment made:", "Total Price: $" + totalPrice);

          // Handle the response from the server
          // Display success message or redirect to a success page
        })
        .catch(error => {
          this.loading = false;

          //console.log(error);
          Swal.fire("check your details:");

          // Handle error
          // Display error message or redirect to an error page
        });
    },
    openModal1() {
      this.isModalOpen1 = true;
    },
    openModal2() {
      this.isModalOpen2 = true;
    },
    closeModal1() {
      this.isModalOpen1 = false;
    },
    closeModal2() {
      this.isModalOpen2 = false;
    },
    isActive(tab) {
      return this.activeItem === tab;
    },
    setActive(tab) {
      this.activeItem = tab;
    },
    setRating(index) {
      this.rating = index;
    },
    onChangeQuantity(event, product) {
      let qty = parseInt(event.target.value);
      this.$store.commit("changeQty", { product, qty });
    },
    checkQty(prodQty, qty) {
      if (parseInt(prodQty) === parseInt(qty)) {
        return true;
      } else {
        return false;
      }
    },
    async onAddReview() {
      try {
        const reviewData = {
          productId: this.$route.params.id,
          review: {
            headline: this.headline,
            body: this.body,
            rating: this.rating
          }
        };
       // console.log(reviewData);

        await this.$store.dispatch("onAddReview", reviewData);
        await this.$store.dispatch(
          "fetchProductReviews",
          this.$route.params.id
        ); // Fetch the updated reviews for the product
        this.$router.push(`/product/${this.$route.params.id}`);
        this.isModalOpen1 = false;
      } catch (err) {
       // console.log(err);
      }
    },
    async fetchProductReviews(productId) {
      await this.$store.dispatch("fetchProductReviews", productId); // Dispatch the action to fetch product reviews
      this.reviewsLength = this.getReviews.length; // Update the reviewsLength using the getter
    },

    ...mapActions([
      "fetchProduct",
      "addProductToCart",
      "likeProducts",
      "fetchProductReviews"
    ])
  }
});
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-tab-pane {
  background-color: transparent;
}
.tab-container {
  max-width: 500px;
  margin: 0 auto;
}

.tab-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab-buttons button {
  background-color: #eee;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.tab-buttons button:hover {
  background-color: #ddd;
}

.tab-buttons button.active {
  background-color: #ccc;
}

.tab-content .tab-pane {
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-top: none;
  display: none;
}

.tab-content .tab-pane.active {
  display: block;
}
.custom-modal {
  /* Add your custom modal styles here */
}
.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
}
.star {
  color: #ccc; /* Default star color */
  cursor: pointer;
}
.disabled-button {
  filter: blur(3px); /* Apply the blur effect */
}
.payment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stripe-elements {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.stripe-card {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.pay-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.pay-button:hover {
  background-color: #45a049;
}

.pay-button:active {
  background-color: #3e8e41;
}
.modal-content-container {
  height: 300px; /* Set the desired height */
  overflow-y: auto; /* Enable vertical scroll */
}
.star.selected {
  color: gold; /* Selected star color */
}
.modal-close-btn {
  margin-top: 10px;
}
</style>
