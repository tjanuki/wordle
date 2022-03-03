<template>
  <div class="bg-gray-300 border-gray font-bold px-4 py-4 mx-1 my-1 rounded"
       @click="clickButton"
  >{{ inputKey.toUpperCase() }}
  </div>
</template>
<script>
export default {
  props: {
    inputKey: String,
  },
  methods: {
    clickButton() {
      if (this.inputKey === 'del') {
        return this.$store.dispatch('deleteWord')
      }

      if (this.inputKey === 'enter') {
        return this.$store.dispatch('enterRow')
      }

      this.$store.dispatch('clickButton', {
        key: this.inputKey
      })
    },
  }
}
</script>
