<template>
  <div
    id="app"
    style="padding-top:100px;"
  >

    <nav>
      <topp />
    </nav>

    <div class="">
      <div class="">
        <div>
     <notifications position="top right" classes="my-custom-class" />
    </div>
        <router-view />
        <sitemap />

      </div>

    </div>

  </div>
</template>
<script>
import topp from "./components/homepage/topp.vue";
import sitemap from "./components/sitemap.vue";
export default {
  components: {
    topp,
    sitemap
  }
};
</script>

<style>
</style>
