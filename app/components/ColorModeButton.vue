<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value: boolean) {
    colorMode.preference = value ? 'dark' : 'light'
  }
})
</script>

<template>
  <ClientOnly v-if="!colorMode.forced">
    <UButton
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      variant="outline"
      size="xl"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      class="rounded-full"
      @click="isDark = !isDark"
    />
  </ClientOnly>
</template>
