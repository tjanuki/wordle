<template>
  <div class="flex">
    <PuzzleWord v-for="answer in answers"
                :answer="answer"
    />
  </div>
</template>

<script>
import PuzzleWord from "./PuzzleWord";
export default {
  components: {PuzzleWord},
  props: {
    row: Number
  },
  computed: {
    answers() {
      let inputAnswers = this.$store.state.answers[this.row] || []
      return inputAnswers.concat(new Array(5 - inputAnswers.length))
    }
  }
}
</script>