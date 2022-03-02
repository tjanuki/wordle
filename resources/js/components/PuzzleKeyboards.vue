<template>
  <div class="flex flex-col justify-between align-center mb-2">
    <div class="flex justify-center">
      <KeyButton input-key="q" />
      <KeyButton input-key="w" />
      <KeyButton input-key="e" />
      <KeyButton input-key="r" />
      <KeyButton input-key="t" />
      <KeyButton input-key="y" />
      <KeyButton input-key="u" />
      <KeyButton input-key="i" />
      <KeyButton input-key="o" />
      <KeyButton input-key="p" />
    </div>
    <div class="flex justify-center">
      <KeyButton input-key="a" />
      <KeyButton input-key="s" />
      <KeyButton input-key="d" />
      <KeyButton input-key="f" />
      <KeyButton input-key="g" />
      <KeyButton input-key="h" />
      <KeyButton input-key="j" />
      <KeyButton input-key="k" />
      <KeyButton input-key="l" />
    </div>
    <div class="flex justify-center">
      <KeyButton input-key="ENTER" />
      <KeyButton input-key="z" />
      <KeyButton input-key="x" />
      <KeyButton input-key="c" />
      <KeyButton input-key="v" />
      <KeyButton input-key="b" />
      <KeyButton input-key="n" />
      <KeyButton input-key="m" />
      <KeyButton input-key="m" />
      <KeyButton input-key="DEL" />
    </div>
  </div>
</template>
<script>
import KeyButton from "./KeyButton";
export default {
  components: {KeyButton}
}
</script>