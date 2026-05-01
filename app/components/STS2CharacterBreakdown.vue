<script setup lang="ts">
import { ref } from 'vue';

interface CharacterAscensionData {
  ascension: number;
  wins: number;
  losses: number;
  total: number;
  winRate: number;
}

interface CharacterData {
  id: string;
  name: string;
  image: string;
}

interface Props {
  data: Record<string, CharacterAscensionData[]>;
  characters: CharacterData[];
}

const props = defineProps<Props>();
const activeCharacter = ref(props.characters[0] || { id: 'IRONCLAD', name: 'Ironclad', image: 'ironclad.webp' });

const getTotalWins = (character: string) => {
  return props.data[character]?.reduce((sum, s) => sum + s.wins, 0) || 0;
};

const getTotalLosses = (character: string) => {
  return props.data[character]?.reduce((sum, s) => sum + s.losses, 0) || 0;
};

const getTotalRuns = (character: string) => {
  return props.data[character]?.reduce((sum, s) => sum + s.total, 0) || 0;
};

const getAverageWinRate = (character: string) => {
  const charData = props.data[character];
  if (!charData || charData.length === 0) return 0;
  return charData.reduce((sum, s) => sum + s.winRate, 0) / charData.length;
};

const getWinRateColor = (winRate: number) => {
  if (winRate >= 50) return 'text-green-400';
  if (winRate >= 25) return 'text-yellow-400';
  return 'text-red-400';
};

const getBarColor = (winRate: number) => {
  if (winRate >= 50) return 'bg-green-500';
  if (winRate >= 25) return 'bg-yellow-500';
  return 'bg-red-500';
};
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Win Rate by Character & Ascension</h2>

    <div class="rounded-lg border border-accented dark:bg-slate-800/50 p-6">
      <!-- Character Tabs -->
      <div class="mb-6 flex flex-wrap justify-around gap-2 border-b border-slate-700 pb-4">
        <div 
          v-for="char in characters"
          :key="char.id"
          class="rounded border border-accented cursor-pointer transition-transform hover:scale-105"
          :class="{
            'ring-4 ring-primary': char.id === activeCharacter.id,
            'opacity-70 hover:opacity-80': char.id !== activeCharacter.id,
          }"
          @click="activeCharacter = char"
        >
          <img
            :src="char.image"
            :alt="char.name"
            class="h-18 w-36 object-cover rounded"
          >
          <span class="sr-only">{{ char.name }}</span>
        </div>
        <!-- <UButton
          v-for="char in characters"
          :key="char.id"
          :avatar="{
            src: char.image,
            alt: char.name,
            size: 'lg',
          }"
          color="primary"
          :variant="char.id === activeCharacter.id ? 'solid' : 'outline'"
          size="lg"
          @click="activeCharacter = char"
        >
          {{ char.name }}
        </UButton> -->
      </div>

      <!-- Character Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-700">
              <th class="px-4 py-2 text-left font-semibold">Ascension</th>
              <th class="px-4 py-2 text-center font-semibold">Wins</th>
              <th class="px-4 py-2 text-center font-semibold">Losses</th>
              <th class="px-4 py-2 text-center font-semibold">Total</th>
              <th class="px-4 py-2 text-left font-semibold">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(stat, idx) in data[activeCharacter.id]"
              :key="idx"
              class="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
            >
              <td class="px-4 py-3 font-semibold">A{{ stat.ascension }}</td>
              <td class="px-4 py-3 text-center">{{ stat.wins }}</td>
              <td class="px-4 py-3 text-center">{{ stat.losses }}</td>
              <td class="px-4 py-3 text-center">{{ stat.total }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="h-2 w-24 overflow-hidden rounded bg-slate-700">
                    <div
                      :style="{ width: `${stat.winRate}%` }"
                      :class="['h-full transition-all', getBarColor(stat.winRate)]"
                    />
                  </div>
                  <span :class="['font-semibold', getWinRateColor(stat.winRate)]">
                    {{ stat.winRate.toFixed(2) }}%
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Character Stats Summary -->
      <div class="mt-6 grid gap-4 border-t border-slate-700 pt-4 md:grid-cols-4">
        <div class="rounded border border-accented dark:bg-slate-800/50 p-4">
          <div class="text-xs uppercase tracking-wider text-muted-foreground">Total Wins</div>
          <div class="mt-1 text-2xl font-bold">
            {{ getTotalWins(activeCharacter.id) }}
          </div>
        </div>
        <div class="rounded border border-accented dark:bg-slate-800/50 p-4">
          <div class="text-xs uppercase tracking-wider text-muted-foreground">Total Losses</div>
          <div class="mt-1 text-2xl font-bold">
            {{ getTotalLosses(activeCharacter.id) }}
          </div>
        </div>
        <div class="rounded border border-accented dark:bg-slate-800/50 p-4">
          <div class="text-xs uppercase tracking-wider text-muted-foreground">Total Runs</div>
          <div class="mt-1 text-2xl font-bold">
            {{ getTotalRuns(activeCharacter.id) }}
          </div>
        </div>
        <div class="rounded border border-accented dark:bg-slate-800/50 p-4">
          <div class="text-xs uppercase tracking-wider text-muted-foreground">Avg Win Rate</div>
          <div class="mt-1 text-2xl font-bold">
            {{ getAverageWinRate(activeCharacter.id).toFixed(2) }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
