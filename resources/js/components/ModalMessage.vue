<template>
  <div
    v-show="message"
    class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-start justify-center min-h-screen pt-48 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="bg-black px-5 py-4 rounded-lg">
        <span class="text-white">{{ message }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    message() {
      return this.$store.state.message;
    }
  },
}
</script>