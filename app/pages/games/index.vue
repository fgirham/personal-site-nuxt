<script setup lang="ts">
useSeoMeta({
  title: "Games - Irham Personal Site"
})

// Replace with your actual Steam ID
const STEAM_ID = "76561198829916006";

// Fetch Steam data from your server API (keeps API key secure)
const { data: steamData, pending, error } = await useFetch(`/api/steam/profile`, {
  query: { steamId: STEAM_ID }
});
</script>

<template>
  <UContainer class="min-h-screen-minus-header flex flex-col items-center justify-center gap-8 py-8">
    <h1 class="text-title">
      GAMES
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
      
      <div class="space-y-4">
        <USkeleton class="h-7 w-64" />
        <div class="grid gap-4">
          <UCard v-for="i in 5" :key="i">
            <div class="flex items-center gap-4">
              <USkeleton class="w-12 h-12" />
              <div class="flex-1 space-y-2">
                <USkeleton class="h-5 w-48" />
                <USkeleton class="h-4 w-32" />
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="soft"
      title="Failed to load Steam data"
      :description="error.message || 'An error occurred while fetching your Steam profile'"
      class="w-full max-w-4xl"
    />

    <!-- Steam Profile Data -->
    <div v-else-if="steamData" class="w-full max-w-4xl space-y-6">
      <!-- Profile Info -->
      <UCard
        v-if="steamData.profile"
        variant="subtle"
      >
        <div class="flex items-center gap-4">
          <UAvatar
            :src="steamData.profile.avatarfull"
            :alt="steamData.profile.personaname"
            size="3xl"
          />
          <div>
            <h2 class="text-2xl font-bold">{{ steamData.profile.personaname }}</h2>
            <p class="text-gray-400 dark:text-gray-400">Level: {{ steamData.level }}</p>
            <p class="text-gray-400 dark:text-gray-400">Total Games: {{ steamData.gamesCount }}</p>
          </div>
        </div>
      </UCard>

      <!-- Top Games -->
      <div class="space-y-4">
        <h3 class="text-xl font-semibold">Top 10 Most Played Games</h3>
        <div class="grid gap-4">
          <UCard
            v-for="game in steamData.topGames"
            :key="game.appid"
            variant="subtle"
          >
            <div class="flex items-center gap-4">
              <img
                :src="`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`"
                :alt="game.name"
                class="w-46 h-17.25 rounded object-cover"
                loading="lazy"
              >
              <div class="flex-1">
                <h4 class="font-semibold">{{ game.name || 'Unknown Game' }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ Math.round(game.playtime_forever / 60) }} hours played
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </UContainer>
</template>
