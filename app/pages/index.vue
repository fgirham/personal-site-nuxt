<script setup lang="ts">
import { NAVIGATION_ITEMS } from '~/constants'
</script>

<template>
  <UContainer class="min-h-screen flex flex-col items-center justify-center gap-8">
    <img
      src="~/assets/icons/fgi-icon.svg"
      alt="site logo"
      class="site-logo"
    >
    <h1 class="text-display text-xl font-bold">
      IRHAM'S PERSONAL SITE
    </h1>
    <div>
      <UNavigationMenu :items="NAVIGATION_ITEMS" />
    </div>
    <ColorModeButton class="fixed bottom-[20%] right-8"/>
  </UContainer>
</template>

<style scoped>
.site-logo {
  width: 150px;
  height: 150px;
}

@media (prefers-reduced-motion: no-preference) {
  .site-logo {
    animation: float infinite 3s ease-in-out;
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
