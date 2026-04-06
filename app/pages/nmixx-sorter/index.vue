<script setup lang="ts">
import { computed, onMounted } from 'vue'

type Song = { id: number; title: string; album: string; releaseYear: number }

// List of songs to sort
const songs = [
  {
    id: 1,
    title: "Funky Glitter Christmas",
    album: "Intermixxion Single",
    releaseYear: 2022
  },
  {
    id: 2,
    title: "O.O",
    album: "AD MARE",
    releaseYear: 2022
  },
  {
    id: 3,
    title: "占 (TANK)",
    album: "AD MARE",
    releaseYear: 2022
  },
  {
    id: 4,
    title: "DICE",
    album: "ENTWURF",
    releaseYear: 2022
  },
  {
    id: 5,
    title: "Cool (Your Rainbow)",
    album: "ENTWURF",
    releaseYear: 2022
  },
  {
    id: 6,
    title: "Love Me Like This",
    album: "expérgo (EP)",
    releaseYear: 2023
  },
  {
    id: 7,
    title: "Young, Dumb, Stupid",
    album: "expérgo (EP)",
    releaseYear: 2023
  },
  {
    id: 8,
    title: "PAXXWORD",
    album: "expérgo (EP)",
    releaseYear: 2023
  },
  {
    id: 9,
    title: "Just Did It",
    album: "expérgo (EP)",
    releaseYear: 2023
  },
  {
    id: 10,
    title: "My Gosh",
    album: "expérgo (EP)",
    releaseYear: 2023
  },
  {
    id: 11,
    title: "HOME",
    album: "expérgo (EP)",
    releaseYear: 2023
  },
  {
    id: 12,
    title: "Party O'Clock",
    album: "A Midsummer NMIXX's Dream",
    releaseYear: 2023
  },
  {
    id: 13,
    title: "Roller Coaster",
    album: "A Midsummer NMIXX's Dream",
    releaseYear: 2023
  },
  {
    id: 14,
    title: "DASH",
    album: "Fe3O4: BREAK (EP)",
    releaseYear: 2024
  },
  {
    id: 15,
    title: "Soñar (Breaker)",
    album: "Fe3O4: BREAK (EP)",
    releaseYear: 2024
  },
  {
    id: 16,
    title: "Run For Roses",
    album: "Fe3O4: BREAK (EP)",
    releaseYear: 2024
  },
  {
    id: 17,
    title: "BOOM",
    album: "Fe3O4: BREAK (EP)",
    releaseYear: 2024
  },
  {
    id: 18,
    title: "Passionfruit",
    album: "Fe3O4: BREAK (EP)",
    releaseYear: 2024
  },
  {
    id: 19,
    title: "XOXO",
    album: "Fe3O4: BREAK (EP)",
    releaseYear: 2024
  },
  {
    id: 20,
    title: "Break The Wall",
    album: "Fe3O4: BREAK (EP)",
    releaseYear: 2024
  },
  {
    id: 21,
    title: "See that? (별별별)",
    album: "Fe3O4: STICK OUT (EP)",
    releaseYear: 2024
  },
  {
    id: 22,
    title: "SICKUHH (feat. Kid Milli)",
    album: "Fe3O4: STICK OUT (EP)",
    releaseYear: 2024
  },
  {
    id: 23,
    title: "Red light sign, but we go",
    album: "Fe3O4: STICK OUT (EP)",
    releaseYear: 2024
  },
  {
    id: 24,
    title: "BEAT BEAT",
    album: "Fe3O4: STICK OUT (EP)",
    releaseYear: 2024
  },
  {
    id: 25,
    title: "Moving On",
    album: "Fe3O4: STICK OUT (EP)",
    releaseYear: 2024
  },
  {
    id: 26,
    title: "Love Is Lonely",
    album: "Fe3O4: STICK OUT (EP)",
    releaseYear: 2024
  },
  {
    id: 27,
    title: "High Horse",
    album: "Fe3O4: FORWARD (EP)",
    releaseYear: 2025
  },
  {
    id: 28,
    title: "KNOW ABOUT ME",
    album: "Fe3O4: FORWARD (EP)",
    releaseYear: 2025
  },
  {
    id: 29,
    title: "Slingshot (<★)",
    album: "Fe3O4: FORWARD (EP)",
    releaseYear: 2025
  },
  {
    id: 30,
    title: "Golden Recipe",
    album: "Fe3O4: FORWARD (EP)",
    releaseYear: 2025
  },
  {
    id: 31,
    title: "Papillon",
    album: "Fe3O4: FORWARD (EP)",
    releaseYear: 2025
  },
  {
    id: 32,
    title: "Ocean",
    album: "Fe3O4: FORWARD (EP)",
    releaseYear: 2025
  },
  {
    id: 33,
    title: "MEXE",
    album: "MEXE (Single)",
    releaseYear: 2025
  },
  {
    id: 34,
    title: "Blue Valentine",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 35,
    title: "SPINNIN' ON IT",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 36,
    title: "Phoenix",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 37,
    title: "Reality Hurts",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 38,
    title: "RICO",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 39,
    title: "Game Face",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 40,
    title: "PODIUM",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 41,
    title: "Crush On You",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 42,
    title: "ADORE U",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 43,
    title: "Shape of Love",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 44,
    title: "O.O Pt. 1 (Baila)",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 45,
    title: "O.O Pt. 2 (Superhero)",
    album: "Blue Valentine (1st Full Album)",
    releaseYear: 2025
  },
  {
    id: 46,
    title: "TIC TIC (feat. Pabllo Vittar)",
    album: "TIC TIC (Single)",
    releaseYear: 2026
  }
]

