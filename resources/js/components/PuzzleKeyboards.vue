<template>
  <div class="flex flex-col justify-between align-center mb-2">
    <div class="flex justify-center">
      <KeyButton input-key="Q" />
      <KeyButton input-key="W" />
      <KeyButton input-key="E" />
      <KeyButton input-key="R" />
      <KeyButton input-key="T" />
      <KeyButton input-key="Y" />
      <KeyButton input-key="U" />
      <KeyButton input-key="I" />
      <KeyButton input-key="O" />
      <KeyButton input-key="P" />
    </div>
    <div class="flex justify-center">
      <KeyButton input-key="A" />
      <KeyButton input-key="S" />
      <KeyButton input-key="D" />
      <KeyButton input-key="F" />
      <KeyButton input-key="G" />
      <KeyButton input-key="H" />
      <KeyButton input-key="J" />
      <KeyButton input-key="K" />
      <KeyButton input-key="L" />
    </div>
    <div class="flex justify-center">
      <KeyButton input-key="enter" />
      <KeyButton input-key="Z" />
      <KeyButton input-key="X" />
      <KeyButton input-key="C" />
      <KeyButton input-key="V" />
      <KeyButton input-key="V" />
      <KeyButton input-key="N" />
      <KeyButton input-key="M" />
      <KeyButton input-key="del"/>
    </div>
  </div>
</template>
<script>
import KeyButton from "./KeyButton";
export default {
  components: {KeyButton},
}
</script>