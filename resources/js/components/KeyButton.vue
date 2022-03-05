<template>
  <div
    class="xs:text-md xs:px-4 xs:py-4 mx-1 my-1 flex w-[10%] justify-center rounded py-4 text-sm font-bold uppercase"
    :class="{
      'border-green-600 bg-green-600': isExact,
      'border-amber-300 bg-amber-300': isUsed,
      'border-gray-500 bg-gray-500': isInvalid,
      'border-gray bg-gray-300': isEmpty,
    }"
    @click="clickButton"
  >
    <span :class="{ 'text-white': !isEmpty }"><slot /></span>
  </div>
</template>
<script>
export default {
  props: {
    inputKey: {
      type: String,
      required: true,
    },
  },
  computed: {
    status() {
      let status = ''
      for (let i = 0; i < this.$store.state.currentRow; i++) {
        for (let j = 0; j < 5; j++) {
          let word = this.$store.state.answers[i][j]
          if (word.word === this.inputKey) {
            if (word.isExact()) {
              return 'exact'
            }
            if (word.isUsed()) {
              status = 'used'
            }
            if (word.isInvalid()) {
              status = 'invalid'
            }
          }
        }
      }

      return status
    },
    isEmpty() {
      return this.status === ''
    },
    isExact() {
      return this.status === 'exact'
    },
    isUsed() {
      return this.status === 'used'
    },
    isInvalid() {
      return this.status === 'invalid'
    },
  },
  methods: {
    clickButton() {
      if (this.inputKey === 'del') {
        return this.$store.dispatch('deleteAnswer')
      }

      if (this.inputKey === 'enter') {
        return this.$store.dispatch('enterRow')
      }

      this.$store.dispatch('clickButton', {
        key: this.inputKey,
      })
    },
  },
}
</script>
