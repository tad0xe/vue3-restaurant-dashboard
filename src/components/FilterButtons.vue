<template>
  <div>
    <!-- Filter buttons -->
    <br>
    <br>
    <button @click="setFilter('daily')">Daily</button>
    <button @click="setFilter('weekly')">Weekly</button>
    <button @click="setFilter('monthly')">Monthly</button>
  </div>
</template>

<script>
export default {
  methods: {
    setFilter(filter) {
      this.$emit('filter-change', filter);
    }
  }
};
</script>
