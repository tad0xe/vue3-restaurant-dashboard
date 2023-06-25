<template>
  <div class="content-boy">
    <div class="container-flud">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label
            for="title"
            class="form-label"
          >Title:</label>
          <input
            v-model="title"
            type="text"
            id="title"
            name="title"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label
            for="brand"
            class="form-label"
          >Brand:</label>
          <input
            v-model="brand"
            type="text"
            id="brand"
            name="brand"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label
            for="description"
            class="form-label"
          >Description:</label>
          <textarea
            v-model="description"
            id="description"
            name="description"
            class="form-control"
          ></textarea>
        </div>

        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="availability"
            v-model="availability"
          />
          <label
            class="form-check-label"
            for="availability"
          >Availability</label>
        </div>

        <div class="mb-3">
          <label
            for="price"
            class="form-label"
          >Price:</label>
          <input
            v-model="price"
            type="number"
            id="price"
            name="price"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label
            for="stockQuantity"
            class="form-label"
          >Stock Quantity:</label>
          <input
            v-model="stockQuantity"
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label
            for="photos"
            class="form-label"
          >Photos:</label>
          <input
            ref="fileInput"
            type="file"
            name="photos"
            multiple
            class="form-control"
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary"
        >Create Product</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  // ...other code

  data() {
    return {
      categoryID: "",
      title: "",
      brand: "",
      size: "",
      description: "",
      price: null,
      stockQuantity: null,
      availability: false
    };
  },

  methods: {
    ...mapActions(["createProduct"]),

    async handleSubmit() {
      const fileInput = this.$refs.fileInput;
      const formData = new FormData();

      // Add product data
      formData.append("categoryID", this.categoryID);
      formData.append("title", this.title);
      formData.append("brand", this.brand);
      formData.append("size", this.size);
      formData.append("description", this.description);
      formData.append("availability", this.availability);
      //console.log(this.availability)

      formData.append("price", this.price);
      formData.append("stockQuantity", this.stockQuantity);

      // Add images
      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        formData.append("photos", file);
      }

      try {
        const response = await this.createProduct(formData);

        // Handle success, reset form, show success message, etc.
           Swal.fire("product created");
        //console.log("Product created:", response);
      } catch (error) {
        // Handle error, show error message, etc.
        console.error("Product creation failed:", error);
      }
    }
  }
};
</script>
