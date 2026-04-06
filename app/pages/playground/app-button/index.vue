<script setup lang="ts">
import { computed } from 'vue'

const isAndroid = computed(() => /Android/i.test(navigator.userAgent))

const openInstagram = () => {
  if (isAndroid.value) {
    globalThis.location.href = 'intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end'
    return
  }
  globalThis.open('https://instagram.com')
}
</script>

<template>
  <PageContainer>
    <UButton type="button" @click="openInstagram">Open Instagram</UButton>
  </PageContainer>
</template>