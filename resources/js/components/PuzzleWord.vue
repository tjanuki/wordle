<template>
  <div class="border w-16 h-16 m-1 text-4xl font-bold flex justify-center items-center"
       :class="{ 'pop-in border-black border-2 ': answer.status === 'draft', 'border-gray-400': !answer.status}"
  >
    {{ answer.word ? answer.word.toUpperCase() : '' }}
  </div>
</template>
<script>
import Word from '../word.js'

export default {
  props: {
    answer: {
      type: Object,
      default: new Word()
    }
  }
}
</script>