<script setup lang="ts">
import PageContainer from '~/components/PageContainer.vue'

const toast = useToast()
const toastMessage = ref('')
const showToast = (msg: string) => {
  toast.add({
    title: 'Notification',
    description: msg,
    color: 'neutral',
    duration: 3000,
  })
}
</script>

<template>
  <PageContainer>
    <UInput v-model="toastMessage"/>
    <UButton @click="showToast(toastMessage)">
      Show Toast
    </UButton>
  </PageContainer>
</template>
