

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/views/HomeView.vue'
import isAdmin from "@/helpers/isAdmin.js";
import GoogleLoginCallback from '@/components/views/GoogleLoginCallback.vue';



const routes = [{
  path: "/",
  name: "home",
  component: HomeView,
},
{
  path: '/about',
  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../components/views/AboutView.vue')
},
{
  path: "/all-products",
  name: "Homeview",
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/views/HomeView.vue")
},
{
  path: '/auth/google/callback',
  component: GoogleLoginCallback,
},


{
  path: "/dash",
  name: "dash",
  beforeEnter: isAdmin,
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/dash.vue")
},

{
  path: "/email/draft",
  name: "draft",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/app/email/draft.vue")
},
{
  path: "/email/trash",
  name: "trash",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/app/email/trash.vue")
},
{
  path: "/email/important",
  name: "important",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/app/email/important.vue")
},
{
  path: "/email/sent",
  name: "sent",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/app/email/sent.vue")
},
{
  path: "/email/inbox",
  name: "inbox",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/app/email/inbox.vue")
},

{
  path: "/payment",
  name: "payment",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/Payment.vue")
},

{
  path: "/login",
  name: "login",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/auth/Login.vue")
},
{
  path: "/register",
  name: "register",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/auth/Register.vue")
},
{
  path: "/forgot-password",
  name: "forgot-password",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import(
      /* webpackChunkName: "about" */
      "../components/auth/ForgotPassword.vue"
    )
},
{
  path: "/reset",
  name: "reset",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/auth/Reset.vue")
},
{
  path: "/profile",
  name: "profile",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/auth/Profile.vue")
},

{
  path: "/product/:id",
  name: "product",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/Product.vue")
},

{
  name: "address",
  path: "/address",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/address/Address.vue")
},
{
  name: "add",
  path: "/add",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/address/Add.vue")
},

{
  path: "/review/:id",
  name: "review",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/Review.vue"),

},
{
  path: "/dum",
  name: "dum",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
 // beforeEnter: isAdmin,
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/dum.vue")
},
{
  path: "/rex",
  name: "rex",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.

  beforeEnter: isAdmin,
  component: () =>
    import( /* webpackChunkName: "about" */ "../components/rex.vue")
},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
