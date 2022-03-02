<template>
  <div class="flex flex-col justify-between items-center h-screen w-full">
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
  components: {PuzzleKeyboards, PuzzleTable}
}
</script>