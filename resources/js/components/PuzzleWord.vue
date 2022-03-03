<template>
  <div class="border w-16 h-16 m-1 text-4xl font-bold flex justify-center items-center"
       :class="{ 'pop-in border-black border-2 ': answer.isDraft(), 'border-green-600 bg-green-600': answer.isExact(), 'border-amber-300 bg-amber-300': answer.isUsed(), 'border-gray-500 bg-gray-500': answer.isInvalid(), 'border-gray-400': answer.isEmpty()}"
  >
    <span :class="{'text-white': answer.isFixed()}">{{ answer.word }}</span>
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