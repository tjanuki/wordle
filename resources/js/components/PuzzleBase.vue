<template>
  <div class="flex flex-col justify-between items-center h-screen w-full"
       @keyup.delete="keyUp"
  >
    <header class="flex justify-center py-2 border border-bottom w-full">
      <h1 class="text-4xl font-bold font-serif">Wordle</h1>
    </header>

    <PuzzleTable/>

    <PuzzleKeyboards/>
  </div>
</template>

<script>
import PuzzleTable from "./PuzzleTable";
import PuzzleKeyboards from "./PuzzleKeyboards";

export default {
  components: {PuzzleKeyboards, PuzzleTable},
  methods: {
    keyUp(event) {
      // console.log('Base', event);
      // console.log('KeyCode:' + event.key, event.keyCode);
      if (event.keyCode === 8) { // Backspace or Delete
        this.$store.dispatch('deleteWord')
      }
      if (event.keyCode === 13) { // Enter
        this.$store.dispatch('enterRow')
      }
      if (65 <= event.keyCode && event.keyCode <= 90) { // A - Z
        // console.log('KeyCode:' + event.key, event.keyCode);
        // console.log('FromCharCode:' + String.fromCharCode(event.keyCode));
        this.$store.dispatch('clickButton', {
          key: String.fromCharCode(event.keyCode)
        })
      }
    }
  },
  created() {
    document.addEventListener('keyup', this.keyUp)
  },
  onUnmounted() {
    document.removeEventListener('keyup')
  }

}
</script>