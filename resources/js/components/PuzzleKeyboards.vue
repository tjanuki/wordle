<template>
  <div
    class="mb-2 flex w-full max-w-[500px] flex-col items-center justify-between"
  >
    <div class="flex w-full justify-center">
      <KeyButton
        v-for="(key, index) in keyboards[0]"
        :key="index"
        :input-key="key"
      >
        {{ key }}
      </KeyButton>
    </div>
    <div class="flex w-full justify-center">
      <div class="min-w-[5%]" />
      <KeyButton
        v-for="(key, index) in keyboards[1]"
        :key="index"
        :input-key="key"
      >
        {{ key }}
      </KeyButton>
      <div class="min-w-[5%]" />
    </div>
    <div class="flex w-full justify-center">
      <KeyButton
        input-key="enter"
        class="w-[15%] min-w-max"
      >
        ENTER
      </KeyButton>
      <KeyButton
        v-for="(key, index) in keyboards[2]"
        :key="index"
        :input-key="key"
      >
        {{ key }}
      </KeyButton>
      <KeyButton
        input-key="del"
        class="w-[15%] min-w-max"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="none"
            d="M0 0h24v24H0z"
          />
          <path
            d="M6.535 3H21a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.535a1 1 0 0 1-.832-.445l-5.333-8a1 1 0 0 1 0-1.11l5.333-8A1 1 0 0 1 6.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"
          />
        </svg>
      </KeyButton>
    </div>
  </div>
</template>
<script>
import KeyButton from './KeyButton'

export default {
  components: { KeyButton },
  data() {
    return {
      keyboards: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
      ],
    }
  },
}
</script>
