<template>
  <div class="grid grid-cols-5 gap-2">
    <PuzzleWord
      v-for="(answer, index) in answers"
      :key="index"
      :answer="answer"
      :class="{ shake: isInvalid }"
    />
  </div>
</template>

<script>
import PuzzleWord from './PuzzleWord'

export default {
  components: { PuzzleWord },
  props: {
    row: {
      type: Number,
      required: true,
    },
  },
  computed: {
    answers() {
      let inputAnswers = this.$store.state.answers[this.row] || []
      return inputAnswers.concat(new Array(5 - inputAnswers.length))
    },
    isInvalid() {
      if (this.row !== this.$store.state.currentRow) {
        return false
      }

      return this.$store.state.gameStatus === 'invalid'
    },
  },
}
</script>
