<template>
  <div
    class="flex aspect-square items-center justify-center border text-4xl font-bold"
    :class="{
      'pop-in border-2 border-black ': answer.isDraft(),
      'border-2 border-black ': answer.isChecked(),
      'border-green-600 bg-green-600': answer.isExact(),
      'border-amber-300 bg-amber-300': answer.isUsed(),
      'border-gray-500 bg-gray-500': answer.isInvalid(),
      'border-gray-400': answer.isEmpty(),
      'flip': answer.isFixed(),
      'jump border-green-600 bg-green-600': answer.isCompleted(),
    }"
  >
    <span
      class="uppercase"
      :class="{ 'text-white': answer.isFixed() }"
    >{{
      answer.word
    }}</span>
  </div>
</template>
<script>
import Word from '../word.js'

export default {
  props: {
    answer: {
      type: Object,
      default: new Word(),
    },
  },
}
</script>
