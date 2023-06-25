<template>
  <div>
    <button @click="showNotification">Show Notification</button>
  </div>
</template>

<script>
export default {
  methods: {
    showNotification() {
      this.$notify({
        title: 'Hello',
        text: 'Notification message'
      });
    }
  }
}
</script>