const albums = computed(() => {
  const albumSet = new Set(songs.map(song => song.album))
  return Array.from(albumSet)
})

const selectedAlbums = ref<string[]>([])

onMounted(() => {
  selectedAlbums.value = [...albums.value]
})

const filteredSongs = computed(() => {
  if (selectedAlbums.value.length === 0) {
    return []
  }
  return songs.filter(song => selectedAlbums.value.includes(song.album))
})

const isSorting = ref(false)
const isFinished = ref(false)
const comparisonCount = ref(0)
const sortedSongs = ref<Song[]>([])

const leftChoice = ref<Song | null>(null)
const rightChoice = ref<Song | null>(null)

let runs: Song[][] = []
let nextRuns: Song[][] = []
let runIndex = 0

let currentLeftRun: Song[] = []
let currentRightRun: Song[] = []
let mergedRun: Song[] = []
let leftIndex = 0
let rightIndex = 0

const startSorting = () => {
  isSorting.value = true
  isFinished.value = false
  comparisonCount.value = 0
  sortedSongs.value = []

  runs = filteredSongs.value.map(song => [song])
  nextRuns = []
  runIndex = 0

  currentLeftRun = []
  currentRightRun = []
  mergedRun = []
  leftIndex = 0
  rightIndex = 0

  prepareNextComparison()
}

const completeCurrentMergeIfNeeded = () => {
  if (!currentLeftRun.length || !currentRightRun.length) {
    return
  }

  if (leftIndex >= currentLeftRun.length) {
    mergedRun.push(...currentRightRun.slice(rightIndex))
    nextRuns.push(mergedRun)
    currentLeftRun = []
    currentRightRun = []
    mergedRun = []
    runIndex += 2
    prepareNextComparison()
    return
  }

  if (rightIndex >= currentRightRun.length) {
    mergedRun.push(...currentLeftRun.slice(leftIndex))
    nextRuns.push(mergedRun)
    currentLeftRun = []
    currentRightRun = []
    mergedRun = []
    runIndex += 2
    prepareNextComparison()
  }
}

