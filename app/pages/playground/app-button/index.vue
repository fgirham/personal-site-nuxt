<script setup lang="ts">
const openInstagram = () => {
  window.open('https://instagram.com')
}
</script>

<template>
  <PageContainer>
    <UButton type="button" @click="openInstagram">Open Instagram</UButton>
  </PageContainer>
</template>