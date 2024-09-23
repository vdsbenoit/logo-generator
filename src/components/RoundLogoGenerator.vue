<template>
  <div class="h-svh w-screen bg-white">
    <div id="capture" class="justify-left flex h-[132px] w-[320px] items-center rounded bg-neutral-900">
      <img class="inline-block h-full p-4" src="@/assets/logo.png" />
      <p class="text-4xl font-bold text-neutral-100">frite.dev</p>
    </div>
    <button class="mt-10 rounded bg-gray-300 px-2 py-1" @click="captureAndSave">
      Export as PNG
    </button>
  </div>
</template>

<script lang="ts" setup>
import { nextTick } from "vue"
import html2canvas from "html2canvas"
import { saveAs } from "file-saver"

const captureAndSave = async () => {
  await nextTick()
  const element = document.getElementById("capture")

  try {
    if (!element) {
      throw new Error("Element not found")
    }
    const canvas = await html2canvas(element, {
      // scale: 1, // Increase resolution
      useCORS: false, // If you have cross-origin images
      logging: true, // For debugging
    })

    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, "new-logo.png")
      } else {
        console.error("Failed to create blob from canvas")
      }
    })
  } catch (error) {
    console.error("Failed to capture and save image:", error)
  }
}
</script>

<style scoped></style>
