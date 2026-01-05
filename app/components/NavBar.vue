<script setup lang="ts">
import { NAVIGATION_ITEMS } from '~/constants'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <UHeader v-if="!isHomePage" mode="drawer">
    <template #title>
      <ULink to="/" class="text-display text-lg font-bold">
        FGIRHAM
      </ULink>
    </template>

    <UNavigationMenu :items="NAVIGATION_ITEMS" />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="NAVIGATION_ITEMS" orientation="vertical" />
    </template>
  </UHeader>
</template>