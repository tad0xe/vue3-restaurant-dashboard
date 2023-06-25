<template>
  <div>
    <div class="nav-header">
      <router-link
        to="/"
        class="ml-auto brand-logo text-primary font-w500"
      >

        <img
          class="logo-abbr"
          src="/frontend/images/logo.png"
          alt=""
        >
        <div>
          <img
            class="logo-compact"
            src="/frontend/images/logo-text.png"
            alt=""
          >
        </div>

        <img
          class="brand-title"
          src="/frontend/images/logo-text.png"
          alt=""
        >
      </router-link>

    </div>

    <!--**********************************
            Nav header end
        ***********************************-->

    <!--**********************************
            Chat box start
        ***********************************-->

    <div class="header">
      <div class="header-content">
        <nav class="navbar navbar-expand">
          <div
            class="collapse navbar-collapse justify-content-between"
            :class="{ show: isNavOpen }"
          >
            <div class="header-left">
              <SearchBar></SearchBar>
            </div>
             <div v-if="!getToken">
               <button class="btn btn-sm btn-primary white">
                  <router-link :to="`/login`" class="text-white"> login </router-link>
               </button>


             </div>
            <ul class="navbar-nav header-right">

              <li class="nav-item dropdown header-profile">
                <a
                  class="nav-link d-flex align-items-center"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                >
                  <div class="header-ino p-2 custom-header-info">
                    <!-- Add d-flex and align-items-center classes -->
                    <span class="mr-2 header-text">Hello, <strong>{{ currentUser && currentUser.name ? currentUser.name : 'Guest' }}</strong></span>
                    <img
                      v-if="currentUser"
                      :src="currentUser.picture"
                      alt=""
                      width="20"
                    >
                  </div>
                </a>

                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item ai-icon">
                    <svg
                      id="icon-user1"
                      xmlns="http://www.w3.org/2000/svg"
                      class="text-primary"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle
                        cx="12"
                        cy="7"
                        r="4"
                      ></circle>
                    </svg>
                    <span class="ml-2">
                      <router-link :to="`/profile`">Profile</router-link>
                    </span>
                  </a>
                  <a
                    href="./email-inbox.html"
                    class="dropdown-item ai-icon"
                  >

                    <span class="ml-2" v-if="isAdmin"> <router-link :to="`/dash`">Dashboard</router-link></span>
                  </a>
                  <a class="dropdown-item ai-icon">
                    <svg
                      id="icon-logout"
                      xmlns="http://www.w3.org/2000/svg"
                      class="text-danger"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line
                        x1="21"
                        y1="12"
                        x2="9"
                        y2="12"
                      ></line>
                    </svg>
                    <span
                      class="ml-2"
                      @click="logout"
                    >Logout </span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SearchBar from "@/components/searchBar.vue";

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      navOpen: false,
      searchQuery: ""
    };
  },
  computed: {
    ...mapGetters(["currentUser","isAdmin", "error", "getToken"])
  },
  methods: {
    ...mapActions(["getUser", "getTokenFromStorage", "logout"])
  },

  mounted() {
    this.getUser()
      .then(user => {
        // console.log("User:", user);
      })
      .catch(error => {
        // console.log("Error:", error);
      });
  },
  created() {
    this.getTokenFromStorage();
  }
};
</script>
<style>
#sidemenu nav {
  width: 200px;
  background: grey;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

.custom-header-info {
  background-color: #2f4cdd;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;

}
@media (max-width: 576px) {
  .custom-header-info {
    margin-bottom: 14%
  }

  .header-text {
    font-size: 14px;
  }
}
#sidemenu .sidemenu__btn {
  display: block;
  width: 50px;
  height: 50px;
  background: grey;
  border: none;
  position: relative;
  z-index: 100;
  appearance: none;
  cursor: pointer;
  outline: none;
}

#sidemenu .sidemenu__btn span {
  display: block;
  width: 20px;
  height: 2px;
  margin: auto;
  background: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.4s ease;
}

#sidemenu .sidemenu__btn span.top {
  transform: translateY(-8px);
}

#sidemenu .sidemenu__btn span.bottom {
  transform: translateY(8px);
}

#sidemenu .sidemenu__btn.active span.top {
  transform: rotate(-45deg);
}

#sidemenu .sidemenu__btn.active .mid {
  transform: translateX(-20px) rotate(360deg);
  opacity: 0;
}

#sidemenu .sidemenu__btn.active span.bottom {
  transform: rotate(45deg);
}

#sidemenu .sidemenu__wrapper {
  padding-top: 50px;
}
@media (max-width: 576px) {
  .header-text {
    font-size: 14px; /* Adjust the font size as needed */
  }
}
#sidemenu .sidemenu__list {
  padding-top: 50px;
  list-style: none;
  padding: 0;
  margin: 0;
}

#sidemenu .sidemenu__item a {
  text-decoration: none;
  line-height: 1.6em;
  font-size: 1.6em;
  padding: 0.5em;
  display: block;
  color: white;
  transition: 0.4s ease;
}

#sidemenu .sidemenu__item a:hover {
  background: lightgrey;
  color: dimgrey;
}

.translateX-enter {
  transform: translateX(-200px);
  opacity: 0;
}

.translateX-enter-active,
.translateX-leave-active {
  transform-origin: top left 0;
  transition: 0.2s ease;
}

.translateX-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
</style>
