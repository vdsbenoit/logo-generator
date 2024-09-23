<template>
  <div class="h-svh w-screen bg-white">
    <div id="capture" class="flex h-fit w-fit items-center justify-center rounded-full bg-neutral-900">
      <img class="p-16" src="@/assets/logo.png" />
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
