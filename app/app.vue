<script setup lang="ts">
useSeoMeta({
  title: "Irham Personal Site"
})
</script>

<template>
  <UApp>
    <NavBar />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <USeparator />
    <FooterComponent />
  </UApp>
</template>
