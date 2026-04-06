<script setup lang="ts">
import { computed } from 'vue'

const isAndroid = computed(() => /Android/i.test(navigator.userAgent))

const openInstagram = () => {
  if (isAndroid.value) {
    window.open('intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end')
    return
  }
  window.open('https://instagram.com')
}
</script>

<template>
  <PageContainer>
    <UButton type="button" @click="openInstagram">Open Instagram</UButton>
  </PageContainer>
</template>