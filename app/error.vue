<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    default: () => ({})
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UApp>
    <UMain>
      <UContainer class="min-h-screen flex flex-col items-center justify-center gap-8">
        <h1 class="text-6xl font-bold">
          {{ error?.statusCode || '404' }}
        </h1>
        <h2 class="text-2xl">
          {{ error?.statusMessage || 'Page Not Found' }}
        </h2>
        <p class="text-muted-foreground">
          {{ error?.message || 'The page you are looking for does not exist.' }}
        </p>
        <UButton size="lg" @click="handleError">
          Go Home
        </UButton>
      </UContainer>
    </UMain>
  </UApp>
</template>
