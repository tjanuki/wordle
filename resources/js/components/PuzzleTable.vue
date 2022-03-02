<template>
  <div class="flex flex-col">
    <PuzzleRow v-for="(answer, index) in answers"
               :key="index"
    />
  </div>
</template>

<script>
import PuzzleRow from "./PuzzleRow";

export default {
  components: {PuzzleRow},
  data() {
    return {
      answers: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ],
    }
  }
}
</script>