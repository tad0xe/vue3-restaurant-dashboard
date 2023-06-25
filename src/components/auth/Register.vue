<template>
  <div>

     <body class="h-100 pt-5">
      <div class="authincation h-100">
        <div class="container h-100">
          <div class="row justify-content-center h-100 align-items-center">
            <div class="col-md-6">
              <div class="authincation-content">
                <div class="row no-gutters">
                  <div class="col-xl-12">
                    <div class="auth-form">
                      <h4 class="text-center mb-4">Sign up your account</h4>
                      <form @submit.prevent="registerUser">
                        <div class="form-group">
                          <label class="mb-1"><strong>Username</strong></label>
                          <input
                            type="text"
                            v-model="name"
                            class="form-control"
                            placeholder="username"
                          >
                        </div>
                        <div class="form-group">
                          <label class="mb-1"><strong>Email</strong></label>
                          <input
                            type="email"
                            v-model="email"
                            class="form-control"
                            placeholder="hello@example.com"
                          >
                        </div>
                        <div class="form-group">
                          <label class="mb-1"><strong>Password</strong></label>
                          <input
                            type="password"
                            v-model="password"
                            class="form-control"
                            placeholder="*****"

                          >
                        </div>
                         <div class="form-group">
                          <div class="custom-control custom-checkbox ml-1">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="basic_checkbox_1"
                              v-model="isAdmin"
                            >
                            <label
                              class="custom-control-label"
                              for="basic_checkbox_1"
                            >is Admin</label>
                          </div>
                        </div>
                        <div class="text-center mt-4">
                          <button
                            type="submit"
                            class="btn btn-primary btn-block"
                          >Sign me up</button>
                        </div>
                      </form>
                      <div class="new-account mt-3">
                        <p>Already have an account? <router-link to="/login"> <a
                            class="text-primary"

                          >Sign in</a></router-link></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </body>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
       isAdmin: false
    };
  },
  methods: {
    ...mapActions(["REGISTER_USER"]),
    registerUser() {

      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
         isAdmin: this.isAdmin
      };

      this.REGISTER_USER(payload)
        .then(response => {
             //const message =response.data.message
             Swal.fire('Registration successful:')

          // Handle success scenario
           this.$router.push({ name: "login" });
        })
        .catch(err => {
            const message = err.message

             Swal.fire('Oh oo!', `${message}`, 'error')
          // Handle error scenario
        });
    }
  }
};
</script>
