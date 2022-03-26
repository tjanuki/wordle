<template>
  <div
    class="flex h-screen w-full flex-col items-center justify-between"
    @keyup.delete="keyUp"
  >
    <header class="border-bottom flex w-full justify-center border py-2">
      <h1 class="font-serif text-4xl font-bold">
        <span>Wordle Solver</span>
      </h1>
      <a
        class="absolute top-4 right-2"
        href="https://github.com/tjanuki/wordle"
        target="_blank"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      ><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></a>
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
