<script setup lang="ts">
const videoElement = ref()
const videoTrack = ref()

// const startCamera = async () => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: {
//         facingMode: 'environment'
//       }
//     })
//     videoElement.value.srcObject = stream
//   } catch (error) {
//     console.error('Camera access denied or not supported:', error)
//   }
// }

async function initCamera () {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    })
    
    videoElement.value.srcObject = stream
    
    // Extract and store the raw video hardware track
    videoTrack.value = stream.getVideoTracks()[0]
  } catch (err) {
    console.error("Camera setup failed: ", err)
  }
}

async function snapRawPicture() {
  if (!videoTrack.value) return

  try {
    // 1. Pass the raw video track directly to the photographer utility
    const imageCapture = new ImageCapture(videoTrack.value)
    
    // 2. Instruct the camera hardware to fire a single capture snapshot
    const blob = await imageCapture.takePhoto()
    
    // 3. Generate a direct binary reference URL for downloading
    const imageUrl = URL.createObjectURL(blob)
    
    const downloadLink = document.createElement('a')
    downloadLink.href = imageUrl
    downloadLink.download = `raw_photo_${Date.now()}.jpg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    
    // Clean up memory resources
    downloadLink.remove()
    URL.revokeObjectURL(imageUrl)
  } catch (error) {
    console.error("Failed to snap raw picture directly: ", error)
  }
}
</script>

<template>
  <PageContainer>
    <video id="webcam" ref="videoElement" autoplay playsinline width="640" height="480" />
    <UButton @click="initCamera">Start Camera</UButton>
    <UButton @click="snapRawPicture">Take Photo</UButton>
  </PageContainer>
</template>