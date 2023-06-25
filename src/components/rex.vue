<template>
  <div>
    <span ref="countUpElement">{{ count }}</span>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';


export default {
  data() {
    return {
      count: 0,
      endCount: 8955,
      duration: 10, // Animation duration in seconds
      delay: 0.2, // Delay before animation starts in seconds
    };
  },
  mounted() {
    this.animateCountUp();
  },

};
</script>
