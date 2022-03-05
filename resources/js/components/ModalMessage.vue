<template>
  <div
    v-show="message"
    class="fixed inset-0 z-10 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex min-h-screen items-start justify-center px-4 pt-48 pb-20 text-center sm:block sm:p-0"
    >
      <div class="rounded-lg bg-black px-5 py-4">
        <span class="text-white">{{ message }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    message() {
      return this.$store.state.message
    },
  },
}
</script>
