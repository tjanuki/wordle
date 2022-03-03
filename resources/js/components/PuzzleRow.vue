<template>
  <div class="flex">
    <div v-for="answer in answers"
         class="border border-gray-400 w-16 h-16 m-1 text-4xl font-bold flex justify-center items-center">
      {{ answer && answer.word ? answer.word.toUpperCase() : '' }}
    </div>
  </div>
</template>

<script>
export default {
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