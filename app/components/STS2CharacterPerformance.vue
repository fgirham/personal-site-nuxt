<script setup lang="ts">
interface CharacterStat {
  character: string;
  wins: number;
  losses: number;
  total: number;
  winRate: number;
}

interface Props {
  data: CharacterStat[];
  characters: { id: string; name: string; image: string; icon: string }[];
}

const props = defineProps<Props>();

const getColorClass = (winRate: number) => {
  if (winRate >= 35) return "bg-green-500";
  if (winRate >= 25) return "bg-yellow-500";
  return "bg-red-500";
};

const getTextColorClass = (winRate: number) => {
  if (winRate >= 35) return "text-green-400";
  if (winRate >= 25) return "text-yellow-400";
  return "text-red-400";
};

const getCharacterData = (id: string) => {
  const character = props.characters.find((c) => c.id === id);
  return character ? character : { name: id, image: "", icon: "" };
};
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Win Rate by Character</h2>

    <!-- Bar Chart -->
    <div class="rounded-lg border border-accented dark:bg-slate-800/50 p-6">
      <div class="space-y-4">
        <div
          v-for="stat in data"
          :key="stat.character"
          class="flex w-full items-center space-x-4"
        >
          <img
            v-if="getCharacterData(stat.character).icon"
            :src="getCharacterData(stat.character).icon"
            alt=""
            class="h-12 w-12 object-cover rounded"
          >
          <div class="space-y-2 grow">
            <div class="flex items-center justify-between">
              <span class="font-semibold">{{ getCharacterData(stat.character).name }}</span>
              <span
                :class="['text-sm font-bold', getTextColorClass(stat.winRate)]"
              >
                {{ stat.winRate.toFixed(2) }}% ({{ stat.wins }}-{{ stat.losses }})
              </span>
            </div>
            <div class="h-6 w-full overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
              <div
                :style="{ width: `${stat.winRate}%` }"
                :class="[
                  'h-full transition-all duration-300',
                  getColorClass(stat.winRate),
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <div
        v-for="stat in data"
        :key="stat.character"
        class="rounded-lg border border-accented text-white p-4 "
        :style="{
          background: `linear-gradient(var(--bg-overlay), var(--bg-overlay)), url(${getCharacterData(stat.character).image}) no-repeat center/cover`,
        }"
      >
        <div class="flex items-center space-x-3">
          <img
            v-if="getCharacterData(stat.character).icon"
            :src="getCharacterData(stat.character).icon"
            alt=""
            class="h-5 w-5 rounded-full mr-1"
          >
          <h3 class="font-bold">{{ getCharacterData(stat.character).name }}</h3>
        </div>
        <div class="mt-3 space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-muted-foreground">Wins:</span>
            <span class="font-semibold">{{ stat.wins }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Losses:</span>
            <span class="font-semibold">{{ stat.losses }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Total:</span>
            <span class="font-semibold">{{ stat.total }}</span>
          </div>
          <div class="border-t border-white pt-2">
            <div
              :class="[
                'flex justify-between font-bold',
                getTextColorClass(stat.winRate),
              ]"
            >
              <span>Win Rate:</span>
              <span class="whitespace-break-spaces">{{ ` ${stat.winRate.toFixed(2)}%` }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
