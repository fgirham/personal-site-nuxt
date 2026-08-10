<script setup lang="ts">
const videoElement = ref()

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.value.srcObject = stream;
  } catch (error) {
    console.error('Camera access denied or not supported:', error);
  }
}
</script>

<template>
  <PageContainer>
    <video id="webcam" ref="videoElement" autoplay playsinline width="640" height="480"></video>
    <UButton @click="startCamera">Start Camera</UButton>
  </PageContainer>
</template>