<template>
  <div class="flex-col w-[350px] h-[420px] p-2 grid grid-rows-6 gap-2">
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