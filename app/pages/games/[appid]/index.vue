<script setup lang="ts">
useSeoMeta({
  title: "Games - Irham Personal Site"
})

const appId = useRoute().params.appid as string;
const STEAM_ID = "76561198829916006";

const { data: gameStats, pending, error } = await useFetch(`/api/steam/stats`, {
  query: { steamId: STEAM_ID, appId }
});
</script>

<template>
  <UContainer class="min-h-screen-minus-header flex flex-col items-center justify-center gap-8 py-8">
    <h1 class="text-title">
      GAME STATS
    </h1>
    <!-- Loading State -->
    <div v-if="pending" class="w-full max-w-4xl space-y-6">
      <UCard>
        <div class="flex items-center gap-4">
          <USkeleton class="w-20 h-20" :ui="{ rounded: 'rounded-full' }" />
          <div class="flex-1 space-y-2">
            <USkeleton class="h-8 w-48" />
            <USkeleton class="h-4 w-32" />
            <USkeleton class="h-4 w-40" />
          </div>
        </div>
      </UCard>
    </div>
    <!-- Error State -->
    <UAlert
      v-else-if="error"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="soft"
      title="Failed to load Game Stats"
      :description="error.message || 'An error occurred while fetching your game stats'"
    />
    <!-- Game Stats -->
    <div v-else-if="gameStats" class="w-full max-w-4xl space-y-6">
      <UCard>
        <div class="flex flex-col gap-4">
          <h2 class="text-lg font-semibold">Stats for App ID: {{ appId }}</h2>
          <div v-if="gameStats.stats && gameStats.stats.length > 0" class="grid gap-4">
            <div
              v-for="(stat, index) in gameStats.stats"
              :key="index"
              class="flex justify-between border-b pb-2"
            >
              <span>{{ stat.name }}</span>
              <span>{{ stat.value }}</span>
            </div>
          </div>
          <div v-else>
            <p>No stats available for this game.</p>
          </div>
        </div>
      </UCard>
    </div>
    <!-- Achievements -->
    <div v-if="gameStats && gameStats.achievements && gameStats.achievements.length > 0" class="w-full max-w-4xl space-y-6">
      <h2 class="text-lg font-semibold">Achievements</h2>
      <div class="grid gap-4">
        <UCard
          v-for="(achievement, index) in gameStats.achievements"
          :key="index"
        >
          <div class="flex items-center gap-4">
            <img
              :src="achievement.icon"
              :alt="achievement.name"
              class="w-16 h-16 rounded object-cover"
              loading="lazy"
            >
            <div class="flex-1">
              <h3 class="text-md font-semibold">{{ achievement.name }}</h3>
              <p class="text-sm mt-1">
                Status:
                <span :class="achievement.achieved ? 'text-green-600' : 'text-red-600'">
                  {{ achievement.achieved ? 'Unlocked' : 'Locked' }}
                </span>
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
