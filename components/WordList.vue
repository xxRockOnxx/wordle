<script setup lang="ts">
const props = defineProps({
  words: {
    type: Array as PropType<string[]>,
    required: true,
  },
})
</script>

<template>
  <div class="flex-shrink-0 w-full max-w-md flex flex-col rounded bg-white">
    <div class="p-4">Possible words:</div>

    <div
      v-if="props.words.length === 0"
      class="p-4 text-center italic"
    >
      Fill up the form to generate possible words.
    </div>

    <ul
      v-else
      class="p-4 overflow-y-auto list-disc list-inside"
      style="flex: 1 0 0;"
    >
      <li
        v-for="word in props.words"
        :key="word"
      >
        {{ word }}
      </li>
    </ul>
  </div>
</template>
