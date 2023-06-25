<template>

  <body class="h-100 pt-5">
    <div class="authincation h-100">
      <div class="container h-100">
        <div class="row justify-content-center h-100 align-items-center">
          <div class="col-md-6">
            <div class="authincation-content">
              <div class="row no-gutters">
                <div class="col-xl-12">
                  <div class="auth-form">
                    <h4 class="text-center mb-4">Sign in your account</h4>
                    <form @submit.prevent="">
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
                          plaeholder="****"
                        >
                      </div>
                      <div class="form-row d-flex justify-content-between mt-4 mb-2">

                        <div class="form-group text-center">
                          <router-link to="/forgot-password">
                            <a>Forgot Password?</a>
                          </router-link>
                        </div>
                      </div>
                      <div class="text-center">
                        <button
                          @click="loginUser"
                          class="btn btn-primary btn-block"
                          type="submit"
                        >Sign Me In</button>
                      </div>
                      <br>
                      <div>
                        <button
                          @click="login"
                          class="btn btn-primary btn-block"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="24px"
                            height="24px"
                          >
                            <path
                              fill="#4285F4"
                              d="M45.7,20.8H24.5v7.9h11.4c-0.4,2.1-1.6,3.9-3.4,5.2v4.3h5.5c3.2-2.9,5.1-7.3,5.1-12.2C43.6,25.7,44.8,23.1,45.7,20.8z"
                            />
                            <path
                              fill="#34A853"
                              d="M24.5,41.1c4.6,0,8.5-1.5,11.4-4h-5.5c-1.5,0.9-3.4,1.5-5.9,1.5c-4.5,0-8.3-3-9.7-7.1l-5.8,4.5C11.7,38.6,17.6,41.1,24.5,41.1z"
                            />
                            <path
                              fill="#FBBC04"
                              d="M14.8,28c-0.1-1.3-0.2-2.7-0.2-4c0-1.3,0.1-2.7,0.2-4l-5.8-4.5c-1.6,3.6-1.6,7.7,0,11.3L14.8,28z"
                            />
                            <path
                              fill="#EB4335"
                              d="M24.5,13.6c2.4,0,4.4,0.8,5.9,2.2l4.4-4.4C33,8.9,28.9,7.2,24.5,7.2c-6.9,0-12.8,2.5-17.4,6.6l5.8,4.5C16.2,16.5,20,13.6,24.5,13.6z"
                            />
                          </svg>
                          Login Using Google
                        </button>
                      </div>

                    </form>
                    <div class="new-account mt-3">
                      <p>Don't have an account? <router-link to="/register"><a class="text-primary">Sign up</a></router-link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--**********************************
        Scripts
    ***********************************-->
    <!-- Required vendors -->

  </body>
</template>
<script>

import { mapActions } from "vuex";
import { googleSdkLoaded } from "vue3-google-login";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["LOGIN_USER", "sendCodeToBackend"]),
    login() {
      googleSdkLoaded(google => {
        google.accounts.oauth2
          .initCodeClient({
            client_id:
              "58730156701-d27fqgjbhmuqt974hav87of8hofgi6i0.apps.googleusercontent.com",
            scope: "email profile openid",
            redirect_uri: "https://restaurant-n54j.onrender.com/auth/callback",
            callback: response => {
              if (response.code) {
                this.sendCodeToBackend(response.code);
              }
            }
          })
          .requestCode();
      });
    },
    loginUser() {
      const payload = {
        email: this.email,
        password: this.password
      };

      this.LOGIN_USER(payload)
        .then(response => {
          const decodedToken = jwt_decode(response.token);
         // console.log(decodedToken);
          // Access the decoded token properties
          const isAdmin = decodedToken.isAdmin;

          Swal.fire("login successful");

          // Redirect based on user role
          //console.log("isAdmin:", isAdmin);
          this.$router.push('/')


        })
        .catch(err => {
          const message = err.message;

          Swal.fire("Oh oo!", `${message}`, "error");
        });
    }
  }
};
</script>
<style scoped>
</style>
