<template>
  <div class="aspect-square border text-4xl font-bold flex justify-center items-center"
       :class="{ 'pop-in border-black border-2 ': answer.isDraft(), 'border-black border-2 ': answer.isChecked(), 'border-green-600 bg-green-600': answer.isExact(), 'border-amber-300 bg-amber-300': answer.isUsed(), 'border-gray-500 bg-gray-500': answer.isInvalid(), 'border-gray-400': answer.isEmpty(), 'flip': answer.isFixed(), 'border-green-600 bg-green-600 jump': answer.isCompleted()}"
  >
    <span :class="{'text-white': answer.isFixed()}">{{ answer.word.toUpperCase() }}</span>
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