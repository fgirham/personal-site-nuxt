<script setup lang="ts">
interface AscensionStat {
  ascension: number;
  wins: number;
  losses: number;
  total: number;
  winRate: number;
}

interface Props {
  data: AscensionStat[];
}

defineProps<Props>();

const getWinRateColor = (winRate: number) => {
  if (winRate >= 50) return 'text-green-400';
  if (winRate >= 30) return 'text-yellow-400';
  if (winRate >= 10) return 'text-orange-400';
  return 'text-red-400';
};

const getBarColor = (winRate: number) => {
  if (winRate >= 50) return 'bg-green-500';
  if (winRate >= 30) return 'bg-yellow-500';
  if (winRate >= 10) return 'bg-orange-500';
  return 'bg-red-500';
};
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Win Rate by Ascension (Difficulty)</h2>
    
    <div class="rounded-lg border border-accented dark:bg-slate-800/50 p-6">
      <!-- Vertical bar chart -->
      <div class="space-y-6">
        <!-- Chart area -->
        <div class="relative w-full h-80 rounded border border-accented dark:bg-slate-900/50 p-6 flex items-end justify-between gap-1">
          <!-- Vertical bars -->
          <div v-for="(stat, idx) in data" :key="idx" class="flex flex-1 flex-col items-center justify-end group relative h-full">
            <div
            :style="{ height: `${stat.winRate}%`, minHeight: '4px' }"
            :class="['w-full relative rounded-t transition-all duration-300 hover:opacity-80', getBarColor(stat.winRate)]"
            >
              <div class="text-xs text-center absolute -top-4 left-0 right-0 text-muted-foreground group-hover:block hidden">{{ stat.winRate.toFixed(1) }}%</div>
            </div>
            <div class="mt-4 text-xs font-semibold text-muted-foreground">A{{ stat.ascension }}</div>
          </div>
        </div>

        <!-- Legend -->
        <div class="grid grid-cols-5 gap-2 text-sm lg:grid-cols-10">
          <div v-for="(stat, idx) in data" :key="idx" class="rounded border border-accented dark:bg-slate-800/50 p-2 text-center">
            <div class="font-semibold">A{{ stat.ascension }}</div>
            <div :class="['text-xs font-bold', getWinRateColor(stat.winRate)]">{{ stat.winRate.toFixed(1) }}%</div>
            <div class="text-xs text-muted-foreground">{{ stat.wins }}-{{ stat.losses }}</div>
          </div>
        </div>
      </div>

      <!-- Key insights -->
      <div class="mt-8 space-y-2 border-t border-accented dark:border-slate-700 pt-4 text-sm">
        <p class="text-muted-foreground">
          <span class="font-semibold">Highest Win Rate:</span>
          Ascension 3 (100%)
        </p>
        <p class="text-muted-foreground">
          <span class="font-semibold">Lowest Win Rate:</span>
          Ascension 9 (8.93%)
        </p>
        <p class="text-muted-foreground">
          <span class="font-semibold">Key Observation:</span>
          Significant difficulty spike at Ascension 9
        </p>
      </div>
    </div>
  </div>
</template>
