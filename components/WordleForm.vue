<script setup lang="ts">
import words from '~/words'

const emit = defineEmits(['submit'])

const good = ref('');
const bad = ref('');

const puzzleInputs = ref<HTMLDivElement | null>(null);

const puzzle = ref([
  "",
  "",
  "",
  "",
  "",
])

function hasUniqueLetters(word: string) {
  const letters = word.split('');

  return letters.every(letter => {
    return letters.filter(l => l === letter).length === 1
  })
}

function isLetter(letter: string) {
  return /^[a-z]*$/.test(letter.toLowerCase())
}

function doesNotIntersect(letters1: string[], letters2: string[]) {
  return letters1.every(letter => !letters2.includes(letter))
}

function onGoodInput(evt: Event) {
  const value = (evt.target as HTMLInputElement).value.trim().toLowerCase();

  if (!isLetter(value)) {
    (evt.target as HTMLInputElement).value = good.value;
    return
  }

  if (!hasUniqueLetters(value)) {
    (evt.target as HTMLInputElement).value = good.value;
    return
  }

  if (!doesNotIntersect(value.split(''), bad.value.split(''))) {
    (evt.target as HTMLInputElement).value = good.value;
    return
  }

  good.value = value;

  // Manually set the DOM input value to the final computed value i.e lowercased and trimmed.
  (evt.target as HTMLInputElement).value = good.value;
}

function onBadInput(evt: Event) {
  const value = (evt.target as HTMLInputElement).value;

  if (!isLetter(value)) {
    (evt.target as HTMLInputElement).value = bad.value;
    return
  }

  if (!hasUniqueLetters(value)) {
    (evt.target as HTMLInputElement).value = bad.value;
    return
  }

  if (!doesNotIntersect(value.split(''), good.value.split('')) || !doesNotIntersect(value.split(''), puzzle.value.filter(Boolean))) {
    (evt.target as HTMLInputElement).value = bad.value;
    return
  }

  bad.value = value.toLowerCase();

  // Manually set the DOM input value to the final computed value i.e lowercased and trimmed.
  (evt.target as HTMLInputElement).value = bad.value;
}

function onLetterInput(index: number, evt: Event) {
  let value = (evt.target as HTMLInputElement).value.trim().toLowerCase();

  if (!isLetter(value)) {
    (evt.target as HTMLInputElement).value = '';
    value = '';
  }

  // Reset the input value if it's empty or the value is in the bad letters.
  if (!value || bad.value && bad.value.includes(value)) {
    (evt.target as HTMLInputElement).value = '';
    value = '';
  }

  puzzle.value[index] = value;

  // Focus on the next input if the current input has a value.
  if (value) {
    (puzzleInputs.value!.children[Math.min(index + 1, 4)] as HTMLInputElement).focus()
  }
}

function onsubmit() {
  const possibleWords = []

  for (const word of words) {
    if (bad.value.split('').some(letter => word.toLowerCase().includes(letter))) {
      continue
    }

    const hasValidLetter = puzzle.value.every((letter, index) => {
      if (!letter) {
        return true
      }

      return word.at(index)!.toLowerCase() === letter.toLowerCase()
    })

    if (!hasValidLetter) {
      continue
    }

    const goodLetters = good.value.split('');

    if (goodLetters.length > 0 && !goodLetters.every(letter => word.toLowerCase().includes(letter))) {
      continue
    }

    possibleWords.push(word)
  }

  emit('submit', possibleWords)
}
</script>

<template>
  <div class="rounded bg-white">
    <form
      action="#"
      class="p-4 space-y-5"
      @submit.prevent="onsubmit"
    >
      <label class="block">
        <div class="text-sm">Good Letters</div>
        <input
          type="text"
          class="mt-2 w-full rounded border px-4 py-2 uppercase font-mono"
          maxlength="5"
          :value="good"
          @input="onGoodInput"
        >
      </label>

      <label class="block">
        <div class="text-sm">Bad Letters</div>
        <input
          type="text"
          class="mt-2 w-full rounded border px-4 py-2 uppercase font-mono"
          :value="bad"
          @input="onBadInput"
        >
      </label>

      <div>
        <div class="text-sm">Puzzle</div>
        <div
          ref="puzzleInputs"
          class="mt-2 grid grid-cols-5 divide-x border"
        >
          <label
            v-for="i in 5"
            :key="i"
          >
            <span class="sr-only">Letter {{ i }}</span>
            <input
              type="text"
              class="w-full text-center px-4 py-2 uppercase"
              maxlength="1"
              :value="puzzle[i - 1]"
              @input="onLetterInput(i - 1, $event)"
            >
          </label>
        </div>
      </div>

      <button
        type="submit"
        class="bg-green-400 text-white font-bold w-full rounded px-4 py-2"
      >
        Find Word
      </button>
    </form>
  </div>
</template>
