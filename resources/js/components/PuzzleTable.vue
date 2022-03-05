<template>
  <div class="grid h-[420px] w-[350px] grid-rows-6 flex-col gap-2 p-2">
    <PuzzleRow
      v-for="index in Array(6).keys()"
      :key="index"
      :row="index"
    />
  </div>
</template>

<script>
import PuzzleRow from './PuzzleRow'

export default {
  components: { PuzzleRow },
}
</script>
