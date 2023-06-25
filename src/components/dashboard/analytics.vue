<template>
  <div class="content-boy">
    <!-- row -->
    <div class="container-flui">
      <div class="form-head d-flex mb-3 align-items-start">
        <div class="mr-auto d-none d-lg-block">
          <h2 class="text-black font-w600 mb-0">Analytics</h2>
          <p class="mb-0">Here is your restaurant summary with graph view</p>
        </div>

      </div>
      <div class="row">
        <div class="col-xl-6 col-xxl-6 col-lg-12 col-lg-9 col-md-12">
          <div class="row">

            <div class="col-xl-12">
              <div class="card">
                <div class="card-header border-0 pb-0 d-sm-flex d-block">
                  <div>
                    <h4 class="card-title mb-1">Most Favorites Items</h4>
                    <small class="mb-0">Lorem ipsum dolor sit amet, consectetur</small>
                  </div>

                </div>
                <div class="card-body tab-content pb-0">

                  <div
                    class="tab-pane fade show active"
                    id="monthly1"
                  >
                    <div class="row">
                      <div
                        v-for="(product, index) in displayedLikedProducts"
                        :key="index"
                        class="col-md-4 col-xl-4 col-xxl-6 col-sm-6 mb-5"
                      >
                        <div class="media mb-4">
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
                        <div class="info">
                          <h5 class="text-black mb-3">{{product.title}}</h5>
                          <div class="star-review fs-14 mb-3">
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
                          <a
                            href="#"
                            class="btn btn-primary light btn-sm btn-rounded px-4"
                          ><i class="fa fa-heart-o mr-2 scale5 "></i> <strong>{{product.likes}}</strong> Likes</a>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
                <div class="card-footer border-0 pt-0 text-center">
                  <a
                    @click="showLikedProducts"
                    v-if="hasMoreLikedProducts"
                    class="btn-link"
                  >
                    View more <i class="fa fa-angle-down ml-2 scale-2"></i>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-xxl-6 col-lg-12  col-lg-9 col-md-12">
          <div class="row">
            <div class="col-xl-12">
              <div class="card">
                <div class="card-header border-0 pb-0 d-sm-flex d-block">
                  <div>
                    <h4 class="card-title mb-1">Trending Items</h4>
                    <small class="mb-0">Lorem ipsum dolor sit amet, consectetur</small>
                  </div>

                </div>
                <div class="card-body p-0 pt-3">
                  <div
                    class="media items-list-1"
                    v-for="(product,index) in sortedProducts"
                    :key="product._id"
                  >
                    <span class="number col-1 px-0 align-self-center"> {{ index + 1 }} </span>
                    <router-link
                      :to="`/product/${product._id}`"
                      class="text-white"
                    >
                      <img
                        class="img-fluid rounded mr-3"
                        width="85"
                        :src="product.photos[0]"
                        alt="DexignZone"
                      >
                    </router-link>
                    <div class="media-body col-sm-4 col-6 col-xxl-6 px-0">
                      <h5 class="mt-0 mb-3 text-black">{{product.title}}</h5>
                      <small class="text-primary font-w500"><strong class="text-secondary mr-2">${{product.price}}</strong> ({{product.views}} views)</small>
                    </div>
                    <div class="media-footer ml-auto col-3 px-0 d-flex align-self-center align-items-center">

                      <div>
                          Total sales
                        <h3 class="mb-0 font-w600 text-black">{{product.sales}}</h3>

                      </div>
                    </div>
                  </div>
                  <div class="card-footer border-0 pt-0 text-center">
                    <a
                      @click="loadMoreProducts"
                      v-if="showLoadMoreButton"
                      class="text-primary"
                    >
                      View more <i class="fa fa-angle-down ml-2 scale-2"></i>
                    </a>
                  </div>

                </div>
              </div>
            </div>
            <div class="col-xl-12">
              <div class="card">
                <div class="card-header border-0 pb-0 d-sm-flex d-block">
                  <div>
                    <h4 class="card-title mb-1">Most Selling Items</h4>
                    <small class="mb-0">Lorem ipsum dolor sit amet, consectetur</small>
                  </div>

                </div>
                <div class="card-body tab-content">
                  <div
                    class="tab-pane fade show active"
                    id="monthly"
                  >
                    <div
                      class="media mb-4 items-list-2"
                      v-for="(product, index) in displayedProducts"
                      :key="index"
                    >
                      <router-link
                        :to="`/product/${product.product._id}`"
                        class="text-white"
                      >
                        <img
                          class="img-fluid rounded mr-3"
                          width="85"
                          :src="product.product.photos[0]"
                          alt="DexignZone"
                        >
                      </router-link>
                      <div class="media-body col-6 px-0">
                        <h5 class="mt-0 mb-1 text-black">{{ product.product.title }}</h5>
                        <small class="text-primary font-w500 mb-3">{{ product.product.brand }}</small>
                        <span class="text-secondary mr-2 fo"></span>
                        <ul class="fs-14 list-inline">

                        </ul>
                      </div>
                      <div class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                        <h3 class="mb-0 font-w600 text-secondary">${{ product.product.price }}</h3>
                        <div class="dropdown ml-3 ">
                          <button
                            type="button"
                            class="btn btn-secondary sharp tp-btn-light "
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
                          </button>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a
                              class="dropdown-item"
                              href="#"
                            >Edit</a>
                            <a
                              class="dropdown-item"
                              href="#"
                            >Delete</a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div
                    class="tab-pane fade"
                    id="weekly"
                  >
                    <div class="media mb-4 items-list-2">
                      <img
                        class="img-fluid rounded mr-3"
                        width="85"
                        src="frontend/images/dish/pic3.jpg"
                        alt="DexignZone"
                      >
                      <div class="media-body col-6 px-0">
                        <h5 class="mt-0 mb-1 text-black">Meidum Spicy Spagethi Italiano</h5>
                        <small class="text-primary font-w500 mb-3">MAIN COURSE</small>
                        <span class="text-secondary mr-2 fo"></span>
                        <ul class="fs-14 list-inline">
                          <li class="mr-3">Serves for 4 Person</li>
                          <li>24mins</li>
                        </ul>
                      </div>
                      <div class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                        <h3 class="mb-0 font-w600 text-secondary">$11.21</h3>
                        <div class="dropdown ml-3 ">
                          <button
                            type="button"
                            class="btn btn-secondary sharp tp-btn-light "
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
                          </button>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a
                              class="dropdown-item"
                              href="#"
                            >Edit</a>
                            <a
                              class="dropdown-item"
                              href="#"
                            >Delete</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="media mb-4 items-list-2">
                      <img
                        class="img-fluid rounded mr-3"
                        width="85"
                        src="frontend/images/dish/pic2.jpg"
                        alt="DexignZone"
                      >
                      <div class="media-body col-6 px-0">
                        <h5 class="mt-0 mb-1 text-black">Meidum Spicy Spagethi Italiano</h5>
                        <small class="text-primary font-w500 mb-3">MAIN COURSE</small>
                        <span class="text-secondary mr-2 fo"></span>
                        <ul class="fs-14 list-inline">
                          <li class="mr-3">Serves for 4 Person</li>
                          <li>24mins</li>
                        </ul>
                      </div>
                      <div class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                        <h3 class="mb-0 font-w600 text-secondary">$8.15</h3>
                        <div class="dropdown ml-3 ">
                          <button
                            type="button"
                            class="btn btn-secondary sharp tp-btn-light "
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
                          </button>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a
                              class="dropdown-item"
                              href="#"
                            >Edit</a>
                            <a
                              class="dropdown-item"
                              href="#"
                            >Delete</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="media items-list-2">
                      <img
                        class="img-fluid rounded mr-3"
                        width="85"
                        src="frontend/images/dish/pic1.jpg"
                        alt="DexignZone"
                      >
                      <div class="media-body col-6 px-0">
                        <h5 class="mt-0 mb-1 text-black">Meidum Spicy Spagethi Italiano</h5>
                        <small class="text-primary font-w500 mb-3">MAIN COURSE</small>
                        <span class="text-secondary mr-2 fo"></span>
                        <ul class="fs-14 list-inline">
                          <li class="mr-3">Serves for 4 Person</li>
                          <li>24mins</li>
                        </ul>
                      </div>
                      <div class="media-footer align-self-center ml-auto d-block align-items-center d-sm-flex">
                        <h3 class="mb-0 font-w600 text-secondary">$5.67</h3>
                        <div class="dropdown ml-3 ">
                          <button
                            type="button"
                            class="btn btn-secondary sharp tp-btn-light "
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
                          </button>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a
                              class="dropdown-item"
                              href="#"
                            >Edit</a>
                            <a
                              class="dropdown-item"
                              href="#"
                            >Delete</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="card-footer border-0 pt-0 text-center">
                  <a
                    @click="showMoreProducts"
                    v-if="hasMoreProducts"
                    class="btn-link"
                  >
                    View more <i class="fa fa-angle-down ml-2 scale-2"></i>
                  </a>
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      productsToShow: 2, // Initial number of products to display
      likedProductsToShow: 3, // Number of liked products to display
      loadedProducts: 3, // Number of products already loaded
      loadedLikedProducts: 3, // Number of liked products already loaded
      productsPerPage: 3 // Number of products to display per load
    };
  },
  computed: {
    ...mapGetters([
      "getSortedProducts",
      "getLikedProducts",
      "getReviews",
      "sortedProductsWithHighestSelling",
      "getHighestSellingProducts"
    ]),
    sortedProducts() {
      if (this.sortedProductsWithHighestSelling) {
        return this.sortedProductsWithHighestSelling.slice(
          0,
          this.loadedProducts
        );
      } else {
        return [];
      }
    },
    reviews() {
      return this.getReviews;
    },

    displayedProducts() {
      return this.highestSellingProduct.slice(0, this.productsToShow);
    },
    displayedLikedProducts() {
      return this.getLikedProducts.slice(0, this.likedProductsToShow);
    },
    hasMoreProducts() {
      return this.productsToShow < this.highestSellingProduct.length;
    },
    showLoadMoreButton() {
      return this.loadedProducts < this.sortedProductsWithHighestSelling.length;
    },
    highestSellingProduct() {
      if (this.getHighestSellingProducts) {
        return this.getHighestSellingProducts;
      } else {
        return [];
      }
    },
    hasMoreLikedProducts() {
      return this.likedProductsToShow < this.getLikedProducts.length;
    }
  },
  mounted() {
    this.fetchSortedProducts();
    this.fetchLikedProducts();
    this.fetchHighestSellingProducts();
    this.fetchReviews();
  },
  methods: {
    ...mapActions([
      "fetchSortedProducts",
      "fetchLikedProducts",
      "fetchReviews",
      "fetchHighestSellingProducts"
    ]),
    loadMoreProducts() {
      this.loadedProducts += this.productsPerPage;
    },
    showMoreProducts() {
      this.productsToShow += 3; // Increase the number of products to display
    },
    showLikedProducts() {
      this.likedProductsToShow += 3; // Increase the number of liked products to display
      this.loadedLikedProducts = this.likedProductsToShow; // Reset the loadedLikedProducts variable
    }
  }
};
</script>


<style>
/* Component styles here */
</style>
