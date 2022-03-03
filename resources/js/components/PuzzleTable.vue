<template>
  <div class="flex flex-col">
    <PuzzleRow v-for="index in Array(6).keys()"
               :row="index"
               :key="index"
    />
  </div>
</template>

<script>
import PuzzleRow from "./PuzzleRow";

export default {
  components: {PuzzleRow},
}
</script>