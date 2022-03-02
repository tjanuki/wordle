<template>
  <div class="bg-gray-300 border-gray font-bold px-4 py-4 mx-1 my-1 rounded">{{ inputKey.toUpperCase() }}</div>
</template>
<script>
export default {
  props: {
    inputKey: String,
  }
}
</script>