const prepareNextComparison = () => {
  leftChoice.value = null
  rightChoice.value = null

  if (currentLeftRun.length && currentRightRun.length) {
    completeCurrentMergeIfNeeded()
    if (!currentLeftRun.length || !currentRightRun.length) {
      return
    }

    leftChoice.value = currentLeftRun[leftIndex] ?? null
    rightChoice.value = currentRightRun[rightIndex] ?? null
    return
  }

  while (true) {
    if (runIndex >= runs.length) {
      if (nextRuns.length === 1) {
        sortedSongs.value = nextRuns[0] ?? []
        isSorting.value = false
        isFinished.value = true
        return
      }

      runs = nextRuns
      nextRuns = []
      runIndex = 0
      continue
    }

    const leftRun = runs[runIndex]
    const rightRun = runs[runIndex + 1]

    if (!leftRun) {
      runIndex += 2
      continue
    }

    if (!rightRun) {
      nextRuns.push(leftRun)
      runIndex += 2
      continue
    }

    currentLeftRun = leftRun
    currentRightRun = rightRun
    mergedRun = []
    leftIndex = 0
    rightIndex = 0

    leftChoice.value = currentLeftRun[leftIndex] ?? null
    rightChoice.value = currentRightRun[rightIndex] ?? null
    return
  }
}

const chooseSong = (choice: 'left' | 'right') => {
  if (!currentLeftRun.length || !currentRightRun.length) {
    return
  }

  comparisonCount.value += 1

  if (choice === 'left') {
    const chosen = currentLeftRun[leftIndex]
    if (chosen) {
      mergedRun.push(chosen)
    }
    leftIndex += 1
  } else {
    const chosen = currentRightRun[rightIndex]
    if (chosen) {
      mergedRun.push(chosen)
    }
    rightIndex += 1
  }

  prepareNextComparison()
}
</script>

<template>
<PageContainer>
  <div class="mx-auto max-w-3xl space-y-6 py-6">
    <div class="space-y-2">
      <h1 class="text-2xl font-semibold">NMIXX Sorter</h1>
      <p class="text-sm text-muted">
        Sort your favorite NMIXX songs by comparing them pairwise.
      </p>
    </div>

    <div class="space-y-3">
      <h2 class="text-lg font-semibold">Select Albums</h2>
      <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
        <label v-for="album in albums" :key="album" class="flex items-center gap-2 rounded-md border p-2 text-sm hover:bg-primary/10">
          <input
            v-model="selectedAlbums"
            type="checkbox"
            :value="album"
            class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          >
          <span>{{ album }}</span>
        </label>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button
        class="rounded-md bg-primary px-4 py-2 mt-4 text-sm font-medium text-white hover:opacity-90"
        @click="startSorting"
      >
        {{ isSorting ? 'Restart Sorting' : 'Start Sorting' }}
      </button>
      <p class="text-sm text-muted">Comparisons: {{ comparisonCount }}</p>
    </div>

    <div v-if="isSorting && leftChoice && rightChoice" class="space-y-4">
      <p class="text-sm text-muted">Pick the song you prefer:</p>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          class="rounded-lg border border-primary p-4 text-left hover:bg-primary/10 min-w-80"
          @click="chooseSong('left')"
        >
          <p class="font-semibold">{{ leftChoice.title }}</p>
          <p class="text-sm text-muted">{{ leftChoice.album }}</p>
        </button>

        <button
          class="rounded-lg border border-primary p-4 text-left hover:bg-primary/10 min-w-80"
          @click="chooseSong('right')"
        >
          <p class="font-semibold">{{ rightChoice.title }}</p>
          <p class="text-sm text-muted">{{ rightChoice.album }}</p>
        </button>
      </div>
    </div>

    <div v-if="isFinished" class="space-y-3">
      <h2 class="text-lg font-semibold">Your Sorted List</h2>
      <ol class="list-decimal space-y-1 pl-6">
        <li v-for="song in sortedSongs" :key="song.id">
          {{ song.title }}
        </li>
      </ol>
    </div>
  </div>
</PageContainer>
</template>