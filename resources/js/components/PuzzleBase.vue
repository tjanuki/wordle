<template>
  <div class="flex flex-col justify-between items-center h-screen w-full">
    <header class="flex justify-center py-2 border border-bottom w-full">
      <h1 class="text-4xl font-bold font-mono">Wordle</h1>
    </header>

    <PuzzleTable/>

    <div class="keyboards">
      keyboards
    </div>
  </div>
</template>

<script>
import PuzzleTable from "./PuzzleTable";
export default {
  components: {PuzzleTable}
}
</script>