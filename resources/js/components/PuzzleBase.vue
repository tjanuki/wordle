<template>
  <div
    class="flex h-screen w-full flex-col items-center justify-between"
    @keyup.delete="keyUp"
  >
    <header class="border-bottom flex w-full justify-center border py-2">
      <h1 class="font-serif text-4xl font-bold">
        <span>Wordle Solver</span>
      </h1>
    </header>

    <ModalMessage />
    <div class="flex w-full items-center justify-center">
      <PuzzleTable />
    </div>

    <div class="flex flex-col justify-center align-middle">
      <p class="text-center mb-2 text-md text-gray-500">
        Tired of solving Wordle?<br> Let's solve it automatically!
      </p>

      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-500"
        :disabled="isLoading"
        @click="solve"
      >
        Solve it!
      </button>
    </div>

    <PuzzleKeyboards />
  </div>
</template>

<script>
import PuzzleTable from './PuzzleTable'
import PuzzleKeyboards from './PuzzleKeyboards'
import ModalMessage from './ModalMessage'

export default {
  components: { ModalMessage, PuzzleKeyboards, PuzzleTable },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  created() {
    this.$store.dispatch('init')
    document.addEventListener('keyup', this.keyUp)
  },
  methods: {
    keyUp(event) {
      if (event.keyCode === 8) {
        // Backspace or Delete
        this.$store.dispatch('deleteAnswer')
      }
      if (event.keyCode === 13) {
        // Enter
        this.$store.dispatch('enterRow')
      }
      if (65 <= event.keyCode && event.keyCode <= 90) {
        // A - Z
        this.$store.dispatch('clickButton', {
          key: String.fromCharCode(event.keyCode)
        })
      }
    },
    solve() {
      this.$store.dispatch('solve')
    }
  },
  onUnmounted() {
    document.removeEventListener('keyup')
  }
}
</script>
